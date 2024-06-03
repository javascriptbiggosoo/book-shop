const { StatusCodes } = require("http-status-codes");
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");
const {
  selectBooks,
  selectBookById,
  selectBookWioutLogin,
  selectTotalBooks,
} = require("../models/bookQueries");
const decodeJwt = require("../utils/auth");

const getBooks = async (req, res) => {
  const { category_id, lastest, limit, current_page } = req.query;
  const getBooksResponse = {};

  const [selectBooksRows] = await selectBooks({
    category_id,
    lastest,
    limit,
    current_page,
  });
  // 스네이크 케이스를 카멜 케이스로 변경
  getBooksResponse.books = selectBooksRows.map(
    ({
      id,
      title,
      img,
      category_id,
      form,
      isbn,
      summary,
      detail,
      author,
      pages,
      contents,
      price,
      pub_date,
      likes,
    }) => {
      return {
        id,
        title,
        img,
        categoryId: category_id,
        form,
        isbn,
        summary,
        detail,
        author,
        pages,
        contents,
        price,
        pubDate: pub_date,
        likes,
      };
    }
  );

  const [selectTotalBooksRows] = await selectTotalBooks(category_id);
  getBooksResponse.pagination = {
    totalCount: selectTotalBooksRows[0].total_count,
    currentPage: parseInt(current_page),
  };
  res.status(StatusCodes.OK).json(getBooksResponse);
};

const getBookDetail = async (req, res) => {
  const { bookId } = req.params;
  try {
    const decoded = decodeJwt(req);
    const getBookDetailResponse = {};

    const [rows, fields] = await selectBookById(bookId, decoded.id);
    getBookDetailResponse.book = rows.map(
      ({
        id,
        title,
        img,
        category_id,
        form,
        isbn,
        summary,
        detail,
        author,
        pages,
        contents,
        price,
        pub_date,
        category_name,
        likes,
        liked,
      }) => {
        return {
          id,
          title,
          img,
          categoryId: category_id,
          form,
          isbn,
          summary,
          detail,
          author,
          pages,
          contents,
          price,
          pubDate: pub_date,
          categoryName: category_name,
          likes,
          liked,
        };
      }
    );
    res.status(StatusCodes.OK).json(getBookDetailResponse.book);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "JWT 토큰이 만료되었습니다." });
      return;
    } else if (error instanceof JsonWebTokenError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "JWT 토큰이 유효하지 않습니다." });
      return;
    } else if (error instanceof ReferenceError) {
      // 로그인이 되어있지 않은 경우
      const [rows, fields] = await selectBookWioutLogin(bookId);
      res.status(StatusCodes.OK).json(rows);
      return;
    }
  }
};

module.exports = { getBooks, getBookDetail };

const { fail } = require("assert");
const { features } = require("process");
const Book = require("../models/bookModel");
const ApiFeatures = require("../apiFeatures");
const { abort } = require("../abort");

exports.top_five = (req, res, next) => {
  (req.query.limit = "5"), (req.query.sort = "-rating");
  next();
};
exports.get_books = async (req, res) => {
  try {
    const features = new ApiFeatures(Book.find(), req.query)
      .limitFeilds()
      .filter()
      .sort()
      .paginate();
    const books = await features.queryObj;
    console.log(books);
    res.status(200).json({
      status: "success",
      results: books.length,
      data: {
        books,
      },
    });
  } catch (err) {
    abort(res, 404, "no books available at the moment");
  }
};

exports.get_book = async (req, res) => {
  try {
    const query = Book.findById(req.params.id);
    const book = await query;

    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    abort(res, 404, "this book does not exist");
  }
};

exports.post_book = async (req, res) => {
  try {
    console.log(req.body);
    const newBook = await Book.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newBook,
      },
    });
  } catch (err) {
    abort(res, 400, "Bad request, please check the sent data");
  }
};

exports.patch_book = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    abort(res, 400, "Bad request, please check the sent data and the book id");
  }
};

exports.delete_book = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    abort(res, 404, "this book does not exist, please check the book id");
  }
};

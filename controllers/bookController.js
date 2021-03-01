const { fail } = require("assert");
const { features } = require("process");
const Book = require("../models/bookModel");
const ApiFeatures = require("../apiFeatures");

exports.top_five = (req, res, next) => {
  (req.query.limit = "5"), (req.query.sort = "-rating");
  next();
};
exports.get_books = async (req, res) => {
  try {
    const features = new ApiFeatures(Book.find(), req.query)
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
    res.status(404).json({
      status: fail,
      message: err,
    });
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
    res.status(404).json({
      success: false,
      message: err,
    });
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
    res.status(400).json({
      status: "fail",
      message: err,
    });
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
    res.status(500).json({
      status: "fail",
      message: err,
    });
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
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

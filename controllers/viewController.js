const Book = require("../models/bookModel");
const ApiFeatures = require("../apiFeatures");
const { abort } = require("../abort");
exports.show_books = async (req, res) => {
  try {
    // const features = new ApiFeatures(Book.find(), req.query)
    //   .limitFeilds()
    //   .filter()
    //   .sort()
    //   .paginate();
    // const books = await features.queryObj;
    const books = await Book.find();
    console.log(books);
    res.status(200).render("base", {
      title: "Books",
      books,
    });
  } catch (err) {
    abort(res, 500);
  }
};

exports.show_book_byId = async (req, res) => {
  book = await Book.findById(req.params.id);
  console.log(book);
  res.status(200).render("bookView", {
    book,
  });
};

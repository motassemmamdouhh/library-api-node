const mongoose = require("mongoose");

bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "book must have a title"],
  },
  rating: {
    type: Number,
    required: [true, "book must have rating"],
    min: [1, "rating cant be less than 1"],
    max: [5, "rating cant be greater that 5"],
  },
  category: {
    type: String,
    required: [true, "book must have rating"],
    enum: {
      values: ["politics", "how to", "drama", "biography", "comic"],
      message: " category must be correct",
    },
  },
  price: {
    type: Number,
    required: [true, "books must have a price"],
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

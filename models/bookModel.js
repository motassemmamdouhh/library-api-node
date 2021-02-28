const mongoose = require("mongoose");

bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "book must have a title"],
  },
  rating: {
    type: Number,
    required: [true, "book must have rating"],
  },
  category: {
    type: String,
    required: [true, "book must have rating"],
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

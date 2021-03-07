const express = require("express");
const router = require("express").Router();
const Book = require("../models/bookModel");
const view_controller = require("../controllers/viewController");
router.route("/").get(view_controller.show_books);
router.route("/:id").get(view_controller.show_book_byId);
module.exports = router;

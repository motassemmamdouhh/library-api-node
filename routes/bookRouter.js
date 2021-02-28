const express = require("express");
const { get } = require("../app");
const bookController = require("../controllers/bookController");
const router = express.Router();

router.route("/").get(bookController.get_books).post(bookController.post_book);
router
  .route("/:id")
  .get(bookController.get_book)
  .patch(bookController.patch_book)
  .delete(bookController.delete_book);

module.exports = router;

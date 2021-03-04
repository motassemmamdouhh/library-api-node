const express = require("express");
const { get } = require("../app");
const bookController = require("../controllers/bookController");
const router = express.Router();
const auth = require("../authenticate");

router.route("/top-5").get(bookController.top_five, bookController.get_books);

router.route("/").get(bookController.get_books).post(bookController.post_book);
router
  .route("/:id")
  .get(auth.protect, bookController.get_book)
  .patch(
    auth.protect,
    auth.check_permission("admin, librarian"),
    bookController.patch_book
  )
  .delete(
    auth.protect,
    auth.check_permission("admin"),
    bookController.delete_book
  );

module.exports = router;

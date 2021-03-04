const express = require("express");
const auth = require("../authenticate");
const router = require("express").Router();
router.post("/signup", auth.signup);
router.post("/login", auth.login);
module.exports = router;

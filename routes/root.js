const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/about(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "about.html"));
});

router.get("/contact(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "contact.html"));
});

router.get("/new(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new.html"));
});

router.get("/old(.html)?", (req, res) => {
  res.redirect(301, "/new");
});

module.exports = router;

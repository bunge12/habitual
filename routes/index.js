// the index page
const express = require("express");
const router = express.Router();
const path = require("path");

module.exports = () => {
  router.get("/", (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../views") });
  });
  return router;
};

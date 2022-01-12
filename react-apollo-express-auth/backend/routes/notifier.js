const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("something Get")
});

module.exports = router;

const express = require("express");
const router = express.Router();
const somethingController = require("../controllers/something.controller");

router.get("/", somethingController.index);

module.exports = router;

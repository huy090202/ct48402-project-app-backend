const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/Category.controller");

router.post("/add", CategoryController.addCategory);

router.get("/all", CategoryController.getAllCategory);

module.exports = router;

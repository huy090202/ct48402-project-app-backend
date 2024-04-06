const express = require("express");
const router = express.Router();
const BannerController = require("../controllers/Banner.controller");

router.post("/add", BannerController.addBanner);

router.get("/all", BannerController.getAllBanner);

module.exports = router;

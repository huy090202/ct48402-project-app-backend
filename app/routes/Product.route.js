const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/Product.controller");

router.post("/add", ProductController.addProduct);

router.put("/update/:id", ProductController.updateProduct);

router.get("/detail/:id", ProductController.detailProduct);

router.get("/delete/:id", ProductController.deleteProduct);

router.get("/all", ProductController.getAllProduct);

router.get("/getProductByCategory", ProductController.getProductByCategory);

module.exports = router;

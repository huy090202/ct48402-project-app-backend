const ProductService = require("../services/Product.service");

// Add product
const addProduct = async (req, res) => {
  try {
    const response = await ProductService.addProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id) {
      return res.status(200).json({
        status: "ERROR",
        message: "The product ID is required",
      });
    }

    const response = await ProductService.updateProduct(id, data);

    if (response.status === "OK") {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({
        status: "ERROR",
        message: response.message,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Detail product
const detailProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(200).json({
        status: "ERROR",
        message: "The product ID is required",
      });
    }

    const response = await ProductService.detailProduct(id);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(200).json({
        status: "ERROR",
        message: "The product ID is required",
      });
    }

    const response = await ProductService.deleteProduct(id);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all product
const getAllProduct = async (req, res) => {
  try {
    const productId = req.query.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERROR",
        message: "The product ID is required",
        getAllProduct: [],
      });
    }

    const response = await ProductService.getAllProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const categoryProduct = req.query.Category;
    if (!categoryProduct) {
      return res.status(200).json({
        status: "ERR",
        message: "The type is required",
        getProductByCategory: [],
      });
    }
    const response = await ProductService.getProductByCategory(categoryProduct);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  detailProduct,
  getAllProduct,
  getProductByCategory,
  deleteProduct,
};

const Product = require("../models/ProductModel");

// Add product
const addProduct = async (data) => {
  return new Promise(async (resolve, reject) => {
    const { Name, Image, Price, Category } = data;

    try {
      const ProductMoi = await Product.create({
        Name,
        Image,
        Price,
        Category,
      });

      if (ProductMoi) {
        resolve({
          status: "OK",
          message: "Added new product successfully",
          data: ProductMoi,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Update product
const updateProduct = (productId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const UpdatedProduct = await Product.findOneAndUpdate(
        { _id: productId },
        data,
        {
          new: true,
          useFindAndModify: false,
        }
      );

      if (!UpdatedProduct) {
        resolve({
          status: "ERROR",
          message: "The product ID is not exist",
        });
      }

      resolve({
        status: "OK",
        message: "Updated product successfully",
        data: UpdatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Detail product
const detailProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!productId) {
        resolve({
          status: "ERROR",
          message: "The product ID is required",
        });
      }

      const detailProduct = await Product.findOne({ _id: productId });

      resolve({
        status: "OK",
        message: "Get detail product successfully",
        data: detailProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Get all product
const getAllProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allProduct = "";
      if (productId && productId === "All") {
        allProduct = await Product.find({}).sort({
          createdAt: -1,
          updatedAt: -1,
        });
      }

      if (productId && productId !== "All") {
        allProduct = await Product.findOne({ _id: productId });
      }

      resolve({
        status: "OK",
        message: "Get all product successfully",
        allProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { addProduct, updateProduct, detailProduct, getAllProduct };

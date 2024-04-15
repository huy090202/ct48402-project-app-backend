const Product = require("../models/ProductModel");
const CategoryModel = require("../models/CategoryModel");

// Add product
const addProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    const { Name, Image, Price, Category, Description } = data;

    try {
      // Tìm category trong cơ sở dữ liệu dựa trên tên
      let existingCategory = await CategoryModel.findOne({ Name: Category });

      // Nếu category không tồn tại, tạo mới
      if (!existingCategory) {
        existingCategory = await CategoryModel.create({ Name: Category });
      }

      const newProduct = await Product.create({
        Name,
        Image,
        Price,
        Category: existingCategory._id,
        Description,
      });

      if (newProduct) {
        resolve({
          status: "OK",
          message: "Added new product successfully",
          data: newProduct,
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
      // Kiểm tra nếu category được cung cấp
      if (data.Category) {
        // Tìm category trong cơ sở dữ liệu dựa trên tên
        let existingCategory = await CategoryModel.findOne({
          Name: data.Category,
        });

        // Nếu category không tồn tại, tạo mới
        if (!existingCategory) {
          existingCategory = await CategoryModel.create({
            Name: data.Category,
          });
        }

        // Thay thế tên của category bằng ID của nó trong dữ liệu cập nhật
        data.Category = existingCategory._id;
      }

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
          message: "The product ID does not exist",
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

const deleteProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: productId,
      });

      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      await Product.findByIdAndDelete(productId);
      resolve({
        status: "OK",
        message: "Delete product success",
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
        allProduct = await Product.find({});
      }

      if (productId && productId !== "All") {
        // Kiểm tra nếu productId khớp với tên của sản phẩm
        const exactProduct = await Product.findOne({ Name: productId });

        // Nếu tìm thấy sản phẩm trùng khớp, trả về mảng chỉ chứa sản phẩm đó
        if (exactProduct) {
          allProduct = [exactProduct];
        } else {
          // Nếu không tìm thấy sản phẩm trùng khớp, thực hiện tìm kiếm dựa trên văn bản trên trường 'Name'
          allProduct = await Product.find({ $text: { $search: productId } });
        }
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

const getProductByCategory = (productType) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!productType) {
        resolve({
          status: "ERR",
          message: "The category is required",
        });
      } else {
        let getProductByCategory = await Product.find({
          Category: productType,
        });

        if (!getProductByCategory) {
          getProductByCategory = [];

          resolve({
            status: "ERR",
            message: "The type is required",
            getProductByCategory,
          });
        }

        resolve({
          status: "OK",
          message: "SUCCESS",
          getProductByCategory,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  addProduct,
  updateProduct,
  detailProduct,
  getAllProduct,
  getProductByCategory,
  deleteProduct,
};

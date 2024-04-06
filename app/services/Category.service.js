const Category = require("../models/CategoryModel");

const addCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    const { Name, Image } = data;

    try {
      const NewCategory = await Category.create({
        Name,
        Image,
      });

      if (NewCategory) {
        resolve({
          status: "OK",
          message: "Added new category successfully",
          data: NewCategory,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllCategory = (categoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allCategory = "";
      if (categoryId && categoryId === "All") {
        allCategory = await Category.find();
      }

      if (categoryId && categoryId !== "All") {
        allCategory = await Category.find({ _id: categoryId });
      }

      resolve({
        status: "OK",
        message: "Get all category successfully",
        allCategory,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { addCategory, getAllCategory };

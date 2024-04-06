const CategoryService = require("../services/Category.service");

const addCategory = async (req, res) => {
  try {
    const response = await CategoryService.addCategory(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categoryId = req.query.id;
    if (!categoryId) {
      return res.status(200).json({
        status: "ERROR",
        message: "The category ID is required",
        getAllCategory: [],
      });
    }

    const response = await CategoryService.getAllCategory(categoryId);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addCategory, getAllCategory };

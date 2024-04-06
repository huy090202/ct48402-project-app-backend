const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    Name: { type: String, required: true, unique: true },
    Image: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;

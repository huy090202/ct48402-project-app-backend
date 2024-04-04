const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true, unique: true },
    Image: { type: String, default: null },
    Price: { type: Number, required: true },
    Category: {
      type: String,
      required: true,
      enum: ["Adidas", "Nike", "Others"],
      default: "Others",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;

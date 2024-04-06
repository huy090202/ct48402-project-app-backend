const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true, unique: true },
    Image: { type: String, default: null },
    Price: { type: Number, required: true },
    Category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;

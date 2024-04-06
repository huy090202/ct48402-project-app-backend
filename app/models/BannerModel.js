const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    Image: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("Banner", BannerSchema);
module.exports = Banner;

const BannerService = require("../services/Banner.service");

const addBanner = async (req, res) => {
  try {
    const response = await BannerService.addBanner(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAllBanner = async (req, res) => {
  try {
    const bannerId = req.query.id;
    if (!bannerId) {
      return res.status(200).json({
        status: "ERROR",
        message: "The banner ID is required",
        getAllBanner: [],
      });
    }

    const response = await BannerService.getAllBanner(bannerId);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { addBanner, getAllBanner };

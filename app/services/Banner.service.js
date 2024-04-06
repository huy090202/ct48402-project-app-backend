const Banner = require("../models/BannerModel");

const addBanner = (data) => {
  return new Promise(async (resolve, reject) => {
    const { Image } = data;

    try {
      const NewBanner = await Banner.create({ Image });
      if (NewBanner) {
        resolve({
          status: "OK",
          message: "Added new banner successfully",
          data: NewBanner,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllBanner = (bannerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allBanner = "";
      if (bannerId && bannerId === "All") {
        allBanner = await Banner.find({});
      }

      if (bannerId && bannerId !== "All") {
        allBanner = await Banner.find({ _id: bannerId });
      }

      resolve({
        status: "OK",
        message: "Get all banner successfully",
        allBanner,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { addBanner, getAllBanner };

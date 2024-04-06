const UserRouter = require("./User.route");
const ProductRouter = require("./Product.route");
const BannerRouter = require("./Banner.route");
const CategoryRouter = require("./Category.route");

const routes = (app) => {
  app.use("/api/User", UserRouter);
  app.use("/api/Product", ProductRouter);
  app.use("/api/Banner", BannerRouter);
  app.use("/api/Category", CategoryRouter);
};

module.exports = routes;

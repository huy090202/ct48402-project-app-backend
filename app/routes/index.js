const UserRouter = require("./User.route");
const ProductRouter = require("./Product.route");

const routes = (app) => {
  app.use("/api/User", UserRouter);
  app.use("/api/Product", ProductRouter);
};

module.exports = routes;

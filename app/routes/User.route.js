const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User.controller");

router.post("/signUp", UserController.signUp);

router.post("/signIn", UserController.signIn);

router.get("/logOut", UserController.logOut);

router.put("/update/:id", UserController.updateUser);

router.delete("/delete/:id", UserController.deleteUser);

router.get("/detailUser/:id", UserController.detailUser);

router.get("/getAllUser", UserController.getAllUser);

module.exports = router;

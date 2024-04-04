const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

// Sign up
const signUp = (data) => {
  return new Promise(async (resolve, reject) => {
    const { Email, Name, Password, ConfirmPassword } = data;

    try {
      const CheckUser = await User.findOne({ Email: Email });

      if (CheckUser !== null) {
        resolve({
          status: "ERROR",
          message: "The email is already",
        });
      }

      if (Password !== ConfirmPassword) {
        resolve({
          status: "ERROR",
          message: "Password and ConfirmPassword are not the same",
        });
      }

      const hash = bcrypt.hashSync(Password, 10);

      const NewUser = await User.create({
        Email,
        Name,
        Password: hash,
        ConfirmPassword,
      });

      if (NewUser) {
        resolve({
          status: "OK",
          message: "Sign up successfully",
          data: NewUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Sign in
const signIn = (data, res) => {
  return new Promise(async (resolve, reject) => {
    const { Email, Password } = data;

    try {
      const CheckUser = await User.findOne({ Email: Email });
      if (CheckUser === null) {
        resolve({
          status: "ERROR",
          message: "The user is not defined",
        });
      }

      const CheckPassword = bcrypt.compareSync(Password, CheckUser.Password);

      if (!CheckPassword) {
        resolve({
          status: "ERROR",
          message: "The password or user is incorrect",
        });
      } else {
        res.cookie("token", CheckUser._id, { httpOnly: true });
        resolve({
          status: "OK",
          message: "Đăng nhập thành công",
          data: CheckUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Update user
const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const UpdatedUser = await User.findOneAndUpdate({ _id: id }, data, {
        new: true,
        useFindAndModify: false,
      });

      if (!UpdatedUser) {
        resolve({
          status: "ERROR",
          message: "The user is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "Updated the user success",
        data: UpdatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Delete user
const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: userId,
      });

      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }

      await User.findByIdAndDelete(userId);
      resolve({
        status: "OK",
        message: "Delete user success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Detail user
const detailUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          status: "ERROR",
          message: "The user is not defined",
        });
      }

      const detailUser = await User.findOne({ _id: userId }, { Password: 0 });

      resolve({
        status: "OK",
        message: "Get detail user success",
        data: detailUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Get all user
const getAllUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allDG = "";
      if (userId && userId === "All") {
        allDG = await User.find({}, { Password: 0 }).sort({
          createdAt: -1,
          updatedAt: -1,
        });
      }

      if (userId && userId !== "All") {
        allDG = await User.findOne({ _id: userId }, { Password: 0 });
      }

      resolve({
        status: "OK",
        message: "Get all user success",
        allDG,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  signUp,
  signIn,
  updateUser,
  deleteUser,
  detailUser,
  getAllUser,
};

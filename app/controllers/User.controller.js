const UserService = require("../services/User.service");

// Sign up
const signUp = async (req, res) => {
  try {
    const { Email, Password, ConfirmPassword } = req.body;
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const checkEmail = regex.test(Email);

    if (!Email || !Password || !ConfirmPassword) {
      return res.status(400).json({
        status: "ERROR",
        message: "The input is required",
      });
    } else if (!checkEmail) {
      return res.status(400).json({
        status: "ERROR",
        message: "The input is email",
      });
    } else if (Password !== ConfirmPassword) {
      return res.status(400).json({
        status: "ERROR",
        message: "Password and ConfirmPassword are not the same",
      });
    }

    const response = await UserService.signUp(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Sign in
const signIn = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const checkEmail = regex.test(Email);

    if (!Email || !Password) {
      return res.status(400).json({
        status: "ERROR",
        message: "The input is required",
      });
    } else if (!checkEmail) {
      return res.status(400).json({
        status: "ERROR",
        message: "The input is email",
      });
    }

    const response = await UserService.signIn(req.body, res);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout
const logOut = (res) => {
  try {
    res.clearCookie("token");
    return {
      status: "OK",
      message: "Logout successfully",
    };
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: "Logout error",
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id) {
      return res.status(200).json({
        status: "ERROR",
        message: "The userId is required",
      });
    }

    const response = await UserService.updateUser(id, data);

    if (response.status === "OK") {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({
        status: "ERROR",
        message: response.message,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      status: "ERROR",
      message: "Internal Server Error",
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await UserService.deleteUser(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

// Detail user
const detailUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(200).json({
        status: "ERROR",
        message: "The userId is required",
      });
    }

    const response = await UserService.detailUser(id);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      status: "ERROR",
      message: "Internal Server Error",
    });
  }
};

// Get all user
const getAllUser = async (req, res) => {
  try {
    const userId = req.query.id;
    if (!userId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The userId is required",
        getAllUser: [],
      });
    }

    const response = await UserService.getAllUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  signUp,
  signIn,
  logOut,
  updateUser,
  deleteUser,
  detailUser,
  getAllUser,
};

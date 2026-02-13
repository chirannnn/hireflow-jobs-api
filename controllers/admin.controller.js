const User = require("../models/User");

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.userInfo.userId === id) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own role",
      });
    }

    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role is required",
      });
    }

    const allowedRoles = ["user", "employer", "admin"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role provided",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User role updated to ${role}`,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id username email role");

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { updateUserRole, getAllUsers };

const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const {
  updateUserRole,
  getAllUsers,
} = require("../controllers/admin.controller");

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome Admin ${req.userInfo.username}`,
    role: req.userInfo.role,
  });
});

router.patch(
  "/users/:id/role",
  authMiddleware,
  adminMiddleware,
  updateUserRole,
);

router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

module.exports = router;

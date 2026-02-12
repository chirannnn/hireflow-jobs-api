const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware");
const employerMiddleware = require("../middlewares/employer.middleware");
const { createJob } = require("../controllers/employer.controller");

const router = express.Router();

router.get("/dashboard", authMiddleware, employerMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome Employer ${req.userInfo.username}`,
    role: req.userInfo.role,
  });
});

router.post("/jobs", authMiddleware, employerMiddleware, createJob);

module.exports = router;

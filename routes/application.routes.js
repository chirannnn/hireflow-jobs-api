const express = require("express");
const {
  applyJob,
  getJobApplications,
  updateApplicationStatus,
  getMyApplications,
} = require("../controllers/application.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const employerMiddleware = require("../middlewares/employer.middleware");

const router = express.Router();

router.post("/:jobId", authMiddleware, applyJob);

router.get(
  "/job/:jobId",
  authMiddleware,
  employerMiddleware,
  getJobApplications,
);

router.patch(
  "/:applicationId/status",
  authMiddleware,
  employerMiddleware,
  updateApplicationStatus,
);

router.get("/my", authMiddleware, getMyApplications);

module.exports = router;

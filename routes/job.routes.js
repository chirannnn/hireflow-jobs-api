const express = require("express");

const { getAllJobs, getSingleJob } = require("../controllers/job.controller");

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getSingleJob);

module.exports = router;

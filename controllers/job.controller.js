const Job = require("../models/Job");

const getAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const sort = req.query.sort || "-createdAt";

    const skip = (page - 1) * limit;

    const totalJobs = await Job.countDocuments();

    const jobs = await Job.find()
      .select("_id title description company location salary")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalJobs / limit),
      totalJobs,
      jobs,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getSingleJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id)
      .select("_id title description company location salary")
      .populate("createdBy", "username email");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { getAllJobs, getSingleJob };

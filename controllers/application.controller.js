const Application = require("../models/Application");
const Job = require("../models/Job");

const applyJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.userInfo.userId;

    if (req.userInfo.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Only users can apply to jobs",
      });
    }

    const jobExists = await Job.findById(jobId);

    if (!jobExists) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You already applied to this job",
      });
    }

    const newApplication = new Application({
      job: jobId,
      applicant: userId,
    });

    await newApplication.save();

    return res.status(201).json({
      success: true,
      message: "Applied successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const employerId = req.userInfo.userId;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.createdBy.toString() !== employerId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view applicants",
      });
    }

    const application = await Application.find({ job: jobId })
      .populate("applicant", "username email")
      .select("_id applicant status createdAt");

    return res.status(200).json({
      success: true,
      count: application.length,
      application,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const { status } = req.body;

    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const application =
      await Application.findById(applicationId).populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application Not Found",
      });
    }

    if (application.job.createdBy.toString() !== req.userInfo.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({
      success: true,
      message: `Application ${status}`,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { applyJob, getJobApplications, updateApplicationStatus };

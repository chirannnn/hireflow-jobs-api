const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    const userId = req.userInfo.userId;

    const { title, description, company, location, salary } = req.body;

    if (!title || !description || !company || !location || !salary) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newJob = new Job({
      title,
      description,
      company,
      location,
      salary,
      createdBy: userId,
    });

    await newJob.save();

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job: newJob,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = { createJob };

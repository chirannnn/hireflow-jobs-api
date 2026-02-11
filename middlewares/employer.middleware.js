const employerMiddleware = (req, res, next) => {
  if (req.userInfo.role !== "employer") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Employers only.",
    });
  }

  next();
};

module.exports = employerMiddleware;

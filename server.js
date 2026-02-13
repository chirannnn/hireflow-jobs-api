require("dotenv").config();

const express = require("express");
const app = express();

const connectToDB = require("./database/db");

const authRoutes = require("./routes/auth.routes");
const homeRoutes = require("./routes/home.routes");
const employerRoutes = require("./routes/employer.routes");
const adminRoutes = require("./routes/admin.routes");
const jobRoutes = require("./routes/job.routes");

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/home", homeRoutes);
app.use("/api/v1/employer", employerRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/jobs", jobRoutes);

const PORT = process.env.PORT || 3000;

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  });

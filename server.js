require("dotenv").config();

const express = require("express");
const app = express();

const connectToDB = require("./database/db");

const authRoutes = require("./routes/auth.routes");

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

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

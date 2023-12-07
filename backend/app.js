require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// configuring our express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://0.0.0.0:27017/talentista");

// fetching the routers
// const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require("./routes/authRoutes");
// const fileRoutes = require('./routes/fileRoutes');
const employeeRoutes = require("./routes/employeeRoutes");
const employerRoutes = require("./routes/employerRoutes");
const jobRoutes = require("./routes/jobRoutes");

// fetching the middlewares
const reponseHeaderMiddleware = require("./middleware/responseHeader");

// app.use(reponseHeaderMiddleware.responseHeader);
app.use(authRoutes);
// app.use(fileRoutes);
app.use("/employee", employeeRoutes);
app.use("/employer", employerRoutes);
app.use(jobRoutes);

// starting the server
app.listen(process.env.DEV_PORT || 3000, () => {
  console.log(
    `App running on port ${process.env.DEV_PORT ? process.env.DEV_PORT : 3000}`
  );
});

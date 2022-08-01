const express = require("express");
const morgan = require("morgan");
const employeeRouter = require("./router/employeeRoutes");
const globalErrorHandler = require("./controller/ErrorController");
const AppError = require("./utils/AppError");
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/employees", employeeRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`${req.originalUrl} is an invalid path`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

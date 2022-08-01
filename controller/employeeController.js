const { query } = require("express");
const Employee = require("./../model/employeeModel");
const ApiFeatures = require("./../utils/ApiFeatures");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("./../utils/AppError");

// C : CREATE

exports.CreateEmployee = CatchAsync(async (req, res, next) => {
  const employeeData = await Employee.create(req.body);

  res.status(200).json({
    status: "Success",
    data: {
      employee: employeeData,
    },
  });
});

// R: READ

exports.getAllEmployees = CatchAsync(async (req, res, next) => {
  const query = ApiFeatures(Employee, req.query);
  const employeeData = await query;

  res.status(200).json({
    status: "Success",
    result: employeeData.length,
    data: {
      employee: employeeData,
    },
  });
});

exports.getAnEmployee = CatchAsync(async (req, res, next) => {
  const employee = await Employee.find({ _id: req.params.id });
  if (!employee) {
    return next(new AppError("Employee does not exist", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      employee: employee,
    },
  });
});

// U : UPDATE

exports.UpdateEmployee = CatchAsync(async (req, res, next) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!employee) {
    return next(new AppError("Employee does not exist", 404));
  }
  res.status(200).json({
    status: "Success",
    message: "Employee info Updated",
    data: {
      employee: employee,
    },
  });
});

// D: DELETE

exports.DeleteEmployee = CatchAsync(async (req, res, next) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) {
    return next(new AppError("Employee does not exist", 404));
  }
  res.status(204).json({
    status: "Success",
    data: null,
  });
});

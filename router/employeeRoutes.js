const express = require("express");
const router = express.Router();
const employeeHandler = require("./../controller/employeeController");

// For all employees
router
  .route("/")
  .get(employeeHandler.getAllEmployees)
  .post(employeeHandler.CreateEmployee);

// For employees selected by :id
router
  .route("/:id")
  .get(employeeHandler.getAnEmployee)
  .patch(employeeHandler.UpdateEmployee)
  .delete(employeeHandler.DeleteEmployee);

module.exports = router;

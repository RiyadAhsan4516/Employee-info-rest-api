const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "An employee must have a name"],
    trim: true,
    maxlength: [50, "Name of an employee cannot have more than 50 characters"],
    minlength: [2, "Name cannot have less than 2 characters"],
  },
  post: {
    type: String,
    required: [true, "An employee must have a post"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  age: {
    type: Number,
    required: [true, "An employee must have an age"],
  },
  joinningDate: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Employee = mongoose.model("employeeInfo", employeeSchema, "employeeInfo");

module.exports = Employee;

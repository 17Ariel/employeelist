let mongoose = require("mongoose");

let employeeSchema = mongoose.Schema(
  {
    position: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
  },
  { collection: "employees" }
);
module.exports = mongoose.model("Employee", employeeSchema);

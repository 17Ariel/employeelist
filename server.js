const express = require("express");

const port = process.env.PORT || 3000;
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/employeedb");
let db = mongoose.connection;

const app = express();

let Employee = require("./models/Employee");

db.once("open", () => {
  console.log("successfully connected");
});

db.on("error", (err) => {
  console.log(err);
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  Employee.find({}, (err, employeelist) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        title: "EmployeeList",
        employeeslist: employeelist,
      });
    }
  });
});

//Create
app.get("/employees/add", (req, res) => {
  res.render("add_employee", {
    title: "Add Employee",
  });
});

//Retrive All data
app.post("/employees/add", (req, res) => {
  let employee = new Employee();
  employee.fullname = req.body.fullname;
  employee.position = req.body.position;

  employee.save((err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/");
    }
  });
});
//Retrive One data
app.get("/employees/:id", (req, res) => {
  Employee.findById(req.params.id, (err, employeelist) => {
    if (err) {
      console.log(err);
    } else {
      res.render("employee", {
        title: "Employee Details",
        employee: employeelist,
      });
    }
  });
});
//Retrive One data for edit
app.get("/employee/edit/:id", (req, res) => {
  Employee.findById(req.params.id, (err, employeelist) => {
    if (err) {
      console.log(err);
    } else {
      res.render("employee_edit", {
        title: "Employee Details",
        employee: employeelist,
      });
    }
  });
});
//Update
app.post("/employees/update/:id", (req, res) => {
  let employee = {};
  employee.fullname = req.body.fullname;
  employee.position = req.body.position;

  let query = { _id: req.params.id };

  Employee.updateOne(query, employee, (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/");
    }
  });
});

//Delete
app.get("/employee/delete/:id", (req, res) => {
  let query = { _id: req.params.id };

  Employee.deleteOne(query, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});
app.listen(port, () => console.log(`You are running at port ${port} `));

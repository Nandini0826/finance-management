const employeeModel = require("../models/employee-model");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateTokens");
const customerModel = require("../models/user-model");

//registration
module.exports.registeremployee = async function (req, res) {
  let { name, employeeid, email, password } = req.body;
  let employee = await employeeModel.findOne({ email, employeeid });
  if (employee) return res.send("Already Registered");

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return res.send(err.message);
    bcrypt.hash(password, salt, async function (err, hash) {
      if (err) return res.send(err.message);
      else {
        let employee = await employeeModel.create({
          name,
          employeeid,
          email,
          password: hash,
        });
        let token = generateToken(employee, "employee");
        res.cookie("token", token);
        res.send(employee);
      }
    });
  });
};

//loginuser
module.exports.loginemployee = async function (req, res) {
  let { employeeid, password } = req.body;
  let employee = await employeeModel.findOne({ employeeid });
  if (!employee) {
    // res.send("Email or password incorrect");
    req.flash("error","Email or password incorrect");
    return res.redirect("/employee/login")
  } else
    bcrypt.compare(password, employee.password, function (err, result) {
      if (result) {
        let token = generateToken(employee, "employee");
        res.cookie("token", token);
        req.flash("success","Logged In");
        return res.redirect("/employee/registerCustomer")
      } else {
        req.flash("error","Email or password incorrect");
        return res.redirect("/employee/login")
      }
    });
};

module.exports.logout = async function (req, res) {
  res.cookie("token", "");
  req.flash("success","Logged Out");
  return res.redirect("/employee/login")
};
module.exports.registercustomer = async function (req, res) {
  let { name, Ph_No, AccNo, Branch, amount, IFSC, email, password} = req.body;
  let customer = await customerModel.findOne({ name, Ph_No, AccNo });
  if (customer) {
    req.flash("error","Already Registered");
    return res.redirect("/employee/registerCustomer")
  };
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return res.send(err.message);
    bcrypt.hash(password, salt, async function (err, hash) {
      if (err) return res.send(err.message);
      else {
        let customer = await customerModel.create({
          name,
          Ph_No,
          AccNo,
          Branch,
          IFSC,
          email,
          Balance: amount,
          password: hash,
        });
        console.log(customer);
        req.flash("success","Account Created");
        return res.redirect("/employee/registerCustomer")
      }
    });
  });
  };
module.exports.deleteemployee = async function (req, res) {
  let deletedEmployee = await employeeModel.findOneAndDelete({_id:req.params.id});
  res.cookie("token", "");
  req.flash("success", "Employee id deleted Successfully!");
  res.redirect("/");
};
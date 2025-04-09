const employeeModel = require("../models/employee-model");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateTokens");

//registration
module.exports.registeremployee = async function (req, res) {
  let { name, employeeid, email, password } = req.body;
  let employee = await employeeModel.findOne({ email, employeeid });
  if (employee) return res.send("Alreay Registerd");

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
        let token = generateToken(employee);
        res.cookie("token", token);
        res.send(employee);
      }
    });
  });
};

//loginuser
module.exports.loginemployee = async function (req, res) {
  let { email, employeeid, password } = req.body;
  let employee = await employeeModel.findOne({ email, employeeid });
  if (!employee) {
    res.send("Email or password incorrect");
    //req.flash("Email or password incorrect");
    //return res.redirect("/loginuser")
  } else
    bcrypt.compare(password, employee.password, function (err, result) {
      if (result) {
        let token = generateToken(employee);
        res.cookie("token", token);
        res.send('logged in');
      } else {
        req.send("Email or password incorrect");
      }
    });
};

module.exports.logout = async function (req, res) {
  res.cookie("token", "");
  res.send("logged out");
  // res.redirect("/");
};
module.exports.deleteemployee = async function (req, res) {
  let deletedEmployee = await employeeModel.findOneAndDelete({_id:req.params.id});
  res.cookie("token", "");
  res.send(deletedEmployee);
  //   //res.redirect("/");
  //   //req.flash("User id deleted Successfully!");

};

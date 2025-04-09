const employeeModel = require("../models/employee-model");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateTokens");

//registration
module.exports.registeremployee = async function (req, res) {
  let { name, employeeid, email, password } = req.body;
  let employee = await employeeModel.findOne({ email: email });
  if (employee) {
    return res.redirect("/");
  }

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
    let {email, password} = req.body;
    let employee = await employeeModel.findOne({email: email});
    if(!employee) {
      console.log("Email or password incorrect")
         //req.flash("Email or password incorrect");
        //return res.redirect("/loginuser")
    }

    else
    bcrypt.compare(password, employee.password, function(err, result){
    if(result)
    {
        let token = generateToken(employee);
        res.cookie("token", token);
    }
    else{
        req.flash("Email or password incorrect");
    }
})
};

module.exports.logout = async function (req, res) {
    res.cookie("token", "");
   // res.redirect("/");    
}
module.exports.deleteemployee = async function (req, res) {
    let employee = await employeeModel.findById(req.params.id);
    if(!employee) {
      console.log("User not found");
        //req.flash("User not found");
    }
    else{
    await employeeModel.findByIdAndDelete(employee._id);
    res.cookie("token", "");
    //res.redirect("/"); 
    //req.flash("User id deleted Successfully!");

    }    
    
}

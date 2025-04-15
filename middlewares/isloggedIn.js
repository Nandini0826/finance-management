const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const employeeModel = require('../models/employee-model');

module.exports = async (req, res, next) => {
  try {
    // check if not logged in (if cookies is not present)
    if (!req.cookies.token) {
      req.flash("error", "You need to login first"); 
      return res.redirect("/"); 
    }

    // If req.cookies.token has some value
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY); // returns the properties used to create token
    console.log(decoded.type);
    if(decoded.type=="user") {
      let user = await userModel
      .findOne({_id: decoded.id }) 
      .select("-password"); 
      console.log(user);
      if (!user) {
         // console.log("user not found");
         req.flash("error", "You need to login first");
         return res.redirect("/");
      }
      req.user = user; 
    }
    else if(decoded.type=="employee") {
      let user = await employeeModel
      .findOne({_id: decoded.id }) 
      .select("-password"); 
      console.log(user);
      if (!user) {
        // console.log("user not found");
        req.flash("error", "You need to login first");
        return res.redirect("/employee/login");
      }
      req.user = user; 
    }
    next();
  } catch (err) {
    req.flash("error", "something went wrong");
   console.log(err);
    res.redirect("/");
  }
};

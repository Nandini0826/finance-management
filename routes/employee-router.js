const express = require('express');
const router = express.Router();
const employeemodel = require("../models/employee-model");
const isloggedin = require("../middlewares/isloggedIn");
const { registeremployee, loginemployee, logout, deleteemployee, registercustomer} = require("../controllers/employeecontroller");

router.get("/", function(req, res){
    res.send("working");
});
router.get('/login', (req, res)=>{
   let error = req.flash("error");
   let success = req.flash("success");
   res.render('employee/employeelogin', {error, success});
})
router.post("/register", registeremployee );
router.get("/logout", logout );
router.post("/login", loginemployee);

router.get("/registerCustomer", isloggedin, (req, res)=>{
   let error = req.flash("error");
   let success = req.flash("success");
   res.render('employee/addaccount', {error, success});
})
router.post("/registerCustomer", isloggedin, registercustomer);
router.get("/delete/:id", deleteemployee);

module.exports = router;
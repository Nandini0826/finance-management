const express = require('express');
const router = express.Router();
const employeemodel = require("../models/employee-model");
const isloggedin = require("../middlewares/isloggedin");
const { registeremployee, loginemployee, logout, deleteemployee, registercustomer} = require("../controllers/employeecontroller");

router.get("/", function(req, res){
    res.send("working");
});
router.post("/register", registeremployee );
router.get('/login', (req, res)=>{
    res.render('employee/employeelogin');
})
router.post("/login", loginemployee);
router.get("/logout", logout );
router.post("/registercustomer", registercustomer);

router.get("/registercustomer", isloggedin, (req, res)=>{
    res.render('employee/addaccount');
})
router.get("/delete/:id", deleteemployee);

module.exports = router;
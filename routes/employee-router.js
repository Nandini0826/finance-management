const express = require('express');
const router = express.Router();
const employeemodel = require("../models/employee-model");
const isloggedin = require("../middlewares/isLoggedine");
const { registeremployee, loginemployee, logout, deleteemployee} = require("../controllers/employeecontroller");



router.post("/register", registeremployee );
router.post("/login", loginemployee );
router.post("/logout", logout );
router.post("/delete", deleteemployee);
router.get("/", function(req, res){
    console.log("working");
} )

module.exports = router;
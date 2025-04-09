const express = require('express');
const router = express.Router();
const employeemodel = require("../models/employee-model");
const isloggedin = require("../middlewares/isLoggedine");
const { registeremployee, loginemployee, logout, deleteemployee} = require("../controllers/employeecontroller");

router.get("/", function(req, res){
    res.send("working");
});
router.post("/register", registeremployee );
router.post("/login", loginemployee);
router.get("/logout", logout );
router.get("/delete/:id", deleteemployee);

module.exports = router;
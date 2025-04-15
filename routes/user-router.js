const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logoutUser, changePassword, setMPIN, changeMPIN} = require("../controllers/userAuthController");
const isloggedIn = require('../middlewares/isloggedIn');
const userModel = require('../models/user-model');

router.post('/register', registerUser);
router.post('/login',  loginUser);

router.get('/changePassword', isloggedIn, (req, res)=>{
   let error = req.flash("error");
   let success = req.flash("success");
   res.render("user/changePass",{error, success});
})
router.post('/changePassword', isloggedIn, changePassword);

router.get('/setMPIN', isloggedIn, (req, res)=>{
   let error = req.flash("error");
   let success = req.flash("success");
   res.render('user/setmpin', {error, success});
})
router.post('/setMPIN', isloggedIn, setMPIN);

router.get('/changeMPIN', isloggedIn, (req, res)=> {
   res.send("changeMPIN");
})
router.post('/changeMPIN', isloggedIn, changeMPIN);

router.get('/logout', isloggedIn, logoutUser);

router.get('/home', isloggedIn, async (req, res)=>{
   let foundedUser = await userModel.findOne({_id: req.user.id});
   let success = req.flash("success");
   res.render('user/home.ejs', {user: foundedUser, success})
})

module.exports = router;
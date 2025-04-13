const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logoutUser, changePassword, setMPIN, changeMPIN} = require("../controllers/userAuthController");
const isloggedIn = require('../middlewares/isloggedIn');

router.post('/register', registerUser);
router.post('/login',  loginUser);

router.get('/changePassword', isloggedIn, (req, res)=>{
   res.render("user/changePass");
})
router.post('/changePassword', isloggedIn, changePassword);

router.get('/setMPIN', isloggedIn, (req, res)=>{
   res.render('user/setmpin');
})
router.post('/setMPIN', isloggedIn, setMPIN);

router.get('/changeMPIN', isloggedIn, (req, res)=> {
   
})
router.post('/changeMPIN', isloggedIn, changeMPIN);

router.get('/logout', isloggedIn, logoutUser);

module.exports = router;
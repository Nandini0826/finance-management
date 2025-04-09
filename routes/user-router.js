const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logoutUser, changePassword, setMPIN, changeMPIN} = require("../controllers/userAuthController");

router.post('/register', registerUser);
router.post('/login',  loginUser);

router.get('/changePassword', (req, res)=>{

})
router.post('/changePassword', changePassword);

router.get('./setMPIN', (req, res)=>{

})
router.post('/setMPIN', setMPIN);

router.get('./changeMPIN', (req, res)=> {
   
})
router.post('./changeMPIN', changeMPIN);

router.get('/logout', logoutUser);

module.exports = router;
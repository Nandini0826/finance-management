const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/generateTokens');

module.exports.registerUser = async (req, res)=>{
   let {name, Ph_No, AccNo, email, password} = req.body;
   let foundedUser = await userModel.findOne({AccNo, Ph_No});
   if(!foundedUser) {
      req.flash("error", "User Not Found");
      return res.redirect('/');
   };
   
   if(foundedUser.Online_Registered) {
      req.flash("error", "Already Registered");
      return res.redirect('/');
   }

      bcrypt.compare(password, foundedUser.password,async (err, result)=> {
         if(err) return console.log(err.message);
         if(result){
            foundedUser.Online_Registered = true;
            let token = generateToken(foundedUser, "user");
            res.cookie("token", token);
            req.flash("success", "Registration Successful");
            await foundedUser.save();
            return res.redirect('/user/changePassword');
         }
         else {
            req.flash("error", "Incorrect Password");
            return res.redirect('/');
         }
      })
}

module.exports.loginUser = async (req, res)=>{
   let {AccNo, password} = req.body;
   let foundedUser = await userModel.findOne({AccNo});
   if(!foundedUser) {
      req.flash("error", "User Not Found");
      return res.redirect('/');
   }
   
   if(foundedUser.Online_Registered==false) {
      req.flash("error", "Register First");
      return res.redirect('/');
   }

      bcrypt.compare(password, foundedUser.password,async (err, result)=> {
         if(err) return console.log(err.message);
         if(result){
            let token = generateToken(foundedUser, "user");
            res.cookie("token", token);
            req.flash("success", "Loggin Successfull");
            return res.redirect('/user/home');;
         }
         else {
            req.flash("error", "Incorrect Password");
            return res.redirect('/');
         }
      })
}

module.exports.logoutUser = async (req, res)=>{
   res.cookie("token", "");
   req.flash("success", "Logged Out");
   return res.redirect('/');
}

module.exports.changePassword = async (req, res) => {
   let {oldPassword, newPassword, ConfirmPassword} = req.body;
   let foundedUser = await userModel.findOne({_id: req.user.id })
   if(!foundedUser) {
      req.flash("error", "Loggin First");
      return res.redirect('/');
   }
   bcrypt.compare(oldPassword, foundedUser.password, async (err, result)=>{
      if(err) return console.log(err.message);
      if(result) {
         if(newPassword==ConfirmPassword) {
             bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newPassword, salt, async (err, hash) => {
                    if (err) return res.send(err.message);
                    else {
                     foundedUser.password = hash;
                     await foundedUser.save();
                     req.flash("success", "Password Changed Successfully");
                     return res.redirect('/user/setMPIN');
                    }
                  });
                });
         }
         else {
            req.flash("error", "New password and confirm password doesn't match");
            return res.redirect('/user/changePassword');
         }
      }
      else {
         req.flash("error", "Incorrect old password");
         return res.redirect('/user/changePassword');
      }
   })
}

module.exports.setMPIN = async (req, res) => {
   let {MPIN, ConfirmMPIN} = req.body;
   let foundedUser = await userModel.findOne({_id: req.user.id })
   if(!foundedUser) {
      req.flash("error", "Login First");
      return res.redirect('/');
   }
   if(MPIN==ConfirmMPIN) {
      foundedUser.MPIN = MPIN;
      await foundedUser.save();
      req.flash("success", "MPIN Set Successfully");
      return res.redirect('/user/home');
   }
   else {
      req.flash("error", "Both the pin does not match");
      return res.redirect('/user/setMPIN');
   }
}

module.exports.changeMPIN = async (req, res)=> {
   let {oldMPIN, newMPIN, ConfirmMPIN} = req.body;
   let foundedUser = await userModel.findOne({_id: req.user.id })
   if(!foundedUser) return res.send("Login first");
   if(oldMPIN==foundedUser.MPIN) {
      if(newMPIN==ConfirmMPIN) {
         foundedUser.MPIN = newMPIN;
         req.flash("success", "MPIN Set");
         return res.redirect('/user/setMPIN');
      }
      else {
         res.send("The two MPIN doesn't match")
      }
   }
   else{
      res.send("Incorrect MPIN");
   }
   await foundedUser.save();
}

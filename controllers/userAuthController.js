const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');

module.exports.registerUser = async (req, res)=>{
   let {name, Ph_No, AccNo, email, password} = req.body;
   let foundedUser = await userModel.findOne({AccNo, Ph_No});
   if(!foundedUser) return res.send("Incorrect Credentials");
   
   if(foundedUser.Online_registered) return res.send("Already Registered");

      bcrypt.compare(password, foundedUser.password,async (err, result)=> {
         if(err) return console.log(err.message);
         if(result){
            foundedUser.Online_Registered = true;
            res.send("registered");
         }
         else {
            res.send("Incorrect password");
         }
         await foundedUser.save();
      })
}

module.exports.loginUser = async (req, res)=>{
   let {AccNo, password} = req.body;
   let foundedUser = await userModel.findOne({AccNo});
   if(!foundedUser) return res.send("Incorrect Credentials");
   
   if(!foundedUser.Online_registered) return res.send("Not Registered");

      bcrypt.compare(password, foundedUser.password,async (err, result)=> {
         if(err) return console.log(err.message);
         if(result){
            res.send("logged in");
         }
         else {
            res.send("Incorrect password");
         }
      })
}

module.exports.logoutUser = async (req, res)=>{
   res.cookie("token", "");
   // res.redirect("/");
   res.send("Logged Out");
}

module.exports.changePassword = async (req, res) => {
   let {oldPassword, newPassword, ConfirmPassword} = req.body;
   let foundedUser = await userModel.findOne({_id: req.user.id })
   if(!foundedUser) return res.send("Login first");
   bcrypt.compare(oldPassword, foundedUser.password, async (err, result)=>{
      if(err) return console.log(err.message);
      if(result) {
         if(newPassword==ConfirmPassword) {
             bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newPassword, salt, async (err, hash) => {
                    if (err) return res.send(err.message);
                    else {
                     foundedUser.password = hash;
                    }
                  });
                });
         }
         else {
            res.send("New password and confirm password doesn't match")
         }
      }
      else {
         res.send("Incorrect old password");
      }
      await foundedUser.save();
   })
}

module.exports.setMPIN = async (req, res) => {
   let {MPIN, ConfirmMPIN} = req.body;
   let foundedUser = await userModel.findOne({_id: req.user.id })
   if(!foundedUser) return res.send("Login first");
   if(MPIN==ConfirmMPIN) {
      foundedUser.MPIN = MPIN;
   }
   else {
      res.send("The two MPIN doesn't match")
   }
   await foundedUser.save();
}

module.exports.changeMPIN = async (req, res)=> {
   let {oldMPIN, newMPIN, ConfirmMPIN} = req.body;
   let foundedUser = await userModel.findOne({_id: req.user.id })
   if(!foundedUser) return res.send("Login first");
   if(oldMPIN==foundedUser.MPIN) {
      if(newMPIN==ConfirmMPIN) {
         foundedUser.MPIN = newMPIN;
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
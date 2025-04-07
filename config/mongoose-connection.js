const mongoose = require("mongoose");
const debug = require('debug');
const config = require('config');

const env = process.env.NODE_ENV || "development"
const dbgr = debug(`${env}:mongoose`);

if(env=="development") {
   mongoose.connect(`${config.get("MONGODB_URL")}/financeManagement`)
   .then(function(){
      dbgr("connected");
   })
   .catch(function(err){
      dbgr(err);
   });
}
else if(env=="production") {
   mongoose.connect(`${process.env.MONGO_URL}/financeManagement`)
   .then(function(){
      dbgr("connected");
   })
   .catch(function(err){
      dbgr(err);
   });
}

module.exports = mongoose.connection;
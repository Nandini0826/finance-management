const express = require("express");
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();
const db = require('./config/mongoose-connection');
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const PORT = process.env.PORT;

const userRouter = require('./routes/user-router');
const employeeRouter = require('./routes/employee-router')
const indexRouter = require('./routes/index-router')
const transactionRouter = require('./routes/transaction-router');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/employee', employeeRouter);
app.use('/transaction', transactionRouter);

app.listen(PORT, (err)=>{
   if(err) console.log(err);
   else {
      console.log("Server is running at port:", PORT);
   }
});
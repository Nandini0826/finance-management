const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
   name: String,
   email: String,
   password: String,
})

module.exports = mongoose.model("employee", employeeSchema);
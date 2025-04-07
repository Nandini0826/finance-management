const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
   email: String,
   password: String,
})

module.exports = mongoose.model("employee", employeeSchema);
const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
   name: String,
   employeeid: { type: Number, required: true, unique: true },
   email: { type: String, required: true, unique: true },
   password: String,
})

module.exports = mongoose.model("employee", employeeSchema);
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  Ph_No: Number,
  AccNo: Number,
  Branch: String,
  IFSC: String,
  email: String,
  MPIN: Number,
  Password: String,
  Balance: Number,
  Online_Registered: {
    type: Boolean,
    default: false,
  },
  Transaction: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "transaction",
    },
  ],
  Loan: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "loan",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);

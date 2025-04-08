const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  SenderACC_NO: Number,
  SenderName: String,
  ReceiverACC_NO: Number,
  ReceiverName: String,
  OtherBank: {
   type: Boolean,
   default: false,
  },
  BankName: String,
  ReceiverIFSC: String,
  Amount: Number,
  Date: {
   type: Date,
  }
})

module.exports = mongoose.model("transaction", transactionSchema);
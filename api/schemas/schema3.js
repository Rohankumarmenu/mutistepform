const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  cardnum: {
    type: String,
    required: true,
  },
  cvcnum: {
    type: String,
    required: true,
  },
  expdate: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;

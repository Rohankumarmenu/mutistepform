const mongoose = require('mongoose');

const userSchema2 = new mongoose.Schema({
  firstname: {
    type: String,
    required: true, 
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
 
  },
});

const User2 = mongoose.model('User2', userSchema2);

module.exports = User2;

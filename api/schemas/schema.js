const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
     
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!value.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)) {
          throw new Error('Email is not valid.');
        }
      }
    },
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

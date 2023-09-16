const validator = require("validator");

const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: "Invalid avatar URL",
    },
  },
});

module.exports = mongoose.model("user", usersSchema);

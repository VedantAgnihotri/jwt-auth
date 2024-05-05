var express = require('express');
var router = express.Router();
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/jwt");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number
})

module.exports = mongoose.model("user", userSchema);
const express = require('express');
const { Login, signup } = require('../controllers/authController');
const route = express.Router();

route.post("/login" , Login) ;
route.post("/signup" , signup) ;


module.exports = route ;
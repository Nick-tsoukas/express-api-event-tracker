const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users');


router.get('/', (req,res,next) => {
    res.send('This should get all users');
});

router.patch('/edit', (req, res, next) => {
    res.send('this route will allow a user to update their user profile');
});

router.post('/', (req, res, next) => {
  
});

module.exports = router;
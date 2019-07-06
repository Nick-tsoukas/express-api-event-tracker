const express = require('express');
const router = express.Router();


router.get('/', (req,res,next) => {
    res.send('This should get all users');
});

router.patch('/edit', (req, res, next) => {
    res.send('this route will allow a user to update their user profile');
});

router.post('/create', (req, res, next) => {
    res.send('this route will create a user');
});

module.exports = router;
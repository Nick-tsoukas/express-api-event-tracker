const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.send('this is the home route');
})

module.exports = router;
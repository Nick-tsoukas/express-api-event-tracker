const express = require('express');
const router = express.Router();

//  Events routes 
router.get('/', (req,res,next) => {
    res.send('Return all events');
});

router.get('/:id', (req, res, next) => {
    res.send('this route will get one event');
})

module.exports = router;
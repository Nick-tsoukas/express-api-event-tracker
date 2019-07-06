const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../models/events');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/:eventId', urlencodedParser, (req, res, next) => {
    res.send('this route will handle the comments');
});

router.post('/:id', urlencodedParser, (req, res, next) => {
    // using the event id post a comment to the event and then send the event to the client 
    // lets try and get the user input
    Event.findOneAndUpdate({eventId: req.params.id}).then((event) => {
        event.comments.push(req.body);
        event.save().then((savedEvent) => {
            res.send(savedEvent);
        });
    })
    .catch((err) => {
        if(err) {
            res.send(err)
        }
    })
    
})

module.exports = router;
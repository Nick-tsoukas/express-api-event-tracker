require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('../models/events');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const sources = require('../helpers/sources');
const eURL = `https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?api_key=${process.env.API_KEY}&limit=10&source=${sources}`;

// your fist goal should be to get all the events and then save them to the mongoose db

// This route will get all the events from the database
router.get('/', (req, res, next) => {
   Event.find().then((events) => {
      return events
   })
   .then((data) => {
       res.send(data);
   })
   .catch((err) => {
       res.send('Could not find any events from the db ', err.message)
   })
});


// The build route will get new events from the api call and save them to the database ... if they don't already exist
router.get('/build', (req, res, next) => {
    axios.get(eURL).then((response) => {
            return response.data.events;
        })
        .then((data) => {
            data.forEach((event) => {
                Event.find({
                        eventId: event.id
                    }).then((result) => {
                        if (!result.length) {
                            let myEvent = new Event({
                                title: event.title,
                                eventId: event.id,
                                type: event.categories[0].title,
                                description: event.description || event.title,
                                comments: [],
                                coordinates: event.geometries[0].coordinates,
                                date: event.geometries[0].date
                            });
                            myEvent.save().then((e) => {
                                    console.log(e)
                                })
                                .catch((err) => {
                                    console.log('could not save event to database')
                                })
                        }
                    })
                    .catch((err) => {
                        console.log('The event is already in the database')
                    })
            })
            return data
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            if (err) {
                res.send('there was an error could not get data from nasa');
            }
        })
})

router.get('/:id', (req, res, next) => {
    res.send('this route will get one event');
});

module.exports = router;
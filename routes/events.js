require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Event = require('../models/events');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const sources = require('../helpers/sources');
const eURL = `https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?api_key=${process.env.API_KEY}&limit=100&source=${sources}&status=open`;

// your fist goal should be to get all the events and then save them to the mongoose db

// This route will get all the events from the database
router.get('/', async (req, res, next) => {
    try {
        const events = await Event.find({}).sort({
            date: -1
        });
        if (!events) {
            res.status(404).send({
                message: "Could not find events"
            });
        }
        res.status(200).send(events);
    } catch (error) {
        res.status(500).send({
            message: "Server error ... no events found"
        })
    }
});

router.get('/type/:type', async (req, res, next) => {
    try {
        const events = await Event.find({type: req.params.type});
        res.send(events);
    } catch(e) {
        res.send(e);
    }
})

router.get('/test', async (req, res, next) => {
   

})


// The build route will get new events from the api call and save them to the database ... if they don't already exist
router.get('/build', async (req, res, next) => {
    // chceks to see if there are new events that need to be saved to the database ... callback hello and will try and refactor 
    // start of working function ===========================
    axios.get(eURL).then((response) => {
            return response.data.events;
        })
        .then((data) => {
            data.forEach((event) => {
                // This checks if the event already exists in the database. If not ... build and save 
                Event.find({
                        eventId: event.id
                    }).then((result) => {
                        if (!result.length && event.categories[0].title != "Sea and Lake Ice") {
                            const myEvent = new Event({
                                title: event.title,
                                eventId: event.id,
                                type: event.categories[0].title,
                                description: event.description || event.title,
                                comments: [],
                                coordinates: event.geometries[0].coordinates,
                                date: event.geometries[0].date,
                                createdAt: new Date()
                            });
                            myEvent.save()
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
        .then(async (data) => {
            try {
                const events = await Event.find({});
                res.send(events);

            } catch (e) {
                res.send(e)
            }
        })
        .catch((err) => {
            if (err) {
                res.send('there was an error could not get data from nasa');
            }
        })
        // ++++++++================= end
});




router.get('/last', async (req, res, next) => {
    try {
        const last = await Event.findOne({}).sort({
            date: -1
        });
        if (!last) {
            res.send({
                message: "Could not query the db"
            });
        }
        res.send(last);
    } catch (error) {
        res.send(err);
    }

});

router.get('/:id', (req, res, next) => {
    // if cannot find an entry then is returns null
    Event.findOne({
            eventId: req.params.id
        }).then((event) => {
            if (!event) throw new Error('problem')
            res.send(event);
        })
        .catch((err) => {
            res.send(err);
        })
});

module.exports = router;
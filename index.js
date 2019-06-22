const path = require('path');
const express = require('express');
const axios = require('axios');
const chalk = require('chalk');
const cors = require('cors');
const port = process.env.PORT || 3000;
const eURL = `https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?api_key=${process.env.API_KEY}&limit=20`;

const app = express();

app.use(cors());

app.get('/', (err, res) => {
    res.send('this is the home route')
})

app.get('/events', (err, res) => {
    console.log('asking for events now')
    // make a call to the events api from nasa and send back a list of events
    axios.get(eURL)
        .then((response) => {
            const o = cleanData(response.data.events);
            res.json(o)
        })
        .catch((err) => {
            if (err) throw err;
        });
});

app.get('/events/log', (err, res) => {
    axios.get(eURL)
        .then((response) => {
            res.render(response)
        })
        .catch((err) => {
            if (err) throw err;
        });
})

app.get('/apod', (err, res) => {
    // get the pic of the day
    res.send('this should render the nasa pic of the day')
});

function cleanData(data) {
    let eventObject = data.map((event) => {
        let {
            date,
            coordinates
        } = event.geometries[0];
        return {
            title: event.title,
            time: new Date(date).toDateString(),
            type: event.categories[0].title,
            location: coordinates
        }
    });
    return eventObject;
}

app.listen(port, (err, res) => {
    console.log(
        `\n${chalk.green.bold('The Server is now listening \n=====')}`
    )
})
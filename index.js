require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');
const chalk = require('chalk');
const cors = require('cors');
const port = process.env.PORT || 3000;
const GEO_KEY = process.env.GEO_KEY;
const eURL = `https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?api_key=${process.env.API_KEY}&limit=20`;



const app = express();

app.use(cors());


app.get('/', (err, res) => {
    res.send('this is the home route')
})

app.get('/events', (err, res) => {
    console.log('asking for events now');
    let eventObject;
    // make a call to the events api from nasa and send back a list of events
    axios.get(eURL)
        .then((response) => {
            eventObject = cleanData(response.data.events);

            return eventObject;
        })
        .then((data) => {
            data.forEach((event) => {
                getCity(event.location)
            })
           res.send(data)
        })
        .catch((err) => {
            if (err) throw err;
        });
});

app.get('/geo', (err, res) => {
    
})

app.get('/events/log', (err, res) => {
    axios.get(eURL)
        .then((response) => {
            res.render(response)
        })
        .catch((err) => {
            if (err) throw err;
        });
})

app.get('/places', (err, res) => {
    getLocation('14.382,-90.601')
})

app.get('/apod', (err, res) => {
    // get the pic of the day
    res.send('this should render the nasa pic of the day')
});

// add city 
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
            location: coordinates.reverse()
        }
    });
    return eventObject;
}

function getLocation(geo) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${geo}.json?access_token=pk.eyJ1IjoieGFjaWR4MTAxIiwiYSI6ImNqd2pmZmg4bDBybnc0YW14azZidjV1eGYifQ.JAUxgxeWx5zbq3UpUxOQ3g&limit=1`;
    axios.get(url)
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            if (err) console.log(err);
        })
}

function getCity(latLong){
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLong}&key=${process.env.G_KEY}`)
    .then((response) => {
        let [ ...address ] = response.data.results[0].address_components;
        let city = address[2].long_name;
        let state = address[3].long_name;
        console.log(city, state)
        // res.send(city);
    })
    .catch((err) => {
        if (err) return err;
    })
}



app.listen(port, (err, res) => {
    console.log(
        `\n${chalk.green.bold('The Server is now listening \n=====')}`
    )
})
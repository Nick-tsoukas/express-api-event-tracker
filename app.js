require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const axios = require('axios');
const chalk = require('chalk');
const cors = require('cors');
const port = process.env.PORT || 3000;
const GEO_KEY = process.env.GEO_KEY;
const sources = require('./helpers/sources');
const EventSchema = require('./helpers/events.schema');
const categoriesURL = `https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories?api_key=${process.env.API_KEY}`
const eURL = `https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?api_key=${process.env.API_KEY}&limit=100&status=closed&source=${sources}`;
const sourceURL = `https://eonet.sci.gsfc.nasa.gov/api/v2.1/sources?api_key${process.env.API_KEY}`;

// routes 

const eventRoutes = require('./routes/events');
const commentsRoutes = require('./routes/comments');
const userRoutes = require('./routes/users');
const indexRoutes = require('./routes/index');

mongoose.connect('mongodb://127.0.0.1:27017/nasa_data', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});



app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}))
// routes config
app.use('/events', eventRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentsRoutes);
app.use(indexRoutes);

app.listen((port) , (err, res) => {
    console.log('The server is now listening');
})

// app.get('/', (err, res) => {
//     res.send('this is the home route');
// });

// app.get('/events', (err, res) => {
//     console.log('asking for events now');
//     let eventObject;
//     // make a call to the events api from nasa and send back a list of events
//     axios.get(eURL)
//         .then((response) => {
//             eventObject = cleanData(response.data.events);
//             return eventObject;
//         })
//         .then((data) => {
//             data.forEach((event) => {});
//             console.log(data)
//             res.send(data)
//         })
//         .catch((err) => {
//             if (err) throw err;
//         });
// });

// app.get('/events/log', (req, res, next) => {

//     axios.get(eURL).then((response) => {
//             response.data.events.forEach((event) => {
//                 let type = event.categories[0].title;
//                 if (EventSchema.hasOwnProperty(type)) {
//                     EventSchema[type].count++;
//                     EventSchema[type].events.push({
//                         title: event.title
//                     });
//                 };
//             });
//             console.log(typeof(EventSchema))
//             res.send(EventSchema);
//         })
//         .catch((err) => {
//             res.send(err);
//         });
// });

// app.listen(port, (err, res) => {
//     console.log(
//         `\n${chalk.green.bold('The Server is now listening \n=====')}`
//     )
// });





//+++++++++++++++++++++++++++
// function cleanData(data) {
//     let eventObject = data.map((event) => {
//         let {
//             date,
//             coordinates
//         } = event.geometries[0];
//         return {
//             title: event.title,
//             time: new Date(date).toDateString(),
//             type: event.categories[0].title,
//             location: coordinates.reverse()
//         }
//     });
//     return eventObject;
// }

// function getCity(latLong) {
//     axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLong}&key=${process.env.G_KEY}`)
//         .then((response) => {

//             let [...address] = response.data.results[0].address_components;
//             let cityState = `${address[2].long_name} ${address[3].long_name}`;
//             console.log(address[2].long_name)
//             // return cityState;

//         })
//         .catch((err) => {
//             if (err) return err;
//         })
// }

// function getLocation(geo) {
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${geo}.json?access_token=pk.eyJ1IjoieGFjaWR4MTAxIiwiYSI6ImNqd2pmZmg4bDBybnc0YW14azZidjV1eGYifQ.JAUxgxeWx5zbq3UpUxOQ3g&limit=1`;
//     axios.get(url)
//         .then((response) => {
//             console.log(response)
//         })
//         .catch((err) => {
//             if (err) console.log(err);
//         })
// }

// app.get('/places', (err, res) => {
//     getLocation('14.382,-90.601')

// app.get('/events/sources', (req, res, next) => {
//     axios.get(sourceURL).then((response) => {
//             let sourceStrings = []
//             response.data.sources.forEach((source) => {
//                 sourceStrings.push(source.id);
//             });
//             return sourceStrings;
//         })
//         .then((sources) => {
//             res.send(sources);
//         })
//         .catch((err) => {
//             res.send(err);
//         })

// })
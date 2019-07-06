let EventSchema = {
    "Wildfires": {
        count: 0,
        events: [],
    },
    "Drought": {
        count: 0,
        events: [],

    },
    "Dust and Haze": {
        count: 0,
        events: [],
    },
    "Earthquakes": {
        count: 0,
        events: []
    },
    "Floods": {
        count: 0,
        events: []
    },
    "Severe Storms": {
        count: 0,
        events: []
    },
    Landslides: {
        count: 0,
        events: []
    },
    Manmade: {
        count: 0,
        events: []
    },
    "Temperature Extremes": {
        count: 0,
        events: []
    },
    "Water Color": {
        count: 0,
        events: []
    },
}

let event = {
    type: String,
    count: Number,
    events: [],
    comments: []
}

module.exports = EventSchema;
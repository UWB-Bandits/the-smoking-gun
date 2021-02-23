const axios = require("axios");
const router = require("express").Router();
require("dotenv").config();

// Route for WeatherAPI call
router.route("/").post((req, res) => {
    axios.get("http://api.weatherapi.com/v1/current.json?key=" + process.env.REACT_APP_WEATHER_API_KEY + "&q=" + req.body.Latitude + "," + req.body.Longitude)
    .then(data => {
        res.json(data.data);
    }).catch(err =>
        res.json(err));
});

// Route for NYT API call - top stories
router.route("/").get((req, res) => {
    axios.get("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + process.env.REACT_APP_NYT_API_KEY)
        .then(data => {
            // console.log("test");
            // console.log(data.data.results);
            res.json(data.data.results);
        }).catch(err =>
            res.json(err));
});

module.exports = router;

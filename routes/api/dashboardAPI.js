const axios = require("axios");
const router = require("express").Router();
require("dotenv").config();

router.route("/").post((req, res) => {
    axios.get("http://api.weatherapi.com/v1/current.json?key=" + process.env.REACT_APP_WEATHER_API_KEY + "&q=" + req.body.Latitude + "," + req.body.Longitude)
    .then(data => {
        res.json(data.data);
    }).catch(err =>
        res.json(err));
});

module.exports = router;

const axios = require("axios");
const router = require("express").Router();
require("dotenv").config();

router.route("/").get((req, res) => {
    axios.get("http://api.weatherapi.com/v1/current.json?key=" + process.env.REACT_APP_WEATHER_API_KEY + "&q=90210")
        .then(data => {
            console.log("test");
            console.log(data);
            res.json(data.data);
        }).catch(err =>
            res.json(err));
});

// module.exports = {
//    const weatherAPI = function(query) {
//         return axios.get("http://api.weatherapi.com/v1/current.json?key=" + process.env.REACT_APP_WEATHER_API_KEY + "&q=" + query);
//     };
// };

module.exports = router;

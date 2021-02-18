import axios from "axios";

export default {
    searchWord: function() {
        return axios.get("https://random-words-api.vercel.app/word");
    }
};

// export default {
//     weatherAPI: function(query) {
//         return axios.get("http://api.weatherapi.com/v1/current.json?key=" + process.env.REACT_APP_WEATHER_API_KEY + "&q=" + query);
//     }
// };
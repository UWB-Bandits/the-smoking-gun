import axios from "axios";
//makes an api call to the random words api (does not need API key)
export default {
    searchWord: function() {
        return axios.get("https://random-words-api.vercel.app/word");
    }
};

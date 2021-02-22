import axios from "axios";

export default {
    searchWord: function() {
        return axios.get("https://random-words-api.vercel.app/word");
    }
};

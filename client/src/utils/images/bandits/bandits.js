//imports photos of all the developers
import aubrey from "./aubrey.png";
import brandon from "./brandon.jpg";
import nicole from "./nicole.jpg";
import kenneth from "./kenneth.jpg";
//This file creates an array of developer photos, names, and links. This allows the BanditPhotos compnent to iterate over these, rather than needing to pass each as individual props
const bandits = [
    {
        image: aubrey,
        name: "Aubrey Heim",
        link: "https://github.com/aubrey-heim"
    },
    {
        image: kenneth,
        name: "Kenneth Kopelson",
        link: "https://github.com/Kopelson"
    },
    {
        image: nicole,
        name: "Nicole Marshall",
        link: "https://github.com/ncmarsh"
    },
    {
        image: brandon,
        name: "Brandon VanAllen",
        link: "https://github.com/BrandonVA"
    },
];

export default (bandits);
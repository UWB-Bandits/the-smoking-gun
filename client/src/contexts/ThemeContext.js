import React from "react";

const ThemeContext = React.createContext("red");

export default ThemeContext;



// import API from "../utils/API";

// const ThemeContext = React.createContext();

// export const useTheme = () => {
//     return useContext(ThemeContext);
// };

// export const ThemeProvider = ({ children }) => {
//     const [bookTheme, setBookTheme] = useState();
//     const [colorScheme, setColorScheme] = useState();

//     const themeOptions = {
//         red: {
//             backgroundColor: "red",
//             color: "red",
//             fontSize: "100px"
//         },
//         blue: {
//             backgroundColor: "blue",
//             color: "blue",
//             fontSize: "100px"
//         },
//         green: {
//             backgroundColor: "green",
//             color: "green",
//             fontSize: "100px"
//         }
//     };
    
//     const getColorScheme = (id) => {
//         API.getBook(id)
//             .then(res => {
//                 setColorScheme(res.data.colorScheme);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     };

//     const getBookTheme = (colorScheme) => {
//         setBookTheme(themeOptions.colorScheme);
//     };
// };



// const ThemeContext = React.createContext({    
//     red: {
//         backgroundColor: "red",
//         color: "red",
//         fontSize: "100px"
//     },
//     blue: {
//         backgroundColor: "blue",
//         color: "blue",
//         fontSize: "100px"
//     },
//     green: {
//         backgroundColor: "green",
//         color: "green",
//         fontSize: "100px"
//     }
// });
//     // bookTheme.blue
// export default ThemeContext;
import React, { useState, useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import Jumbotron from "../components/Jumbotron";
import BookButton from "../components/BookButton";
import { useAuth } from "../contexts/AuthContext";
import API from "../utils/API";

import WeatherWidget from "../components/DashboardWidgets/WeatherWidget";
import NewsWidget from "../components/DashboardWidgets/NewsWidget";
// import ThemeContext from "../contexts/ThemeContext";
// import RandomWordWidget from "../components/DashboardWidgets/RandomWordWidget";
// import DashboardAPI from "../utils/dashboardAPI";

function Dashboard() {
  // Gets current user data
  // Set state based off user id form mongo db
  const [user, setUser] = useState({});
  const [usersBooks, setUsersBooks] = useState([]);
  const { currentUser } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  const [news, setNews] = useState([]);
  // const [randomWord, setRandomWord] = useState({});

  // const [booktheme, setBookTheme] = useState();
  
  // console.log(props);
  // const [themeMode, setThemeMode] = useContext(ThemeContext);

  // const grabBookTheme = (id) => {
  //   API.getBook(id)
  //     .then(res =>
  //       setBookTheme(res.data.colorScheme));
  // };

  useEffect(() => {
    getUser();
    getAllBooks();
    weatherSearch();
    // wordSearch();
    newsSearch();
  }, []);


  const getAllBooks = () => {
    //  for the currentUser.uid
    API.getBooksWhere(currentUser.uid)
      .then((res) => {
        setUsersBooks(res.data);
        // console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const getUser = () => {
    API.getUser(currentUser.uid)
      .then(res => {
        setUser(res.data);
        // console.log(res);
      });
  };

  const weatherSearch = () => {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      let crd = pos.coords;

      // console.log("Your current position is: ");
      // console.log(`Latitude: ${crd.latitude}`);
      // console.log(`Longitude: ${crd.longitude}`);
      // console.log(`More or less ${crd.accuracy} meters.`);
  
      API.postWeather({Latitude: crd.latitude,Longitude: crd.longitude})
        .then(res => {
          // console.log(res);
          setWeather(res.data);
          setIsLoaded(true);
        })
        .catch(err => {
          setIsLoaded(true);
          console.log(err);
        });
    }

    function errors(err) {
      console.log(`ERROR(${err.code}) : ${err.message}`);
    }

    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (result.state === "granted") {
            console.log(result.state);
            // If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            console.log(result.state);
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            // If denied you have to show instructions to enable location
            console.log("enable location");
          }
          result.onchange = () => {
            console.log(result.state);
          };
        });
      } else {
      alert("Sorry not available!");
      }
    };

  const newsSearch = () => {
    API.getNews()
      .then(res => {
        // console.log(res.data);
        let topNews = res.data.slice(0, 10);
        setNews(topNews);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // const wordSearch = () => {
  //   DashboardAPI.searchWord()
  //     .then(res => {
  //       setRandomWord(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div>
      <Box>
        <Jumbotron userName={user.firstName} />
        <Grid container>
          <BookButton
            title="Create a new book!"
            description="Click here to start a new journal"
            link="/create-book"
            colorScheme="yellow"
          />
          {usersBooks.map((item) => (
            // <ThemeContext.Consumer key={item.colorScheme}>
              <BookButton key={item._id} link={`/books/${item._id}`} {...item} 
                // onClick={() => setThemeMode(themeMode === item.colorScheme)}
                // theme={item.colorScheme}
              />
            // </ThemeContext.Consumer>
          ))}
          {isLoaded ?
            <WeatherWidget weather={weather} />
             : <div>Loading</div> 
          }
          {/* {isLoaded ?
            <RandomWordWidget randomWord={randomWord} />
             : <div>Loading</div> 
          } */}
          {isLoaded ? 
            <NewsWidget news={[...news]} />
             : <div>Loading</div> 
          }
        </Grid>
      </Box>
    </div>
  );
}

export default Dashboard;

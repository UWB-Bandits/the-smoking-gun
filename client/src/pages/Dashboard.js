//import react and react hooks
import React, { useState, useEffect } from "react";
//import Material UI components
import { Box, Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Jumbotron from "../components/Jumbotron";
import BookButton from "../components/BookButton";
//import context
import { useAuth } from "../contexts/AuthContext";
//import routes
import API from "../utils/API";
import DashboardAPI from "../utils/dashboardAPI";
//import components
import WeatherWidget from "../components/DashboardWidgets/WeatherWidget";
import NewsWidget from "../components/DashboardWidgets/NewsWidget";
import RandomWordWidget from "../components/DashboardWidgets/RandomWordWidget";
//initialize Dashboard page
function Dashboard() {
  //set state hooks
  const [user, setUser] = useState({});
  const [usersBooks, setUsersBooks] = useState([]);
  const [weatherLoaded, setWeatherLoaded] = useState(false);
  const [wordLoaded, setWordLoaded] = useState(false);
  const [newsLoaded, setNewsLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  const [news, setNews] = useState([]);
  const [randomWord, setRandomWord] = useState({});
  const [bookSize, setBookSize] = useState({});
  const [windowSize, setWindowSize] = useState("");
  //grabs the current user information
  const { currentUser } = useAuth();
  //this allows the page to run these side effects 
  useEffect(() => {
    getUser();
    getAllBooks();
    weatherSearch();
    wordSearch();
    newsSearch();
  }, []);
  useEffect(() => {
    resizeBooks();
  }, [windowSize]);
  //this listens to the window and sets windowSize state to the inner width
  window.onresize = () => {
    setWindowSize(window.innerWidth);
  };
  //this compares window width and sets bookSize state
  function resizeBooks() {
    var width = window.innerWidth;
    if (width > 1100) {
      setBookSize({
        bookWidth: "250px",
        textSize: "30px",
      });
    } else if (width > 550) {
      setBookSize({
        bookWidth: "150px",
        textSize: "25px",
      });
    } else if (width > 340) {
      setBookSize({
        bookWidth: "100px",
        textSize: "15px",
      });
    } else {
      setBookSize({
        bookWidth: "80px",
        textSize: "12px",
      });
    }
  }
  //this gets all the books that belong to the current user and sets it to usersBooks state
  const getAllBooks = () => {
    //  for the currentUser.uid
    API.getBooksWhere(currentUser.uid)
      .then((res) => {
        setUsersBooks(res.data);
      })
      .catch((err) => console.log(err));
  };
  //this gets the current users information from the database and sets it to user state
  const getUser = () => {
    API.getUser(currentUser.uid).then((res) => {
      setUser(res.data);
    });
  };
  //this searches for the weather of the current users geolocation location
  const weatherSearch = () => {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    //this makes an api request if geolocation location is a success and sets weather state and makes weatherLoaded state true
    function success(pos) {
      let crd = pos.coords;
      API.postWeather({ Latitude: crd.latitude, Longitude: crd.longitude })
        .then((res) => {
          setWeather(res.data);
          setWeatherLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //this console logs errors
    function errors(err) {
      console.log(`ERROR(${err.code}) : ${err.message}`);
    }
    //this checks the users navigator geolocation, asks for permission and runs weather search on success or alerts the user not available.
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          // If granted then you can directly call your function here
          navigator.geolocation.getCurrentPosition(success);
        } else if (result.state === "prompt") {
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
  //this grabs top news stories from the New York Times sets news state and newsLoaded to true
  const newsSearch = () => {
    API.getNews()
      .then((res) => {
        let topNews = res.data.slice(0, 10);
        setNews(topNews);
        setNewsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setNewsLoaded(true);
      });
  };
  //this grabs a random word for the word of the day, sets randomWord state and sets wordLoaded to true
  const wordSearch = () => {
    DashboardAPI.searchWord()
      .then((res) => {
        setRandomWord(res.data);
        setWordLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //this renders a dashboard that welcomes the user, displays fun widgets, and lists the books they own
  return (
    <div>
      {/* Material-UI Box component serves as a wrapper component for most of the CSS utility needs. */}
      <Box>
        {/* a custom component displays user information and date */}
        <Jumbotron userName={user.firstName} />
        {/* The Material Design responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts. */}
        <Grid container justify="center">
          {weatherLoaded ? (
            // custom component displays weather info
            <WeatherWidget weather={weather} />
          ) : (
            <div>
              Loading Weather...
              {/* Material UI Progress indicator commonly known as spinners, express an unspecified wait time or display the length of a process. The animation works with CSS, not JavaScript. */}
              <CircularProgress />
            </div>
          )}
          {wordLoaded ? (
            // custom component displays the random word of the day
            <RandomWordWidget randomWord={randomWord} />
          ) : (
            <div>
              Loading Word...
              <CircularProgress />
            </div>
          )}
          {newsLoaded ? (
            // custom component displays the news
            <NewsWidget news={[...news]} />
          ) : (
            <div>
              Loading Top Stories...
              <CircularProgress />
            </div>
          )}
        </Grid>
        <Grid container>
          {/* custom component that sends the user to the CreatBook page */}
          <BookButton
            title="Create a new book!"
            description="Click here to start a new journal"
            link="/create-book"
            colorScheme="yellow"
            bookSize={bookSize}
          />
          {/* this maps over the users books and displays the book title and description that sends them t */}
          {usersBooks.map((item) => (
            <BookButton
              key={item._id}
              bookSize={bookSize}
              edit={true}
              id={item._id}
              link={`/books/${item._id}`}
              {...item}
            />
          ))}
        </Grid>
      </Box>
    </div>
  );
}
//exports the Dashboard page
export default Dashboard;

import React, { useState, useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import Jumbotron from "../components/Jumbotron";
import BookButton from "../components/BookButton";
import { useAuth } from "../contexts/AuthContext";
import API from "../utils/API";
import WeatherWidget from "../components/DashboardWidgets/WeatherWidget";
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
  // const [randomWord, setRandomWord] = useState({});
  const[bookSize, setBookSize]=useState({});
  const [windowSize, setWindowSize]=useState("");

  useEffect(() => {
    getUser();
    getAllBooks();
    weatherSearch();
    // wordSearch();
  }, []);

  useEffect(() => {
    resizeBooks();
  }, [windowSize]);

  window.onresize = () => {
    setWindowSize(window.innerWidth);
  };

  function resizeBooks() {
    var width = window.innerWidth;
    if (width>1100) {
      setBookSize({
        bookWidth: "350px",
        pushTop: "100px",
        textSize: "30px",
      });
    } else if (width>550) {
      setBookSize({
        bookWidth: "250px",
        pushTop: "50px",
        textSize: "25px",
      });
    } else if (width>340) {
      setBookSize({
        bookWidth: "150px",
        pushTop: "15px",
        textSize: "15px",
      });
    } else {
      setBookSize({
        bookWidth: "120px",
        pushTop: "10px",
        textSize: "12px",
      });
    }
  }

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

      console.log("Your current position is: ");
      console.log(`Latitude: ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
  
      API.postWeather({Latitude: crd.latitude,Longitude: crd.longitude})
        .then(res => {
          console.log(res);
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
            bookSize={bookSize}
          />
          {usersBooks.map((item) => (
              console.log(item),
              <BookButton key={item._id} bookSize={bookSize} edit={true} id={item._id} link={`/books/${item._id}`} {...item} />
          ))}
          {isLoaded ?
            <WeatherWidget weather={weather} />
             : <div>Loading</div> 
          }
          {/* {isLoaded ?
            <RandomWordWidget randomWord={randomWord} />
             : <div>Loading</div> 
          } */}
        </Grid>
      </Box>
    </div>
  );
}

export default Dashboard;

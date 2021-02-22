/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import HeadingNav from "./components/HeadingNav/HeadingNav";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import IndexPage from "./pages/IndexPage";
import Lists from "./pages/Lists";
import Calendars from "./pages/Calendars";
import CreateBook from "./pages/CreateBook";
import Footer from "./components/Footer";
import Habits from "./pages/Habits";
import NoMatch from "./pages/NoMatch";
import fire from "./utils/firebase";
import API from "./utils/API";
import { AuthProvider } from "./contexts/AuthContext";
import Settings from "./pages/Settings";
import { Container } from "@material-ui/core";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mongoUser, setMongoUser] = useState(false);
  const [firebaseID, setFirebaseID] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setMongoUser(false);
    fire.auth().onAuthStateChanged((user) => {
      if (isLoggedIn && user) {
        setFirebaseID(user.uid);
      }
      return user
        ? setIsLoggedIn(true)
        : (setIsLoggedIn(false), setFirebaseID(false));
    });
  }, [isLoggedIn]);

  useEffect(() => {
    let unsubscribe;

    if (isLoggedIn && !mongoUser) {
      console.log("something");
      unsubscribe = API.getUser(firebaseID)
        .then((Muser) => {
          console.log(Muser.data._id);
          setMongoUser(true);
          setError(false);
        })
        .catch((err) => {
          console.log(err);
          setMongoUser(false);
          setError(true);
        });
    }
    return unsubscribe;
  }, [firebaseID, error]);

  console.log(mongoUser);

  return (
    <AuthProvider>
      <div id="App">
        <Router>
          {!mongoUser && !error ? (
            <>
              <Switch>
                <Route exact path="/">
                  <SignIn />
                </Route>
              </Switch>
            </>
          ) : (
            <div>
              <HeadingNav />
              <Container>
              <Switch>
                <Route exact path={["/", "/dashboard"]}>
                  <Dashboard />
                </Route>
                <Route exact path="/books/:bookId">
                  <IndexPage />
                </Route>
                <Route exact path="/books/:bookId/lists/:listId">
                  <Lists />
                </Route>
                <Route exact path="/books/:bookId/calendars/:calId">
                  <Calendars />
                </Route>
                <Route exact path="/create-book">
                  <CreateBook />
                </Route>
                <Route exact path="/books/:bookId/habits/:habitId">
                  <Habits />
                </Route>
                <Route exact path="/settings">
                  <Settings />
                </Route>
                <Route>
                  <NoMatch />
                </Route>
              </Switch>
              </Container>
              <Footer />
            </div>
          )}
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;

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
import DoodlePage from "./pages/DoodlePage";
import { Container } from "@material-ui/core";
import DoodleIndex from "./pages/DoodleIndex";
import Journaling from "./pages/Journaling";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mongoUser, setMongoUser] = useState(false);
  const [firebaseID, setFirebaseID] = useState();
  const [error, setError] = useState();
  const [pathname, setPathname] = useState(window.location.pathname);
  const [doodleRoute, setDoodleRoute] = useState(false);

  const usePathname = () => {
    const location = window.location.pathname;
    setPathname(location);
    return location;
  };

  useEffect(() => {
    usePathname();
    pathname.includes("/newDoodle") === true
      ? setDoodleRoute(true)
      : setDoodleRoute(false);
  }, []);

  useEffect(() => {
    setMongoUser(false);
    fire.auth().onAuthStateChanged((user) => {
      if (isLoggedIn && user) {
        setFirebaseID(user.uid);
      }
      return (
        user ? setIsLoggedIn(true) : setIsLoggedIn(false), setFirebaseID(false)
      );
    });
  }, [isLoggedIn]);

  const clickAway = () => {
    setDoodleRoute(false);
  };

  useEffect(() => {
    let unsubscribe;

    if (isLoggedIn && !mongoUser) {
      unsubscribe = API.getUser(firebaseID)
        .then(() => {
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

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url(https://cdn.pixabay.com/photo/2019/04/08/13/52/paper-4112063_960_720.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <AuthProvider>
        <div id="App">
          <Router>
            {!mongoUser && !isLoggedIn && !error ? (
              <>
                <Switch>
                  <Route exact path="/">
                    <SignIn />
                  </Route>
                </Switch>
              </>
            ) : (
              <div>
                {!doodleRoute && <HeadingNav />}
                <Container className={doodleRoute === true ? "no-spacing" : ""}>
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
                    <Route exact path="/books/:bookId/new-entry/:newEntryId">
                      <Journaling type="new" />
                    </Route>
                    <Route exact path="/books/:bookId/journal/:journalId">
                      <Journaling type="old" />
                    </Route>
                    <Route exact path="/books/:bookId/newDoodle">
                      <DoodlePage clickAway={clickAway} />
                    </Route>
                    <Route exact path="/books/:bookId/doodlesIndex">
                      <DoodleIndex />
                    </Route>
                    <Route>
                      <NoMatch />
                    </Route>
                  </Switch>
                </Container>

                {!doodleRoute && <Footer />}
              </div>
            )}
          </Router>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;

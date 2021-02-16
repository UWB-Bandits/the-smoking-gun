/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import HeadingNav from "./components/HeadingNav/HeadingNav";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import IndexPage from "./pages/IndexPage";
import Lists from "./pages/Lists";
import CreateBook from "./pages/CreateBook";
import Footer from "./components/Footer";
import NoMatch from "./pages/NoMatch";
import fire from "./utils/firebase";
import API from "./utils/API";
import { AuthProvider } from "./contexts/AuthContext";
import Settings from "./pages/Settings";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mongoUser, setMongoUser] = useState(false);
  const [firebaseID, setFirebaseID] = useState();

  useEffect(() => {
    setMongoUser(false);
    fire.auth().onAuthStateChanged((user) => {
      if (isLoggedIn && user) {
        setFirebaseID(user.uid);
        // API.getUser(user.uid)
        //   .then((Muser) => {
        //     console.log(Muser.data._id);
        //     setMongoUser(true);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     setMongoUser(false);
        //     setIsLoggedIn(false);
        //   });
      }
      return user
        ? setIsLoggedIn(true)
        : (setIsLoggedIn(false), setFirebaseID(false));
    });
  }, [isLoggedIn]);

  useEffect(() => {
    let unsubscribe;
    if (isLoggedIn) {
      unsubscribe = API.getUser(firebaseID)
        .then((Muser) => {
          console.log(Muser.data._id);
          setMongoUser(true);
        })
        .catch((err) => {
          console.log(err);
          setMongoUser(false);
          // setFirebaseID(false);
        });
    }
    return unsubscribe;
  }, [firebaseID]);

  console.log(mongoUser);

  return (
    <AuthProvider>
      <div id="App">
        <Router>
          {!mongoUser ? (
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
              <Switch>
                <Route exact path={["/", "/dashboard"]}>
                  <Dashboard />
                </Route>
                <Route exact path="/books/:id">
                  <IndexPage />
                </Route>

                <Route exact path="/lists/:id">
                  <Lists />
                </Route>
                <Route exact path="/create-book">
                  <CreateBook />
                </Route>
                <Route exact path="/settings">
                  <Settings />
                </Route>
                <Route>
                  <NoMatch />
                </Route>
              </Switch>
              <Footer />
            </div>
          )}
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;

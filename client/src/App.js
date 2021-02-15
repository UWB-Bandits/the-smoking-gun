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
// import API from "./utils/API";

import { AuthProvider } from "./contexts/AuthContext";
import Settings from "./pages/Settings";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (isLoggedIn) {
        API.getUser(user.uid).then(() => {
          setUser(true);
          console.log(user);
        });
      } else {
        setUser(false);
      }
      return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    });
  }, [isLoggedIn]);

  console.log("logged in?", isLoggedIn);
  return (
    <AuthProvider>
      <div id="App">
        <Router>
          {!isLoggedIn && !user ? (
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

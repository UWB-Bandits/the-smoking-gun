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
import Habits from "./pages/Habits";
import NoMatch from "./pages/NoMatch";
import fire from "./utils/firebase";
import API from "./utils/API";
import { AuthProvider } from "./contexts/AuthContext";
import Container from "@material-ui/core/Container";
// import { useAuth } from "./contexts/AuthContext";

// Routes:
// / → signin                           ------------- done
// /sign-up → sign up page          -- same as sign in
// /:userid → dashboard                  --------------- done
// /:bookid → Index                      ----------- done
// /create-book → Create Book page           ----------- done
// /create-list → Create List page
// /caledar/:date → Daily calendar page

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    });
  }, [isLoggedIn]);

  console.log("logged in?", isLoggedIn);
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          {!isLoggedIn ? (
            <>
              <Switch>
                <Route path="/">
                  <SignIn />
                </Route>
              </Switch>
            </>
          ) : (
            <div>
              <HeadingNav />
              <Container maxWidth="md">
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
                <Route exact path="/habits/:id">
                  <Habits />
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

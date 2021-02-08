import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import HeadingNav from "./components/HeadingNav/HeadingNav";
import SignIn from "./pages/SignIn/SignIn";
import Dashboard from "./pages/Dashboard";
import IndexPage from "./pages/IndexPage";
import Lists from "./pages/Lists";

// Routes:
// / → signin                           ------------- done
// /sign-up → sign up page          -- same as sign in
// /:userid → dashboard                  --------------- done
// /:bookid → Index                      ----------- done
// /create-book → Create Book page
// /create-list → Create List page
// /caledar/:date → Daily calendar page

// import Books from "./pages/Books";
// import Detail from "./pages/Detail";
// import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <HeadingNav />
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route exact path="/books/:bookid">
            <IndexPage />
          </Route>
          <Route exact path="/lists/:listid">
            <Lists />
          </Route>
          <Route exact path="/create-book">
            {/* <NewBook /> */}
          </Route>
          <Route exact path="/dashboard/:userid">
            <Dashboard />
          </Route>
          <Route>{/* <NoMatch /> */}</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

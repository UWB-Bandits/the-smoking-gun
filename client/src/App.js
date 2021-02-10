import React, { useState } from "react";
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

  fire.auth().onAuthStateChanged((user) => {
    // console.log(user);

    // console.log(data);
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });


  const testDbConnection = () => {
    API.getBooks()
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  testDbConnection();
  console.log("logged in?", isLoggedIn);
  return (
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

              <Route exact path="/dashboard/:id">
                <Dashboard />
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
  );
}

export default App;

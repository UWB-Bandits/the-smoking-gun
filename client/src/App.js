import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import "./App.css";
import Dashboard from "./pages/Dashboard";

class App extends Component {
  render () {
    return (
      <Container>
        <Dashboard />
      </Container>
    );
  }
}

export default App;

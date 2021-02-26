//import react
import React from "react";
//import context
import { useAuth } from "../../contexts/AuthContext";
//import Material-UI component
import Button from "@material-ui/core/Button";
//import useHistory function from react-router-dom
import { useHistory } from "react-router-dom";
//initialize the SignOut component
const SignOut = () => {
  //this uses firebase useAuth logout method
  const { logout } = useAuth();
  //initialize a variable to store the user route history
  let history = useHistory();
  //this function logs the user out and returns them to the root page
  const signOut = () => {
    logout();
    history.push("/");
  };
  //this returns a message and a button that signs out the user from the application
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "3rem" }}>
      <div>
        <p style={{ display: "inline-block", margin: "1rem" }}>
          Please Confirm you would like to sign out
        </p>
        {/* Material-UI component that allows users to take actions, and make choices, with a single tap. */}
        <Button
          variant="outlined"
          onClick={signOut}
          style={{ display: "inline-block" }}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};
//export SignOut component
export default SignOut;
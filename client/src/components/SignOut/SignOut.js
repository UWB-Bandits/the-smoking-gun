import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const SignOut = () => {
  const { logout } = useAuth();
  let history = useHistory();

  const signOut = () => {
    logout();
    history.push("/");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "3rem" }}>
      <div>
        <p style={{ display: "inline-block", margin: "1rem" }}>
          Please Confirm you would like to sign out
        </p>

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
export default SignOut;

//import react, useState, and useEffect methods
import React, { useState, useEffect } from "react";
//import logo
import logo from "../../utils/images/logo.png";
//import context
import { useAuth } from "../../contexts/AuthContext";
//import Material-Ui components
import Avatar from "@material-ui/core/Avatar";
//import API routes
import API from "../../utils/API";
//import Link from react-router-dom
import { Link } from "react-router-dom";
//initialize HeadingNav component
function HeadingNav() {
  //get context
  const { currentUser } = useAuth();
  //initialize state hooks
  const [avatar, setAvatar] = useState("");
  //this lets you perform side effects in function component
  useEffect(() => {
    let unsubscribe;
    if (currentUser) {
      unsubscribe = API.getUser(currentUser.uid).then((res) => {
        setAvatar(res.data.profilePic);
      });
    }
    return unsubscribe;
  }, []);
  //this returns a navbar with a logo that returns a user to the dashboard, and a picture of the users avatar that takes them to an account page
  return (
    <nav
      id="headingNav"
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
        backgroundColor: "#cacacc",
        padding: "5px"
      }}
    >
      <Link to="/dashboard">
        <img
          style={{ display: "inline-block", height: "70px", marginLeft:"20px"}}
          src={logo}
          alt="Smoking Gun Logo"
        />
      </Link>
      <Link to="/settings" style={{ textDecoration: "none", marginRight:"20px", marginTop:"10px" }}>
        {/* Material-Ui component that is used to wrap avatars */}
        <Avatar
          style={{ width: "60px", height: "60px" }}
          alt="Avatar"
          src={avatar}
        />
      </Link>
    </nav>
  );
}
//export HeadingNav component
export default HeadingNav;

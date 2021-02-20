import React, { useState } from "react";
import logo from "../../utils/images/logo.png";
// import Image from "react-image-resizer";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "@material-ui/core/Avatar";
import API from "../../utils/API";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

function HeadingNav() {
  const { currentUser } = useAuth();
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (currentUser) {
      unsubscribe = API.getUser(currentUser.uid).then((res) => {
        setAvatar(res.data.profilePic);
      });
    }
    return unsubscribe;
  }, []);

  return (
    <nav
      id="headingNav"
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "10px",
      }}
    >
      <Link to="/dashboard">
        <img
          style={{ display: "inline-block", height: "70px" }}
          src={logo}
          alt="Smoking Gun Logo"
        />
      </Link>
      <Link to="/settings" style={{ textDecoration: "none" }}>
        <Avatar
          style={{ width: "60px", height: "60px" }}
          alt="Avatar"
          src={avatar}
        />
      </Link>
    </nav>
  );
}

export default HeadingNav;

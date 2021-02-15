import React, { useState } from "react";
import logo from "../../utils/images/logo.png";
import Image from "react-image-resizer";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "@material-ui/core/Avatar";
import API from "../../utils/API";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function HeadingNav({ loggedIn }) {
  const { currentUser } = useAuth();
  const [avatar, setAvatar] = useState("");
  // console.log(currentUser.email);

  // let email = currentUser ? currentUser.email : "";

  useEffect(() => {
    if (loggedIn) {
      getAvatar();
    }
  }, [loggedIn]);

  const getAvatar = () => {
    API.getUser(currentUser.uid).then((res) => {
      console.log(res);
      if (res.data.profilePic) {
        setAvatar(res.data.profilePic);
      }
    });
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "10px",
      }}
    >
      <Link to="/dashboard">
        <Image
          style={{ display: "inline-block" }}
          src={logo}
          alt="Smoking Gun Logo"
          height={70}
        />
      </Link>
      <Link to="/settings" style={{ textDecoration: "none" }}>
        <Avatar
          style={{ width: "60px", height: "60px" }}
          alt="Avatar"
          src={loggedIn ? avatar : ""}
        />
      </Link>
    </nav>
  );
}
HeadingNav.propTypes = {
  loggedIn: PropTypes.bool,
};

export default HeadingNav;

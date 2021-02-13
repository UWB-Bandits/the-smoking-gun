import React from "react";
import logo from "../../utils/images/logo.png";
import Image from "react-image-resizer";

function Nav() {
  return (
    <nav>
      <Image style={{display:"inline-block"}} src={logo} alt="Smoking Gun Logo" height={100}/>
    </nav>
  );
}

export default Nav;

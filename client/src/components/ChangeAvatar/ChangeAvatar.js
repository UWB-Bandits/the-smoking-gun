//import react
import React, {useState, useEffect} from "react";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import Material-Ui components
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Fab from "@material-ui/core/Fab";
//import API route handler
import API from "../../utils/API";
//require in gravatar
const useGravatar = require("gravatar");
//initialize the ChangeAvatar component
const ChangeAvatar = (props) => {
  //sets the state variable hooks
  const [formData, setFormData] = useState({
    profilePic: props.user.profilePic
  });
  const [gravatar, setGravatar] = useState({
    standard:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    retro:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    robohash:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    wavatar:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    monsterid:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    identicon:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  });
  //this lets you perform side effects in function component
  useEffect(() => {
    //this gets the Gravatar images
    getGravatar();
  }, []);
  //this handles changes to the form and sets the formData state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //this updates the user profilePic
  const updateAvatar = () => {
    API.updateUser(props.user._id, {
      ...props.user,
      profilePic: formData.profilePic
      }).then( res => {
        res;
        window.location.reload(true);
    })
      .catch(err => console.log(err));
  };
  //this uses the gravatar dependency to get the different image URLs the user can set based off their email
  const getGravatar = () => {
    let standard = useGravatar.url(props.user.email, { s: "100" }, true);
    let retro = useGravatar.url(
      props.user.email,
      { s: "100", r: "pg", d: "retro" },
      true
    );
    let robohash = useGravatar.url(
      props.user.email,
      { s: "100", r: "pg", d: "robohash" },
      true
    );
    let wavatar = useGravatar.url(
      props.user.email,
      { s: "100", r: "pg", d: "wavatar" },
      true
    );
    let monsterid = useGravatar.url(
      props.user.email,
      { s: "100", r: "pg", d: "monsterid" },
      true
    );
    let identicon = useGravatar.url(
      props.user.email,
      { s: "100", r: "pg", d: "identicon" },
      true
    );
    //this sets the Gravatar state variable with the associated image URLs
    setGravatar({
      standard: standard,
      retro: retro,
      robohash: robohash,
      wavatar: wavatar,
      monsterid: monsterid,
      identicon: identicon,
    });
  };
  //this returns the change avatar information
  return (
    <div style={{ textAlign: "center" }}>
      <h2>
        This application uses Gravatar. 
      </h2>
      <p>By selecting the default icon you are able to upload your own avatar.</p>
      <form>
        {/* ________________________ profile pic_____________________________________________ */}
        <div style={{ margin: "10px 0px" }}>
          {/*Material-Ui component that provides context such as filled/focused/error/required for form inputs.  */}
          <FormControl component="fieldset">
            {/*Material-Ui component that provides a label for fields inside a form.*/}
            <FormLabel style={{ margin: "10px 0px" }} component="legend">
              Choose Your Avatar.
            </FormLabel>
            {/*Material-Ui component that is a helpful wrapper used to group Radio components that provides an easier API, and proper keyboard accessibility to the group. */}
            <RadioGroup
              row
              defaultValue="image one"
              aria-label="profile-pic"
              name="profilePic"
              onChange={handleInputChange}
            >
              {/*Material-Ui component that displays an extra label. */}
              <FormControlLabel
                labelPlacement="top"
                value={gravatar.standard}
                control={<Radio />}// Material-Ui component that uses Radio buttons to allow the user to select one option from a set.
                label={<img src={gravatar.standard} alt="Default" />}
              />
              <FormControlLabel
                labelPlacement="top"
                value={gravatar.retro}
                control={<Radio />}
                label={<img src={gravatar.retro} alt="Retro" />}
              />
              <FormControlLabel
                labelPlacement="top"
                value={gravatar.robohash}
                control={<Radio />}
                label={<img src={gravatar.robohash} alt="Robohash" />}
              />
              <FormControlLabel
                labelPlacement="top"
                value={gravatar.wavatar}
                control={<Radio />}
                label={<img src={gravatar.wavatar} alt="Wavatar" />}
              />
              <FormControlLabel
                labelPlacement="top"
                value={gravatar.monsterid}
                control={<Radio />}
                label={<img src={gravatar.monsterid} alt="Monsterid" />}
              />
              <FormControlLabel
                labelPlacement="top"
                value={gravatar.identicon}
                control={<Radio />}
                label={<img src={gravatar.identicon} alt="Identicon" />}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </form>
      <Fab
        variant="extended"
        style={{ 
          margin: "1rem .5rem", 
          color: "white",
          backgroundColor: "#474747",
          width:"150px" 
        }}
          onClick={updateAvatar} 
      >
        Update Avatar
      </Fab>
      <h2>What is Gravatar?</h2> 
      <p>
        A Gravatar is a Globally Recognized Avatar. 
        <br></br>
        You upload an image and create your public profile just once, 
        <br></br>
        and then when you participate in any Gravatar-enabled site, 
        <br></br>
        your Gravatar image and public profile will automatically follow you there.
        <br></br>
        <a href="https://en.gravatar.com/">Learn More</a>
      </p>
      <h2>How to change your gravatar.</h2>
      <p>
        In order to change your avatar or upload your own person avatar please
        visit this <a href="https://en.gravatar.com/support/how-to-sign-up/">Link</a>.
        <br></br>  
      </p>
    </div>
  );
};
//sets up prop types for the ChangeAvatar component
ChangeAvatar.propTypes = {
  user: PropTypes.object
};
//export ChangeAvatar component
export default ChangeAvatar;

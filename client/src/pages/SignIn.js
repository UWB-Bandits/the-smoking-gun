//import react and react hooks
import React, { useState } from "react";
//import components
import LoginForm from "../components/LogInForm/LogInForm.js";
import LoginFooter from "../components/LoginFooter";
import BanditPhotos from "../components/BanditPhotos";
import SignUpForm from "../components/SignUpForm/SignUpForm.js";
import Screenshot from "../components/Screenshot";
//import context
import { useAuth } from "../contexts/AuthContext";
//import route
import API from "../utils/API";
//import images
import Logo from "../utils/images/logo.png";
import Screenshots from "../utils/images/screenshots/screenshots";
import Bandits from "../utils/images/bandits/bandits";

//import Material UI components
import {
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core/";
//import Material UI icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//import Material UI hook
import { makeStyles } from "@material-ui/core/styles";
//initialize SignIn page
const SignIn = () => {
  //set state hooks
  const [formDisplay, setFormDisplay] = useState("Log In");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    avatar: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //Use On Blur
  const checkEmail = (e) => {
    // Regex for valid email
    const verifyEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const check = e.target.value.match(verifyEmail) ? true : false;
    check === true
      ? setError("")
      : setError("invalid email example: name@email.com");
  };

  const checkPassword = (e, password) => {
    // only check to make sure new passwords match to avoid old users having errors.
    if (formDisplay === "Sign Up") {
      // Regex for password is 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
      const verifyPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (e) {
        const check = e.target.value.match(verifyPassword) ? true : false;
        check === true
          ? setError("")
          : setError(
              "Password needs to be 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter."
            );
      }
      if (password) {
        let passwordCorrect = password.match(verifyPassword) ? true : false;
        if (!passwordCorrect) {
          setError(
            "Password needs to be 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter."
          );
        }
        return passwordCorrect;
      }
    }
  };
  //confirms that passwords match on signup
  const passwordsMatch = (name, value) => {
    if (name === "confirmPassword") {
      const password = formData.password;
      const check = password === value ? true : false;
      check === true ? setError("") : setError("Passwords don't match");
      return check;
    }
  };
  //grab the signup/login info from context
  const { signUp, logIn } = useAuth();
  //updates state as user updates form
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name !== "firstName" && name !== "lastName") {
      setError("");
    }
    setFormData({ ...formData, [name]: value });
    passwordsMatch(name, value);
  };
  //evaluates wheter to show login or signup pages
  const setPage = (e) => {
    e.preventDefault();
    setError("");
    const value =
      e.target.value === undefined ? e.target.parentNode.value : e.target.value;
    setFormDisplay(value);
    setFormData({});
  };
  //on submit, logs in or signs up user (dependent on form being used)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formDisplay === "Log In" && !error) {
      try {
        //tries to login
        await logIn(formData.email.trim(), formData.password);
      } catch {
        //presents error if cannot login
        setError("Incorrect email or password");
      }
    } else if (formDisplay === "Sign Up" && !error) {
      if (!formData.email && !formData.password && !formData.avatar) {
        setError("Please complete sign up form.");
      } else if (
        //confirms password rules
        passwordsMatch("confirmPassword", formData.confirmPassword) &&
        checkPassword(null, formData.password)
      ) {
        //signs up user and stores info in database and firebase
        signUp(formData.email, formData.password)
          .then((res) => {
            setLoading(true);
            setError("");
            API.createUser({
              ...formData,
              firebase_uid: res.user.uid,
            }).then((res) => {
              res;
              setLoading(false);
            });
          })
          .catch((err) => {
            console.log(err.message);
            setError(err.message);
            setLoading(false);
          });
      }
    }
  };
  //initialize the classes variable with our makeStyles hook
  const classes = makeStyles((theme) => ({
    accordion: {
      width: "70%",
      marginLeft: "10px",
      marginRight: "10px",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  //this returns the landing page where a user can login, sign up, or learn about the app
  return (
    <Grid container style={{ minHeight: "80vh" }}>
      {/* The Material Design responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts. */}
      <Grid item xs={12}>
        <img
          style={{
            width: "100%",
            maxWidth: "300px",
            display: "block",
            marginTop: "10px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          src={Logo}
          alt="The Smoking Gun logo"
        ></img>
      </Grid>

      <Grid item xs={12} md={6}>
        {/* Material-UI Box component serves as a wrapper component for most of the CSS utility needs. */}
        <Box
          boxShadow={2}
          p={2}
          style={{
            width: "80%",
            margin: "20px auto",
            borderRadius: "5px",
            fontSize: "20px",
            fontFamily: "'La Belle Aurore', cursive",
            verticalAlign: "center",
          }}
          bgcolor="background.paper"
        >
          <p>Welcome!</p>
          <p>
            The Smoking Gun is your own digital bullet journal. Stay organized
            by keeping everything you need in one place. Keep as many journals
            as you need, each with the option to store lists, track habits, keep
            a calendar, write journal entries, or save digital drawings.
          </p>
          <p>--- The Bandits</p>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        className="formContainer"
        style={{ marginTop: "10px" }}
      >
        {formDisplay === "Log In" ? (
          //Evaluates if needed to show login or sign up forms
          <div>
            {/* custom form element allowing the user to log in */}
            <LoginForm
              handleInputChange={handleInputChange}
              setPage={setPage}
              handleSubmit={handleSubmit}
              formData={formData}
              loading={loading}
              error={error}
            />
          </div>
        ) : (
          /* custom form element allowing the user to sign up */
          <SignUpForm
            handleInputChange={handleInputChange}
            setPage={setPage}
            handleSubmit={handleSubmit}
            formData={formData}
            loading={loading}
            error={error}
            checkEmail={checkEmail}
            checkPassword={checkPassword}
          />
        )}
      </Grid>
      <h1 style={{ marginLeft: "auto", marginRight: "auto" }}>
        Who are The Bandits?
      </h1>
      <Grid style={{ margin: "20px" }} spacing={2} container>
        {Bandits.map((entry) => (
          //maps over the bandits and all of their info to display on the page
          <BanditPhotos
            key={entry.name}
            name={entry.name}
            image={entry.image}
            link={entry.link}
          />
        ))}
      </Grid>
      <Grid style={{ margin: "20px" }} spacing={2} container>
        {/* Material UI Accordion component contain creation flows and allow lightweight editing of an element. */}
        <Accordion>
          {/* Material UI AccordionSummary is a wrapper that act as a header/description of and Accordion component  */}
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>
              How does it work?
            </Typography>
          </AccordionSummary>
          {/* Material UI AccordionDetails is what is expanded when an Accordion component is clicked */}
          <AccordionDetails>
            <Grid style={{ margin: "20px" }} spacing={2} container>
              {Screenshots.map((entry) => (
                //maps over the screenshots/descriptions of each page of the application to display
                <Screenshot
                  key={entry.title}
                  title={entry.title}
                  description={entry.description}
                  image={entry.image}
                />
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/*This div pushes the footer element so it does not overlap other content*/}
      <div>. </div>
      {/* Custom footer element without navigation for the landing page */}
      <LoginFooter />
    </Grid>
  );
};

export default SignIn;

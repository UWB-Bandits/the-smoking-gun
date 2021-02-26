import React, { useState } from "react";
import LoginForm from "../components/LogInForm/LogInForm.js";
import SignUpForm from "../components/SignUpForm/SignUpForm.js";
import { useAuth } from "../contexts/AuthContext";
import API from "../utils/API";
import Logo from "../utils/images/logo.png";
import {Grid, Box, Accordion, AccordionSummary, AccordionDetails, Typography, } from "@material-ui/core/";
import LoginFooter from "../components/LoginFooter";
import Screenshot from "../components/Screenshot";
import Screenshots from "../utils/images/screenshots/screenshots";
import BanditPhotos from "../components/BanditPhotos";
import Bandits from "../utils/images/bandits/bandits";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

// import { useHistory } from "react-router-dom";
const SignIn = () => {
  const [formDisplay, setFormDisplay] = useState("Log In");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    avatar: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // let history = useHistory();

  const { signUp, logIn } = useAuth();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const setPage = (e) => {
    e.preventDefault();
    const value =
      e.target.value === undefined ? e.target.parentNode.value : e.target.value;
    setFormDisplay(value);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formDisplay === "Log In") {
      try {
        setError("");
        await logIn(formData.email.trim(), formData.password);
        // history.push("/dashboard");
      } catch {
        setError("Incorrect email or password");
      }
    } else if (formDisplay === "Sign Up") {
      if (formData.password === formData.confirmPassword) {
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
      } else {
        setError("passwords don't match");
      }
    }
  };

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



  return (
    <Grid container style={{minHeight:"80vh"}}>
      <Grid item xs={12}>
        <img style={{width: "100%", maxWidth:"300px", display:"block", marginTop:"10px", marginLeft:"auto", marginRight:"auto"}} src={Logo} alt="The Smoking Gun logo"></img>
      </Grid>


      <Grid item xs={12} md={6}> 
        <Box
        boxShadow={2}
        p={2}
        style={{
          width: "80%",
          margin: "20px auto",
          borderRadius: "5px",
          fontSize: "20px",
          fontFamily: "'La Belle Aurore', cursive",
          verticalAlign:"center"
        }}
        bgcolor="background.paper"
        >
          <p>Welcome!</p>
          <p>The Smoking Gun is your own digital bullet journal. Stay organized by keeping everything you need in one place. Keep as many journals as you need, each with the option to store lists, track habits, keep a calendar, write journal entries, or save digital drawings.</p>
          <p>--- The Bandits</p>

        </Box>


      </Grid>
      <Grid item xs={12} md={6} className="formContainer" style={{ marginTop: "10px" }}>
        {formDisplay === "Log In" ? (
          <div>

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
          <SignUpForm
            handleInputChange={handleInputChange}
            setPage={setPage}
            handleSubmit={handleSubmit}
            formData={formData}
            loading={loading}
            error={error}
          />
        )}
      </Grid>
      <h1 style={{marginLeft:"auto", marginRight:"auto"}}>Who are The Bandits?</h1>
      <Grid style={{margin:"20px"}} spacing={2} container>
        {Bandits.map(entry => <BanditPhotos key={entry.name} name={entry.name} image={entry.image} link={entry.link}/>)}
      </Grid>
      <Grid style={{margin:"20px"}} spacing={2} container>
        <Accordion >
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>How does it work?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid style={{margin:"20px"}} spacing={2} container>
              {Screenshots.map(entry => <Screenshot key={entry.title} title={entry.title} description={entry.description} image={entry.image} />)}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <div >. </div>
      <LoginFooter/>
    </Grid>
  );
};

export default SignIn;

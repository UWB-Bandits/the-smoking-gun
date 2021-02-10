import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "../components/LogInForm/LogInForm.js";
import SignUpForm from "../components/SignUpForm/SignUpForm.js";
import fire from "../utils/firebase";

const SignIn = () => {
  let history = useHistory();
  const [formDisplay, setFormDisplay] = useState("Log In");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const setPage = (e) => {
    e.preventDefault();
    const value =
      e.target.value === undefined ? e.target.parentNode.value : e.target.value;
    console.log(value);
    setFormDisplay(value);
    setFormData({});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`submitted email: 
          ${formData.email} password: ${formData.password}`);
    console.log(formDisplay);
    if (formDisplay === "Log In") {
      fire
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((user) => {
          console.log(user.user.uid);
        })
        .catch((error) => {
          console.error("Incorrect username or password", error);
        });
    } else if (formDisplay === "Sign Up") {
      e.preventDefault();
      console.log(`submitted email: 
          ${formData.email} password: ${formData.password} confirm: ${formData.confirmPassword}`);

      if (formData.password === formData.confirmPassword) {
        fire
          .auth()
          .createUserWithEmailAndPassword(formData.email, formData.password);
        // console.log("they Match");
      } else {
        console.log("passwords don't match");
      }
    }
    history.push("/dashboard");
  };

  return (
    <div>
      {/* <h1>Sign In page</h1> */}
      <div className="formContainer" style={{ marginTop: "40px" }}>
        {formDisplay === "Log In" ? (
          <LoginForm
            handleInputChange={handleInputChange}
            setPage={setPage}
            handleSubmit={handleSubmit}
            formData={formData}
          />
        ) : (
          <SignUpForm
            handleInputChange={handleInputChange}
            setPage={setPage}
            handleSubmit={handleSubmit}
            formData={formData}
          />
        )}
      </div>
    </div>
  );
};

export default SignIn;

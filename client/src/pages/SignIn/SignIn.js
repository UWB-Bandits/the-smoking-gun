import React, { useState } from "react";
import LoginForm from "../../components/LogInForm/LogInForm.js";
import SignUpForm from "../../components/SignUpForm/SignUpForm.js";

const SignIn = () => {
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
  console.log(formData);

  return (
    <div>
      {/* <h1>Sign In page</h1> */}
      <div className="formContainer" style={{ marginTop: "15vh" }}>
        {formDisplay === "Log In" ? (
          <LoginForm handleInputChange={handleInputChange} setPage={setPage} />
        ) : (
          <SignUpForm handleInputChange={handleInputChange} setPage={setPage} />
        )}
      </div>
    </div>
  );
};

export default SignIn;

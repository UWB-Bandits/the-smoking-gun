import React, { useState, useEffect } from "react";
import LoginForm from "../components/LogInForm/LogInForm.js";
import SignUpForm from "../components/SignUpForm/SignUpForm.js";
import { useAuth } from "../contexts/AuthContext";
import API from "../utils/API";

const SignIn = () => {
  const [formDisplay, setFormDisplay] = useState("Log In");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    avatar: "image one",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp, logIn } = useAuth();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setError("");
    setLoading(false);
  }, [formDisplay]);

  const setPage = (e) => {
    e.preventDefault();
    const value =
      e.target.value === undefined ? e.target.parentNode.value : e.target.value;
    console.log(value);
    setFormDisplay(value);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formDisplay === "Log In") {
      try {
        setError("");
        await logIn(formData.email.trim(), formData.password);
        setFormData({});
      } catch (e) {
        console.log(e);
        if (e) {
          setError("Incorrect username or password");
        }
      }
    } else if (formDisplay === "Sign Up") {
      if (formData.password === formData.confirmPassword) {
        try {
          setError("");
          setLoading(true);
          let user = await signUp(formData.email, formData.password);
          await API.createUser({
            ...formData,
            firebase_uid: user.user.uid,
          });
          setFormData({});
        } catch {
          setError("failed to create user");
        }
      } else {
        setError("passwords don't match");
      }
    }
  };

  return (
    <div>
      <div className="formContainer" style={{ marginTop: "40px" }}>
        {formDisplay === "Log In" ? (
          <LoginForm
            handleInputChange={handleInputChange}
            setPage={setPage}
            handleSubmit={handleSubmit}
            formData={formData}
            loading={loading}
            error={error}
          />
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
      </div>
    </div>
  );
};

export default SignIn;

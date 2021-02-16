import React, { useState } from "react";
import LoginForm from "../components/LogInForm/LogInForm.js";
import SignUpForm from "../components/SignUpForm/SignUpForm.js";
import { useAuth } from "../contexts/AuthContext";
import API from "../utils/API";

const SignIn = () => {
  const [formDisplay, setFormDisplay] = useState("Log In");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    avatar: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      } catch {
        setError("Incorrect email or password");
      }
    } else if (formDisplay === "Sign Up") {
      if (formData.password === formData.confirmPassword) {
        signUp(formData.email, formData.password)
          .then((res) => {
            setLoading(true);
            setError("");
            API.createUser({ ...formData, firebase_uid: res.user.uid });
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

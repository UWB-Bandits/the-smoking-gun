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

  // useEffect(() => {
  // setError("");
  // setLoading(false);
  // }, []);

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
        let response = await logIn(formData.email.trim(), formData.password);

        if (!response) {
          throw "New exception";
        }
      } catch {
        // console.log(e);
        console.log("-----------------------");
        console.log(error);
        setError("Incorrect username or password");
      }
    } else if (formDisplay === "Sign Up") {
      if (formData.password === formData.confirmPassword) {
        signUp(formData.email, formData.password).then((res) => {
          API.createUser({ ...formData, firebase_uid: res.user.uid }).catch(
            (err) => {
              console.log(err);
              setError("failed to create user");
              setLoading(false);
            }
          );
        });
        // try {
        //   setError("");
        //   setLoading(true);
        //   let user = await signUp(formData.email, formData.password);
        //   let createdUser = await API.createUser({
        //     ...formData,
        //     firebase_uid: user.user.uid,
        //   });
        //   console.log(createdUser);
        //   if (!createdUser.data) {
        //     throw "New exception";
        //   }
        // } catch (exception) {
        //   setError("failed to create user");
        //   setLoading(false);
        // }
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

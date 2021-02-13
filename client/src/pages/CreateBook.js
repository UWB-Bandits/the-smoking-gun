import React, { useState } from "react";
import CreateBookForm from "../components/CreateBookForm";
import API from "../utils/API";
import { useAuth } from "../contexts/AuthContext";

const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    colorScheme: "",
  });

  const { currentUser } = useAuth();

  const handleThemeChange = (event) => {
    setFormData({ ...formData, colorScheme: event.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log(formData);
    //SEND NEW BOOK TO DATABASE AND REDIRECT TO BOOK INDEX
    API.saveBook({...formData, user:currentUser.uid })
    .then( res => {
      console.log("Books has been saved");
      window.location.href = "/books/" + res.data._id;
    }
      
    ).catch(err => console.log(err));
  };

  return (
    <div>
      {/* <h1>Sign In page</h1> */}
      <div className="formContainer" style={{ marginTop: "40px" }}>
        <CreateBookForm handleInputChange={handleInputChange} handleThemeChange={handleThemeChange} handleSubmit={handleSubmit}/>
      </div>
    </div>
  );
};

export default CreateBook;

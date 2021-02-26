//import react and react hooks
import React, { useState } from "react";
//import components
import CreateBookForm from "../components/CreateBookForm";
//import API routes
import API from "../utils/API";
//import context
import { useAuth } from "../contexts/AuthContext";
//initialize CreateBook page
const CreateBook = () => {
  //set state hooks
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    colorScheme: "",
  });
  //this grabs the current user information 
  const { currentUser } = useAuth();
  //this sets formData colorScheme on the event target
  const handleThemeChange = (event) => {
    setFormData({ ...formData, colorScheme: event.target.value });
  };
  //this sets formData when inputs are being changed on the event target
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //this handles the create book button press
  const handleSubmit = () => {
    //SEND NEW BOOK TO DATABASE AND REDIRECT TO BOOK INDEX
    API.saveBook({...formData, user:currentUser.uid })
    .then( res => {
      window.location.href = "/books/" + res.data._id;
      }
    ).catch(err => console.log(err));
  };
  //this returns a form for the user to create a new book
  return (
    <div>
      <div className="formContainer" style={{ marginTop: "40px" }}>
        {/* custom component that returns a form for creating a book */}
        <CreateBookForm handleInputChange={handleInputChange} handleThemeChange={handleThemeChange} handleSubmit={handleSubmit}/>
      </div>
    </div>
  );
};
//exports CreateBook page
export default CreateBook;

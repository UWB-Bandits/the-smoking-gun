import firebase from "firebase/app";
import "firebase/auth";

import API from "./API";

//this creates an new user in database if firebase user doesn't exist
const createNewSingleSignOnUser = () => {
    console.log(firebase.auth().currentUser);
    let name = firebase.auth().currentUser.displayName;
    let nameArr = name.split(" ");
    let firstName = nameArr[0];
    let lastName = nameArr[1];
    let email = firebase.auth().currentUser.email;
    let profilePic = firebase.auth().currentUser.photoURL;
    let firebase_uid = firebase.auth().currentUser.uid;
    API.createUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      profilePic: profilePic,
      firebase_uid: firebase_uid
    }).then((res) => {
      console.log(res);
      console.log("User has been created");
      window.location.reload();
    }).catch((err) => {
        console.log(err.message);
    });
  };

export default createNewSingleSignOnUser;
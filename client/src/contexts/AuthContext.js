import React, { useContext, useState, useEffect } from "react";
import API from "../utils/API";
import fire from "../utils/firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [mongoID, setMongoId] = useState();

  const signUp = (email, password) => {
    return fire.auth().createUserWithEmailAndPassword(email, password);
  };
  const logIn = (email, password) => {
    return fire.auth().signInWithEmailAndPassword(email, password);
    // return currentUser && !loading ? true : false;
  };
  const getMongoID = (firebase_id) => {
    API.getUser(firebase_id).then((res) => {
      console.log("mongoUSer:: ", res);
      setMongoId(res.data._id);
    });
  };
  const logout = () => {
    fire.auth().signOut();
  };

  useEffect(() => {
    // currentUser ? getMongoID(currentUser.uid) : setMongoId("");
    const unsubscribe = fire.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      user ? getMongoID(user.uid) : setMongoId("");
      console.log("firebaseuser:: ", user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    let unsubscribe;
    if (currentUser && !loading) {
      unsubscribe = API.getUser(currentUser.uid).then((res) => {
        console.log("mongoUSer:: ", res);
        setMongoId(res.data._id);
      });
    }
    return unsubscribe;
  }, [currentUser]);

  const value = {
    currentUser,
    signUp,
    logIn,
    logout,
    mongoID,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

//default AuthContext

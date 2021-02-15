import React, { useContext, useState, useEffect } from "react";
import fire from "../utils/firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return fire.auth().createUserWithEmailAndPassword(email, password);
  };
  const logIn = (email, password) => {
    return fire.auth().signInWithEmailAndPassword(email, password);
    // return currentUser && !loading ? true : false;
  };
  const logout = () => {
    fire.auth().signOut();
  };

  useEffect(() => {
    const unsubscribe = fire.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    logIn,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

//default AuthContext

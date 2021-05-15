import React, { createContext, useState } from "react";
import { login, logout, anonymousLogin } from "../firebase/firebaseFunctions";
import { db } from "../firebase/firebaseFunctions";
export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [contacts, setContacts] = useState([]);
  function googleSignIn() {
    setIsAnonymous(false);
    console.log("Attempting google signin!");
    login();
  }

  function handleSignOut() {
    //delete anonymous profile information if anonymous
    //TODO: MAKE CLOUD FUNCTION THAT DELETES USER AS WELL IF ANONYMOUS
    if (isAnonymous) {
      db.collection("users")
        .doc(user.uid)
        .delete()
        .then(
          () => {
            console.log("Successfully deleted anonymous user profile!");
          },
          () => {
            console.log("Error deleting anonymous profile.");
          }
        );
    }
    setIsAnonymous(true);
    logout();
  }

  function doAnonymousLogin() {
    setIsAnonymous(true);
    anonymousLogin();
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAnonymous,
        setIsAnonymous,
        login: googleSignIn,
        logout: handleSignOut,
        anonymousLogin: doAnonymousLogin,
        contacts,
        setContacts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

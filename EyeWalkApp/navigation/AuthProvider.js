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
    console.log("Not anonymous!");
    login();
  }

  function handleSignOut() {
    //delete anonymous profile information if anonymous
    if (isAnonymous) {
      db.collection("users")
        .doc(user.uid)
        .delete()
        .then(() => {
          console.log("Successfully deleted anonymous user profile!");
        });
    }
    setIsAnonymous(true);
    logout();
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
        anonymousLogin: anonymousLogin,
        contacts,
        setContacts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

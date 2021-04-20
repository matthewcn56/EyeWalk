import React, { createContext, useState } from "react";
import { login, logout } from "../firebase/firebaseFunctions";
export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: login,
        logout: logout,
        contacts,
        setContacts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

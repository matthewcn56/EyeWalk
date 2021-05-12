import React, { createContext, useState, useContext } from "react";
export const LocationContext = createContext({});
import { AuthContext } from "./AuthProvider";

//TODO: Add in GeoListening Once Data is Added

export const LocationProvider = ({ children }) => {
  const [usersLocation, setUsersLocation] = useState({
    latLng: {
      latitude: 34.0689,
      longitude: -118.4452,
    },
  });
  return (
    <LocationContext.Provider
      value={{
        usersLocation,
        setUsersLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

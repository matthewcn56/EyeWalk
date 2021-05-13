import React, { createContext, useState, useContext } from "react";

export const LocationContext = createContext({});
//TODO: Add in GeoListening Once Data is Added

export const LocationProvider = ({ children }) => {
  const [usersLocation, setUsersLocation] = useState({
    //latitude for demo: 34.068
    //default: 34.0689
    latLng: {
      latitude: 34.068,
      longitude: -118.4452,
    },
  });
  const [hazardsList, setHazardsList] = useState([]);
  return (
    <LocationContext.Provider
      value={{
        usersLocation,
        setUsersLocation,
        hazardsList,
        setHazardsList,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

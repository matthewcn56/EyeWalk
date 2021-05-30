import React, { createContext, useState, useContext } from "react";

export const LocationContext = createContext({});
//TODO: Add in GeoListening Once Data is Added

// IN N OUT
// 34.0631° N, 118.4480° W

// APARTMENT
// 34.0617° N, 118.4413° W

export const LocationProvider = ({ children }) => {
  const [usersLocation, setUsersLocation] = useState({
    //latitude for demo: 34.068
    //default: 34.0689
    latLng: {
      // // ucla
      // latitude: 34.068,
      // longitude: -118.4452,

      //in n -out
      latitude: 34.0631,
      longitude: -118.448,

      //apartment
      // latitude: 34.0617,
      // longitude: -118.4413,
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

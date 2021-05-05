import React, { createContext, useState } from "react";
export const LocationContext = createContext({});

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

import React from "react";
import { Polyline, Marker } from "react-native-maps";

export function GetRoute(destination) {
  let path = null;
  const coordTable = {
    Home: [
      { latitude: 34.0631, longitude: -118.448 },
      { latitude: 34.0627, longitude: -118.4461 },
      { latitude: 34.0621, longitude: -118.4432 },
      { latitude: 34.0619, longitude: -118.442 },
      { latitude: 34.0617, longitude: -118.4413 },
    ],
  };

  ({ [destination]: path } = coordTable);
  return path ? (
    <Polyline coordinates={path} strokeColor="#000" strokeWidth={8} />
  ) : null;
}

export function GetDestination(destination) {
  let end = null;
  const endTable = {
    Home: { latitude: 34.0617, longitude: -118.4413 },
  };
  ({ [destination]: end } = endTable);
  return end ? (
    <Marker
      coordinate={end}
      title={"Destination: " + destination}
      pinColor="#0D5371"
    />
  ) : null;
}

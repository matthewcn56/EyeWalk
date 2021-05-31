import React from "react";
import { Polyline, Marker } from "react-native-maps";

export function GetRoute(destination) {
  let path = null;
  const coordTable = {
    Home: [
      { latitude: 34.0631, longitude: -118.448 },
      { latitude: 34.06323684571574, longitude: -118.44814074334144 },
      { latitude: 34.06326031073641, longitude: -118.44706525745036 },
      { latitude: 34.06256648490081, longitude: -118.4470618984479 },
      { latitude: 34.06254204275416, longitude: -118.44408196424176 },
      { latitude: 34.06165101065084, longitude: -118.44161701415446 },
      { latitude: 34.0617, longitude: -118.4413 },
    ],
  };

  ({ [destination]: path } = coordTable);
  return path ? (
    <Polyline coordinates={path} strokeColor="#0D5371" strokeWidth={4} />
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

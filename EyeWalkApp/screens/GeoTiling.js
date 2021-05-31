import { Polygon } from "react-native-maps";
import React, { useState, useContext } from "react";

const startingGeoPositions = [
  {
    latitude: 34.06,
    longitude: -118.45,
    fillColor: "rgba(255, 0, 0, 0.5)",
  },
  {
    latitude: 34.063,
    longitude: -118.45,
    fillColor: "rgba(0, 255, 0, 0.5)",
  },
  {
    latitude: 34.06,
    longitude: -118.447,
    fillColor: "rgba(0, 0, 255, 0.5)",
  },
  {
    latitude: 34.063,
    longitude: -118.447,
    fillColor: "rgba(100, 100, 100, 0.5)",
  },
];

const allGeoTiles = startingGeoPositions.map((tile, index) => {
  let geoTiling = [];
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 2; j++)
      geoTiling.push({
        latitude: tile.latitude + 0.003 * i,
        longitude: tile.longitude + 0.003 * j,
      });
  const tempTile = geoTiling[2];
  geoTiling[2] = geoTiling[3];
  geoTiling[3] = tempTile;
  return (
    <Polygon coordinates={geoTiling} fillColor={tile.fillColor} key={index} />
  );
});

// let secondTile = [];
// for (let i = 0; i < 2; i++)
//   for (let j = 0; j < 2; j++)
//     secondTile.push({
//       latitude: 34.05 + 0.003 * i,
//       longitude: -118.45 + 0.003 * j,
//     });
// const tempTile = secondTile[2];
// secondTile[2] = secondTile[3];
// secondTile[3] = tempTile;
// allGeoTiles.push(<Polygon coordinates={secondTile} fillColor={"#38a3f5"} />);

export default allGeoTiles;

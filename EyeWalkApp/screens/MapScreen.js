import React, { useState } from "react";
import styles from "../styles.js";
import MapView, { PROVIDER_GOOGLE, Marker, Heatmap } from "react-native-maps";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import {sheetLightData} from "../components/mapData";

export default function MapScreen() {
  const [displayLights, setDisplayLights] = useState(true);
  const [displayCrime, setDisplayCrime] = useState(true);

  //map from database
  const lights = lightData.map((marker, index) => (
    <Marker
      key={index}
      coordinate={marker.latLng}
      title={marker.title}
      description={marker.description}
    >
      <Entypo name="warning" size={40} color="#fada39" />
    </Marker>
  ));

  //map from database
  const crimes = crimeData.map((marker, index) => (
    <Marker
      key={index}
      coordinate={marker.latLng}
      title={marker.title}
      description={marker.description}
    >
      <MaterialCommunityIcons name="handcuffs" size={40} />
    </Marker>
  ));

  const usersLoc = (
    <Marker coordinate={userGeoData.latLng} title="Current Location" />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={regionConfig}
        >
          {usersLoc}
          {/* Conditionally render information */}
          {/* {displayLights && lights} */}
          {displayLights && (
            <Heatmap
              points={sheetLightData}
              radius={75}
              opacity={0.5}
              gradient={lightGradientConfig}
              onPress= {() =>console.log("pressed")}
            />
          )}
          {displayCrime && crimes}
        </MapView>
      </View>
      <View style={styles.spacedRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setDisplayLights((prevLights) => !prevLights)}
        >
          <Text>{displayLights ? `Hide` : `Show`} Lighting</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setDisplayCrime((prevCrime) => !prevCrime)}
        >
          <Text>{displayCrime ? `Hide` : `Show`} Crime</Text>
        </TouchableOpacity>
      </View>
      <Text>Our Map Screen</Text>
    </SafeAreaView>
  );
}

const regionConfig = {
  latitude: 34.0689,
  longitude: -118.4452,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

const lightData = [
  {
    latLng: {
      latitude: 34.067,
      longitude: -118.45,
    },
    title: "Unsafe Intersection",
    description: "Low Visibility!",
  },
  {
    latLng: {
      latitude: 34.067,
      longitude: -118.447,
    },
    title: "Unsafe Intersection",
    description: "No Light Fixings!",
  },
  {
    latLng: {
      latitude: 34.061,
      longitude: -118.45,
    },
    title: "Unsafe Intersection",
    description: "No Light Fixings!",
  },
  {
    latLng: {
      latitude: 34.073,
      longitude: -118.44,
    },
    title: "Unsafe Intersection",
    description: "No Light Fixings!",
  },
];


const crimeData = [
  {
    latLng: {
      latitude: 34.069,
      longitude: -118.45,
    },
    title: "Crime History",
    description: "Pauley Pavillion",
  },

  {
    latLng: {
      latitude: 34.067,
      longitude: -118.442,
    },
    title: "Crime History",
    description: "Anderson Street!",
  },
];

const lightGradientConfig = {
  colors: ["transparent", "yellow", "red"],
  startPoints: [0.0, 0.003, 0.6],
  colorMapSize: 256,
};

const userGeoData = {
  latLng: {
    latitude: 34.0689,
    longitude: -118.4452,
  },
};

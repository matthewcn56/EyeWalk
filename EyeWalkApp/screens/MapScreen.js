import React, { useState, useContext } from "react";
import styles from "../styles.js";
import MapView, { PROVIDER_GOOGLE, Marker, Heatmap } from "react-native-maps";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { sheetLightData } from "../components/mapData";
import { db } from "../firebase/firebaseFunctions";
import { LocationContext } from "../navigation/LocationContext";
import { AuthContext } from "../navigation/AuthProvider";
import firebase from "firebase";

export default function MapScreen(props) {
  const [displayLights, setDisplayLights] = useState(true);
  const [displayCrime, setDisplayCrime] = useState(true);
  const { usersLocation, hazardsList } = useContext(LocationContext);
  const { user } = useContext(AuthContext);

  //map from api call
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

  const displayedHazards = hazardsList.map((marker, index) => (
    <Marker
      key={index}
      coordinate={marker.latLng}
      title="Reported Hazard!"
      description={marker.count + " reports"}
    >
      <Entypo name="warning" size={40} color="#fada39" />
    </Marker>
  ));

  //map from API Data
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
    <Marker coordinate={usersLocation.latLng} title="Current Location" />
  );

  const AddReportConfirmation = () =>
    Alert.alert("Confirm Hazard Report", " Report a Hazard At This Location?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: attemptReport },
    ]);
  function attemptReport() {
    //TODO: Change to Aggregate!
    //check if user already attempted report
    let reportRef = db.collection("hazardReports").where("uid", "==", user.uid);
    reportRef.where("longitude", "==", usersLocation.latLng.longitude);
    //compound query of just where location is the same
    reportRef
      .where("latitude", "==", usersLocation.latLng.latitude)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //check to see if latitude and longitude is the same

          console.log("found duplicate location");
          //throw error if found duplicate
          throw new Error("Duplicate Report");
        });
      })
      .then(
        () => {
          //add new report if user hasn't attempted report yet
          db.collection("hazardReports")
            .add({
              uid: user.uid,
              longitude: usersLocation.latLng.longitude,
              latitude: usersLocation.latLng.latitude,
            })
            .then((docRef) => {
              console.log("Added Document with ID: " + docRef.id);
              alert("Successfully reported hazard at this location!");
            })
            .catch((error) => {
              alert("Error In Reporting, Try Again!");
            });

          //TODO: Make this a server-side thing, not client-side

          //TODO: Empty out Hazard Reviews Collection Every Day!

          //add new report to aggregate
          const usersRoundedLat = usersLocation.latLng.latitude.toFixed(3);
          const usersRoundedLng = usersLocation.latLng.longitude.toFixed(3);

          //check for equal to rounded lat and lng
          let hazardRef = db
            .collection("aggregatedHazards")
            .where("roundedLatitude", "==", usersRoundedLat);
          hazardRef.where("roundedLongitude", "==", usersRoundedLng);

          //check the query
          hazardRef
            .get()
            .then(
              //simply update tally if doc is found
              (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  console.log("incrementing report case here!");
                  const docRef = db.collection("aggregatedHazards").doc(doc.id);
                  docRef.update({
                    count: firebase.firestore.FieldValue.increment(1),
                  });
                  console.log("successfully added report case");
                  throw new Error("Tallied!");
                });
              }
            )
            .then(
              //make new document if no aggregate there yet
              () => {
                db.collection("aggregatedHazards")
                  .add({
                    roundedLatitude: usersRoundedLat,
                    roundedLongitude: usersRoundedLng,
                    count: 1,
                  })
                  .then((docRef) => {
                    console.log("Added new aggregate report!");
                  });
              },
              () => {
                console.log("Already tallied");
              }
            );
        },
        () => {
          //if user already attempted report, don't write to database
          alert("Already reported hazard at this location!");
        }
      );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.spacedRow}>
          <TouchableOpacity
            style={styles.reportButton}
            onPress={AddReportConfirmation}
          >
            <Text style={styles.reportButtonText}>Report Something!</Text>
            <Entypo name="warning" size={40} color="#fada39" />
          </TouchableOpacity>
        </View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={regionConfig}
        >
          {usersLoc}
          {displayedHazards}
          {/* Conditionally render information */}
          {/* {displayLights && lights} */}
          {displayLights && (
            <Heatmap
              points={sheetLightData}
              radius={75}
              opacity={0.5}
              gradient={lightGradientConfig}
              onPress={() => console.log("pressed")}
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
  startPoints: [0.0, 0.003, 0.2],
  colorMapSize: 256,
};

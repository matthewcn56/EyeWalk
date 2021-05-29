import React, { useState, useContext } from "react";
import styles from "../styles.js";
import MapView, { PROVIDER_GOOGLE, Marker, Heatmap } from "react-native-maps";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  Switch,
  Platform,
} from "react-native";
import { sheetLightData } from "../components/mapData";
import { crimeData } from "../components/mapData";
import { db } from "../firebase/firebaseFunctions";
import { LocationContext } from "../navigation/LocationContext";
import { AuthContext } from "../navigation/AuthProvider";
import DropDownPicker from "react-native-dropdown-picker";
import firebase from "firebase";

export default function MapScreen(props) {
  const [displayLights, setDisplayLights] = useState(true);
  const [displayCrime, setDisplayCrime] = useState(true);
  const { usersLocation, hazardsList } = useContext(LocationContext);
  const [displayHazards, setDisplayHazards] = useState(true);
  const { user } = useContext(AuthContext);
  const [displayConfig, setDisplayConfig] = useState(false);
  const [displayLegend, setDisplayLegend] = useState(false);
  const [destination, setDestination] = useState(null);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [destinationChoices, setDestinationChoices] = useState([
    {
      label: "Home",
      value: "Home",
      // {
      //   latitude: 34.0631,
      //   longitude: -118.448,
      // },
    },
    {
      label: "UCLA",
      value: "UCLA",
      // value: {
      //   latitude: 34.0631,
      //   longitude: -118.448,
      // },
    },
  ]);

  //switch constants
  const TRACK_FALSE_COLOR = "#767577";
  const TRACK_TRUE_COLOR = "#81b0ff";
  const THUMB_TRUE_COLOR = "#f5dd4b";
  const THUMB_FALSE_COLOR = "#f4f3f4";
  const BACKGROUND_SWITCH_COLOR = "#3e3e3e";

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
  const crimes = crimeData.slice(1, 100).map((entry, index) => (
    <Marker
      key={index}
      coordinate={{
        latitude: entry.latitude,
        longitude: entry.longitude,
      }}
      title={entry["Crm Cd Desc"].replace(/\s\s+/g, " ")}
      description={entry["LOCATION"].replace(/\s\s+/g, " ")}
    >
      <MaterialCommunityIcons name="handcuffs" size={40} />
    </Marker>
  ));

  const usersLoc = (
    <Marker coordinate={usersLocation.latLng} title="Current Location" />
  );

  const finalLoc = (
    <Marker coordinate={{ latitude: 34.0631, longitude: -118.448 }} />
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
      {/* Conditional Modal Config Window */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={displayConfig}
        onRequestClose={() => {
          Alert.alert("Closed Config Window.");
          setDisplayConfig((prevConfig) => !prevConfig);
        }}
      >
        <View style={[styles.modalWindow, styles.configWindow]}>
          <View style={styles.exitButton}>
            <TouchableOpacity
              onPress={() => setDisplayConfig((prevVal) => !prevVal)}
            >
              <Entypo
                name="cross"
                size={40}
                color="black"
                style={styles.exitButton}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.spacedRow}>
            <Text style={styles.configText}>Show Streetlights</Text>
            <Switch
              trackColor={{ false: TRACK_FALSE_COLOR, true: TRACK_TRUE_COLOR }} //default colors btw
              thumbColor={displayLights ? THUMB_TRUE_COLOR : THUMB_FALSE_COLOR}
              ios_backgroundColor={BACKGROUND_SWITCH_COLOR}
              onValueChange={() => setDisplayLights((prevVal) => !prevVal)}
              value={displayLights}
            />
          </View>
          <View style={styles.spacedRow}>
            <Text style={styles.configText}>Show Crime</Text>
            <Switch
              trackColor={{ false: TRACK_FALSE_COLOR, true: TRACK_TRUE_COLOR }} //default colors btw
              thumbColor={displayCrime ? THUMB_TRUE_COLOR : THUMB_FALSE_COLOR}
              ios_backgroundColor={BACKGROUND_SWITCH_COLOR}
              onValueChange={() => setDisplayCrime((prevVal) => !prevVal)}
              value={displayCrime}
            />
          </View>
          <View style={styles.spacedRow}>
            <Text style={styles.configText}>Show Hazards</Text>
            <Switch
              trackColor={{ false: TRACK_FALSE_COLOR, true: TRACK_TRUE_COLOR }} //default colors btw
              thumbColor={displayHazards ? THUMB_TRUE_COLOR : THUMB_FALSE_COLOR}
              ios_backgroundColor={BACKGROUND_SWITCH_COLOR}
              onValueChange={() => setDisplayHazards((prevVal) => !prevVal)}
              value={displayHazards}
            />
          </View>
        </View>
      </Modal>

      {/* Conditional Legend Modal Window */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={displayLegend}
        onRequestClose={() => {
          Alert.alert("Closed Config Window.");
          setDisplayLegend((prevVal) => !prevVal);
        }}
      >
        <View style={[styles.modalWindow, styles.mapLegendWindow]}>
          <View style={styles.exitButton}>
            <TouchableOpacity
              onPress={() => setDisplayLegend((prevVal) => !prevVal)}
            >
              <Entypo
                name="cross"
                size={40}
                color="black"
                style={styles.exitButton}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.spacedRow}>
            <Text style={styles.configText}>Streetlights</Text>
            <MaterialCommunityIcons name="circle" size={40} color="yellow" />
          </View>
          <View style={styles.spacedRow}>
            <Text style={styles.configText}>Crime Data</Text>
            <MaterialCommunityIcons name="handcuffs" size={40} />
          </View>
          <View style={styles.spacedRow}>
            <Text style={styles.configText}>Reported Hazards</Text>
            <Entypo name="warning" size={40} color="#fada39" />
          </View>
        </View>
      </Modal>

      <View>
        <View style={{ zIndex: 4 }}>
          <View style={styles.routingButton}>
            <DropDownPicker
              open={destinationOpen}
              value={destination}
              items={destinationChoices}
              setOpen={setDestinationOpen}
              setValue={setDestination}
              setItems={setDestinationChoices}
            />
          </View>
        </View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={regionConfig}
        >
          {usersLoc}
          {finalLoc}
          {/* Conditionally render information */}
          {displayHazards && displayedHazards}
          {/* {displayLights && lights} */}
          {displayLights && (
            <Heatmap
              points={sheetLightData}
              radius={Platform.OS === "android" ? 30 : 75}
              opacity={0.5}
              gradient={lightGradientConfig}
              onPress={() => console.log("pressed")}
            />
          )}
          {displayCrime && crimes}
        </MapView>
        <TouchableOpacity
          style={styles.configButton}
          onPress={() => setDisplayConfig((prevVal) => !prevVal)}
        >
          <FontAwesome name="gear" size={40} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mapLegendButton}
          onPress={() => setDisplayLegend((prevVal) => !prevVal)}
        >
          <FontAwesome name="question-circle" size={40} color="#0D5371" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reportButton}
          onPress={AddReportConfirmation}
        >
          <MaterialCommunityIcons
            name="alarm-light"
            size={40}
            color="#bd2222"
          />
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

// const crimeData = [
//   {
//     latLng: {
//       latitude: 34.069,
//       longitude: -118.45,
//     },
//     title: "Crime History",
//     description: "Pauley Pavillion",
//   },

//   {
//     latLng: {
//       latitude: 34.067,
//       longitude: -118.442,
//     },
//     title: "Crime History",
//     description: "Anderson Street!",
//   },
// ];

const lightGradientConfig =
  Platform.OS === "ios"
    ? {
        colors: ["transparent", "yellow", "red"],
        startPoints: [0.0, 0.003, 0.2],
        colorMapSize: 256,
      }
    : {
        colors: ["transparent", "yellow", "red"],
        startPoints: [0.0, 0.005, 0.2],
        colorMapSize: 256,
      };

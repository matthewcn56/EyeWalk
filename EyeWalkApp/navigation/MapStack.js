import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../screens/MapScreen";
import ReportScreen from "../screens/ReportScreen";
import { LocationProvider } from "./LocationContext";
import { LocationContext } from "./LocationContext";
import { db } from "../firebase/firebaseFunctions";
import AppLoading from "expo-app-loading";

export default function MapWrapper() {
  return (
    <LocationProvider>
      <MapStack />
    </LocationProvider>
  );
}

function MapStack(props) {
  const { setHazardsList } = useContext(LocationContext);

  //handle hazards list changes
  useEffect(() => {
    let unsubscribeFromHazardsChanges;
    unsubscribeFromHazardsChanges = db
      .collection("aggregatedHazards")
      .onSnapshot((querySnapshot) => {
        //if no query, set hazards to empty array
        if (querySnapshot.empty) {
          console.log("No aggregated hazards");
          setHazardsList([]);
        }

        //else map hazards to list
        else {
          console.log("Hazards exist!");
          let newHazards = [];
          querySnapshot.forEach((doc) => {
            let newHazard = {};
            newHazard["count"] = doc.data().count;
            newHazard["latLng"] = {
              latitude: Number(doc.data().roundedLatitude),
              longitude: Number(doc.data().roundedLongitude),
            };
            newHazards.push(newHazard);
          });
          setHazardsList(newHazards);
        }
      });

    //cleanup effects
    return () => {
      if (unsubscribeFromHazardsChanges) unsubscribeFromHazardsChanges();
    };
  }, []);

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Map">
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          header: () => null,
          title: "Map",
        }}
      />

      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{
          title: "Reporting",
        }}
      />
    </Stack.Navigator>
  );
}

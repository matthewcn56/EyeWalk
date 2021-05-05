import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../screens/MapScreen";
import ReportScreen from "../screens/ReportScreen";
import { LocationProvider } from "./LocationContext";

export default function ProfileStack() {
  const Stack = createStackNavigator();
  return (
    <LocationProvider>
      <Stack.Navigator initialRouteName="UserProfile">
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
    </LocationProvider>
  );
}

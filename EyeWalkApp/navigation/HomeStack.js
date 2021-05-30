import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MapStack from "./MapStack";
import ProfileStack from "./ProfileStack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import styles from "../styles";

export default function HomeStack() {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="Home" barStyle={styles.navbar}>
      <Tab.Screen
        name="Map"
        component={MapStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="map" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

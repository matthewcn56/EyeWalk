import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import styles from "./styles.js";
import NavigationStack from "./navigation/NavigationStack";
import Providers from "./navigation/index";
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

import {
  Oxygen_300Light,
  Oxygen_400Regular,
  Oxygen_700Bold,
} from "@expo-google-fonts/oxygen";

export default function App() {
  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    Oxygen_300Light,
    Oxygen_400Regular,
    Oxygen_700Bold,
  });
  if (!fontsLoaded) {
    return <ActivityIndicator />;
  } else return <Providers />;
}

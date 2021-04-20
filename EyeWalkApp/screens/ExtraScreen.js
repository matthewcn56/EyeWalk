import React from "react";
import styles from "../styles.js";
import { SafeAreaView, Text, View } from "react-native";

export default function ExtraScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>An Extra Screen</Text>
    </SafeAreaView>
  );
}

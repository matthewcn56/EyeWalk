import React from "react";
import styles from "../styles.js";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function UserProfileScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>User Profile Screen</Text>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("AddContact");
        }}
        style={styles.button}
      >
        <Text>Add An Emergency Contact</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

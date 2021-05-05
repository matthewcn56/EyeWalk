import React, { useContext } from "react";
import styles from "../styles";
import { SafeAreaView, Text } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import { LocationContext } from "../navigation/LocationContext";

export default function ReportScreen(props) {
  const { usersLocation } = useContext(LocationContext);
  const { user } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is our Report Screen</Text>
    </SafeAreaView>
  );
}

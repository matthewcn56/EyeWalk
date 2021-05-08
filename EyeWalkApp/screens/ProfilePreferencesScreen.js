import React, { useState } from "react";
import styles from "../styles";
import { SafeAreaView, Text } from "react-native";
import { db } from "../firebase/firebaseFunctions";
import DropDownPicker from "react-native-dropdown-picker";

export default function ProfilePreferencesScreen(props) {
  const [open, SetOpen] = useState(false);
  const [items, setItems] = useState(null);
  const [reportTypes, setReportTypes] = useState([{ label: "" }]);
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is our Profile Preferences Screen</Text>
    </SafeAreaView>
  );
}

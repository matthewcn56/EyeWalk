import React, { useContext } from "react";
import styles from "../styles.js";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";

export default function LoginScreen() {
  const { login, anonymousLogin } = useContext(AuthContext);

  const anonymousLoginConfirmation = () =>
    Alert.alert(
      "Confirm Anonymous Login",
      "Are You Sure You Want To Log in Anonymously?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: anonymousLogin },
      ]
    );
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => login()} style={styles.button}>
        <Text>Sign In or Register With Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={anonymousLoginConfirmation}
        style={styles.button}
      >
        <Text>Sign In Anonymously</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

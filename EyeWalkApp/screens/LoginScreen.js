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
  //Everything you need to edit is inside the bottom return statement for front-end work!
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.iconLogo}
        source={require("../assets/eyeWalkLogo.png")}
      />
      {/* Add in a style into your text here! Here's an example*/}
      {/* <Text style = {styles.yourStyle}></Text> */}
      <Text style={{ fontSize: 36, top: "-5%" }}>EyeWalk</Text>
      <TouchableOpacity
        onPress={() => login()}
        style={styles.googleLoginButton}
      >
        <Image
          style={styles.googleLogo}
          source={require("../assets/Google-login.png")}
        />
        <Text style={{ color: "#ffffff", fontSize: 18 }}>
          Sign In With Google
        </Text>
      </TouchableOpacity>

      {/* TouchableOpacity is our version of a button, you can change its style as well */}
      <TouchableOpacity
        onPress={anonymousLoginConfirmation}
        style={styles.anonLoginButton}
      >
        <Text style={{ color: "#ffffff", fontSize: 18 }}>
          Sign In Anonymously
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

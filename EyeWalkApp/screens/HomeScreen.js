import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import styles from "../styles.js";
import {
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from "react-native";
import ContactBar from "../components/ContactBar";

export default function HomeScreen() {
  const { user, logout, contacts, isAnonymous } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    setUserName(user.displayName);
    setProfilePic(user.profilePic);
  }, []); //ComponentDidMount

  const logoutConfirmation = () =>
    Alert.alert("Confirm Logout", "Are You Sure You Want To Log Out?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: logout },
    ]);

  const emailConfirmation = () =>
    isAnonymous
      ? alert("You cannot be an anonymous user and use this feature!")
      : Alert.alert(
          "Confirm Email Notification",
          "Are You Sure You Want To Send An Email?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "Yes", onPress: handleEmail },
          ]
        );

  function handleEmail() {
    for (let contact of contacts) {
      console.log("Will send email to " + contact.email);
    }
  }

  const smsConfirmation = () =>
    isAnonymous
      ? alert("You cannot be an anonymous user and use this feature!")
      : Alert.alert(
          "Confirm Email Notification",
          "Are You Sure You Want To Send An Email?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "Yes", onPress: handleSMS },
          ]
        );

  function handleSMS() {
    for (let contact of contacts) {
      console.log("Will send message to " + contact.phone);
    }
  }

  function attemptLogout() {}

  return (
    <SafeAreaView style={styles.container}>
      <Text style = {{color: '#0D5371', fontSize: 30, textAlign: 'center', top: '-5%'}}>Welcome{"\n"} {userName}</Text>
      <Image style={styles.profileImage} source={{ uri: profilePic }} />

      <TouchableOpacity onPress={emailConfirmation} style={styles.button}>
        <Text style = {{color: '#ffffff'}}>Send Email To Contacts</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={smsConfirmation} style={styles.button}>
        <Text style = {{color: '#ffffff'}}>Send SMS To Contacts</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logoutConfirmation} style={styles.button}>
        <Text style = {{color: '#ffffff'}}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

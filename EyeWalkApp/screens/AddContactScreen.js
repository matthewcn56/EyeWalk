import React, { useState } from "react";
import styles from "../styles.js";
import { Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { db } from "../firebase/firebaseFunctions";
import { AuthContext } from "../navigation/AuthProvider";
import { useContext } from "react/cjs/react.development";

export default function AddContactScreen() {
  const { user } = useContext(AuthContext);
  const [nameToAdd, setNameToAdd] = useState("");
  const [emailToAdd, setEmailToAdd] = useState("");
  const [phoneToAdd, setPhoneToAdd] = useState("");

  const AddContactConfirmation = () =>
    Alert.alert(
      "Confirm Contact Addition",
      "Are You Sure You Want To Add " + nameToAdd + " as a contact?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: attemptToAddContact },
      ]
    );
  function attemptToAddContact() {
    //add the contact to the user's contacts list
    db.collection("users")
      .doc(user.uid)
      .collection("contacts")
      .add({
        contactName: nameToAdd,
        email: emailToAdd,
        phone: phoneToAdd,
      })
      .then(() => {
        alert("Successfully added " + nameToAdd + " to your contacts!");
      })
      .catch((error) => {
        alert(
          "Something went wrong, could not add" +
            nameToAdd +
            "to your contacts."
        );
      });
  }
  return (
    <View style={styles.container}>
      <View style={styles.spacedRow}>
        <Text style={styles.inputPrompt}> Name Of Contact: </Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.input}
          onChangeText={(name) => setNameToAdd(name)}
          value={nameToAdd}
        />
      </View>

      <View style={styles.spacedRow}>
        <Text style={styles.inputPrompt}> Email: </Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.input}
          onChangeText={(email) => setEmailToAdd(email)}
          value={emailToAdd}
        />
      </View>

      <View style={styles.spacedRow}>
        <Text style={styles.inputPrompt}> Phone Number: </Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.input}
          onChangeText={(phone) => setPhoneToAdd(phone)}
          value={phoneToAdd}
        />
      </View>

      <TouchableOpacity onPress={AddContactConfirmation} style={styles.button}>
        <Text>Add Contact To Your List</Text>
      </TouchableOpacity>
    </View>
  );
}

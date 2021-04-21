import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styles from "../styles";
import { db } from "../firebase/firebaseFunctions";
import { AuthContext } from "../navigation/AuthProvider";
import Entypo from "react-native-vector-icons/Entypo";
export default function ContactBar(props) {
  const { user } = useContext(AuthContext);

  const RemoveContactConfirmation = () =>
    Alert.alert(
      "Confirm Contact Removal",
      "Are You Sure You Want To Remove " +
        props.contactName +
        " from your contacts?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: attemptToRemoveContact },
      ]
    );

  function attemptToRemoveContact() {
    console.log("id is" + props.id);
    db.collection("users")
      .doc(user.uid)
      .collection("contacts")
      .doc(props.id)
      .delete()
      .then(() => {
        alert(
          "Successfully removed " + props.contactName + " from your contacts!"
        );
      })
      .catch(() => {
        alert(
          "Something went wrong removing " +
            props.contactName +
            " from your contacts..."
        );
      });
  }
  return (
    <View style={styles.spacedRow}>
      <View>
        <View>
          <Text>{props.contactName}</Text>
        </View>
        {props.email && (
          <View>
            <Text>Email: {props.email}</Text>
          </View>
        )}

        {props.phone && (
          <View>
            <Text>Phone Number: {props.phone}</Text>
          </View>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={RemoveContactConfirmation}>
          <Entypo name="cross" size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

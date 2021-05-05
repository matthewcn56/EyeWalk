import React, { useState, useEffect, useContext } from "react";
import styles from "../styles.js";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import ContactBar from "../components/ContactBar";

export default function UserProfileScreen(props) {
  const { user, logout, contacts } = useContext(AuthContext);
  const [displayedContacts, setDisplayedContacts] = useState([]);
  //update displayed contacts when changes in contact list
  useEffect(() => {
    setDisplayedContacts(
      contacts.map((contact) => (
        <ContactBar
          key={contact.id}
          id={contact.id}
          contactName={contact.contactName}
          email={contact.email}
          phone={contact.phone}
        />

        //<Text key={contact.id}> {contact.contactName} </Text>
      ))
    );
  }, [contacts]);

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

      <Text>Contacts</Text>
      {displayedContacts}

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("ProfilePreferences");
        }}
        style={styles.button}
      >
        <Text>Set Profile Preferences</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

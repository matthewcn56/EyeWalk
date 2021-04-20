import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import styles from "../styles.js";
import { Text, View, Button, Image, SafeAreaView } from "react-native";

export default function HomeScreen() {
  const { user, logout, contacts } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [displayedContacts, setDisplayedContacts] = useState([]);

  useEffect(() => {
    setUserName(user.displayName);
    setProfilePic(user.photoURL);
  }, []); //ComponentDidMount

  //update dispalyed contacts when changes in contact list
  useEffect(() => {
    setDisplayedContacts(
      contacts.map((contact) => (
        <Text key={contact.id}> {contact.contactName} </Text>
      ))
    );
  }, [contacts]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome {userName}</Text>
      <Image style={styles.profileImage} source={{ uri: profilePic }} />
      {displayedContacts}
      <Button onPress={logout} title="Log Out" />
    </SafeAreaView>
  );
}

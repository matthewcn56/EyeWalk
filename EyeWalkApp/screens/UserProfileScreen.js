import React, { useState, useEffect, useContext } from "react";
import styles from "../styles.js";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import ContactBar from "../components/ContactBar";

export default function UserProfileScreen(props) {
  const { user, logout, contacts, isAnonymous } = useContext(AuthContext);
  const [displayedContacts, setDisplayedContacts] = useState([]);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    setUserName(user.displayName);
    setProfilePic(user.profilePic);
  }, []); //ComponentDidMount

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

  //attempt to navigate
  function attemptToNavigateAddContact() {
    if (!isAnonymous) {
      props.navigation.navigate("AddContact");
    } else alert("You must not be an anonymous user to add contacts!");
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* this text is not showing */}

      <View style={styles.rectangle}>
        <Image style={styles.profileScreenImage} source={{ uri: profilePic }} />
        <Text style={{ color: "#ffffff", top: "-44%", fontSize: 35, fontFamily: "Quicksand_500Medium"}}>
          Profile
        </Text>
        <Text style={{ color: "#0D5371", top: "45%", fontSize: 30, fontFamily: "Quicksand_500Medium"}}>
          {userName}
        </Text>
      </View>
      <View>
        <Text>Contacts</Text>
        {displayedContacts}
        <TouchableOpacity
          onPress={attemptToNavigateAddContact}
          style={styles.profileButton}
        >
          <Text style = {{color: 'white', fontSize: 16, fontFamily: "Quicksand_500Medium"}}>Add An Emergency Contact</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ProfilePreferences");
          }}
          style={styles.profileButton}
        >
          <Text style={{ color: "#ffffff", fontSize: 16, fontFamily: "Quicksand_500Medium"}}>Set Profile Preferences</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

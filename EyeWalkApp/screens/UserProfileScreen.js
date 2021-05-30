import React, { useState, useEffect, useContext } from "react";
import styles from "../styles.js";
import { SafeAreaView, Text, TouchableOpacity, View, Image} from "react-native";
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
    
      <View style = {styles.rectangle}>
        <Image style={styles.profileScreenImage} source={{ uri: profilePic }} />
        <Text style = {{color: '#ffffff', top: '-53%', fontSize: 35}}>Profile</Text>
        <Text style = {{color: '#0D5371', top: '-25%', fontSize: 30}}>{userName}</Text>
      </View>

      
      <Text style = {{top: '-20%'}}>User Profile Screen</Text>
      <TouchableOpacity
        onPress={attemptToNavigateAddContact}
        style={styles.button}
      >
        <Text style = {{color: '#ffffff'}}>Add An Emergency Contact</Text>
      </TouchableOpacity>

      <Text>Contacts</Text>
      {displayedContacts}

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("ProfilePreferences");
        }}
        style={styles.button}
      >
        <Text style = {{color: '#ffffff'}}>Set Profile Preferences</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

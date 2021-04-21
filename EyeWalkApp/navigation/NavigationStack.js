import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeStack from "./HomeStack";
import AuthStack from "./AuthStack";
import { db } from "../firebase/firebaseFunctions";
import { AuthContext } from "./AuthProvider";
import { ActivityIndicator } from "react-native";
import firebase from "firebase";

export default function NavigationStack() {
  const { user, setUser, setContacts } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(true);

  //handle user state changes
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(function (user) {
      setUser(user);
      if (initializing) setInitializing(false);
      setLoading(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  //hanldle user contact list changes when they're logged in
  useEffect(() => {
    let unsubscribeFromContactChanges;
    if (user) {
      unsubscribeFromContactChanges = db
        .collection("users")
        .doc(user.uid)
        .collection("contacts")
        .onSnapshot((querySnapshot) => {
          //if there are no contacts, make it an empty array
          if (querySnapshot.empty) {
            console.log("The user has no contacts!");
            setContacts([]);
          }

          //if the user has contacts
          else {
            let newContacts = [];
            querySnapshot.forEach((doc) => {
              // console.log(doc.data());
              // console.log(doc.id);
              let newContact = {};
              newContact["id"] = doc.id;
              newContact["contactName"] = doc.data().contactName;
              newContact["email"] = doc.data().email;
              newContact["phone"] = doc.data().phone;
              newContacts.push(newContact);
            });
            setContacts(newContacts);
          }
        });
    }

    //detach event listener as necessary
    return () => {
      if (unsubscribeFromContactChanges) unsubscribeFromContactChanges();
    };
  }, [user]);

  if (loading) {
    return <ActivityIndicator />;
  }

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

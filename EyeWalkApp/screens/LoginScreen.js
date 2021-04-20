import React, { useContext } from "react";
import styles from "../styles.js";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => login()} style={styles.button}>
        <Text>Sign In or Register With Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

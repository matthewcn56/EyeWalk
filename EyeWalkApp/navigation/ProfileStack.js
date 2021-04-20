import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddContactScreen from "../screens/AddContactScreen";
import UserProfileScreen from "../screens/UserProfileScreen";

export default function AuthStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="UserProfile">
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          header: () => null,
          title: "Your Profile",
        }}
      />

      <Stack.Screen
        name="AddContact"
        component={AddContactScreen}
        options={{
          title: "Add A Contact",
        }}
      />
    </Stack.Navigator>
  );
}

import React from "react";
import Auth from "./Screens/Auth";
import NewAccount from "./Screens/NewAccount";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import Discussion from "./Screens/Discussion";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="auth" component={Auth}></Stack.Screen>
        <Stack.Screen name="home" component={Home}></Stack.Screen>
        <Stack.Screen name="newaccount" component={NewAccount}></Stack.Screen>
        <Stack.Screen name="discusiion" component={Discussion}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

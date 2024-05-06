import { View, Text } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ListProfiles from "./HomeScreens/ListProfiles";
import Groups from "./HomeScreens/Groups";
import myProfils from "./HomeScreens/myProfils";
const tab = createMaterialBottomTabNavigator();

export default function Home(props) {
  const userid = props.route.params.userid;
  return (
    <tab.Navigator>
      <tab.Screen
        name="listprofils"
        component={ListProfiles}
        initialParams={{ userid: userid }}
      ></tab.Screen>
      <tab.Screen name="Groups" component={Groups}></tab.Screen>
      <tab.Screen name="myProfile" component={myProfils}  initialParams={{ userid: userid }}></tab.Screen>
    </tab.Navigator>
  );
}

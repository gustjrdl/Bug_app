import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ImageResult from "../screens/imageResult";
import { Ionicons } from "@expo/vector-icons";
import Settings from "../screens/settings";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
  <Tab.Navigator initialRouteName="Login"screenOptions={{
    tabBarActiveTintColor:'red'
  }} >
    <Tab.Screen name="ImageResult" component={ImageResult} options={{
      tabBarIcon: ({ color, size}:any)=>(
        <Ionicons name="camera" color={color} size={size}/>
      )
    }}/>
    <Tab.Screen name="Settings" component={Settings} options={{
      tabBarIcon: ({ color, size}:any)=>(
        <Ionicons name="settings" color={color} size={size}/>
      )
    }}/>
  </Tab.Navigator>
  )
}

export default Tabs;
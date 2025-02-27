import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./tabs";
import Stack from "./stack";

const Nav = createNativeStackNavigator();

const Root = () => {
    return <Nav.Navigator screenOptions={{
        headerShown:false,
        animation:"slide_from_right"
    }} 
        initialRouteName="Stack">
        <Nav.Screen name="Tabs" component={Tabs}></Nav.Screen>
        <Nav.Screen name="Stack" component={Stack}></Nav.Screen>        
    </Nav.Navigator>
}
export default Root;
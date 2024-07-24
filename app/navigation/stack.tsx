import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login";
const NativeStack = createNativeStackNavigator();

const Stack = () => {
    return (
    <NativeStack.Navigator
    initialRouteName="Login"
    screenOptions={{
        animation:"slide_from_left"
    }}>
        <NativeStack.Screen name="Login" component={Login}/>
    </NativeStack.Navigator>
    );
}
export default Stack;
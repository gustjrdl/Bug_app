import React, { useState } from "react";
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Alert} from 'react-native';
import styled from "styled-components/native";



export default function Settings ({navigation:{navigate}}:any){

    const logoutButton = () => {
        
        navigate("Stack", {screen:"Login"})
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity><Text>Logout</Text></TouchableOpacity> 
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
      },
    })
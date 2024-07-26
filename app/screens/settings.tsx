import React, { useState } from "react";
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { AppDispatch } from "../store/store";
import { logout } from "../store/authSlice";
import { Modal } from "react-native";
import { RootState } from "../store/rootReducer";

export default function Settings ({navigation:{navigate}}:any){

    const user = useSelector((state: RootState) => state.auth.user);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch<AppDispatch>();

    const logoutButton = () => {
        dispatch(logout())
            !isAuthenticated
            console.log(user)
            navigate("Stack", {screen:"Login"})
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={logoutButton}>
                <Text style={{color:'white'}}>Logout</Text>
            </TouchableOpacity> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
      },
      button:{
        width:100,
        height:50,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'rgb(200,0,54)',
        borderRadius:10,
      }
    })
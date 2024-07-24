import React, { useState } from "react";
import {View, Text,  StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { RootState } from "../store/rootReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { login } from "../store/authSlice";

export default function Login ({navigation:{navigate}}:any){

    const [text, setText] = useState("");
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch<AppDispatch>();

    const loginButton = () => {
        if (!text||text.length !== 11) {
            alert('전화번호 11자리를 입력해주세요');
            return;
          }
          else{
            navigate("Tabs", {screen:"Main"})
            !isAuthenticated
            return dispatch(login(text))
          }
    }
    return (
      <View style={styles.container}>
        <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                placeholder="전화번호를 입력해주세요."
                keyboardType="numeric"
                maxLength={11} 
                ></TextInput>
        <TouchableOpacity style={styles.button} onPress={loginButton}><Text style={{color:'white'}}>login</Text></TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
      },
    input: {
        width:'60%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius:10,
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
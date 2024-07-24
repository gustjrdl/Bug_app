import React, { useState } from "react";
import {View, Text,  StyleSheet, TextInput} from 'react-native';
import styled from "styled-components/native";

  
const Btn = styled.TouchableOpacity`
    flex: 0.3;
    justify-content: center;
    align-items: center;
`;

export default function Login ({navigation:{navigate}}:any){
  
    const [text, setText] = useState("");

    const loginButton = () => {
        if (!text||text.length !== 11) {
            alert('전화번호 11자리를 입력해주세요');
            return;
          }
          else{
            navigate("Tabs", {screen:"Main"})
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
                <Btn onPress={loginButton}><Text>login</Text></Btn>
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
})
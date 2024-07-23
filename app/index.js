  import { Text, View, Image, StyleSheet, Button, Platform, TouchableHighlight, ActivityIndicator, FlatList, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView } from 'react-native';
  import React, { useEffect, useRef, useState } from 'react';
  import * as ImagePicker from 'expo-image-picker';
  import axios from 'axios';
  import FormData from 'form-data';
  import { Fontisto } from '@expo/vector-icons';
  import {createStackNavigator} from '@react-navigation/stack'
  

  const Stack = createStackNavigator();
  export default function App() {

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const [image, setImage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [isUpload, setIsUploadImg] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [text, setText] = useState('');// phonenumber state
    const [imageId, setImageId] = useState("");
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardVisible(true);
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false);
        }
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);


    const openCamera = async () => {
      if (!text||text.length !== 11) {
        alert('전화번호 11자리를 입력해주세요');
        return;
      }
        let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        postImage(result.assets[0].uri);
      } 
    };
    
    const postImage = async(image) => { 
        try {
          
          console.log(`image:${image}`);
            const filename = image.split('/').pop();
            const match = /\.(\w+)$/.exec(filename ?? '');
            const type = match ? `image/${match[1]}` : `image`;
            
            const formData = new FormData();

            formData.append('photo', { uri: image, name: filename, type });
            formData.append('number', text);

            console.log('formdata:',formData);
            
            const response = await axios({
                method: 'post',
                url: `${apiUrl}/api/phones/upload`,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: formData
            }

          );
            setLoading(true);

            setIsUploadImg(true);

            const imageId = response.data.id;

            setImageId(imageId);
            

            pollForImageUrl(imageId);
            
            if(response) {
              
              setResponseMessage(response.data.message || 'Upload successful');
            }
            console.log("resData:",response.data);
        } 
        catch (error) {
            console.error('파일 전송에 실패하였습니다.', error);
            alert('파일 전송에 실패하였습니다. 네트워크 상태를 확인하고 다시 시도해주세요.');
        }
    }
    
    const pollForImageUrl = async(imageId)=> {

      console.log(imageId);
      const pollInterval = 1000;

      const fetchImageUrl = async () => {  
        try {
          
          const response = await axios({ 
            method:'get',
            url:`${apiUrl}/api/phones/getResult?detectId=${imageId}`,

          });

          if (response) {
            
            const responseData = `${response.data.result}`;

            const imageUrl = `${apiUrl}${responseData}`

            setImage(imageUrl)
            
            if(response.data.result === null){
              
              setTimeout(fetchImageUrl, pollInterval);
            }else{
            setLoading(false);
            }
          } else {
            setTimeout(fetchImageUrl, pollInterval);
          }
        } catch (error) {
          console.error(error);
          setTimeout(fetchImageUrl, pollInterval);
        }
      };
      fetchImageUrl();
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
        {!keyboardVisible && (<TouchableOpacity  style={styles.cameraButton} onPress={openCamera} ><Fontisto name="camera" size={24} color="white" /></TouchableOpacity>)}
      
      {image && ( <View style={styles.imageContainer}>
        <Image source={{ uri: image }}  resizeMode="stretch" style={[styles.image, isLoading && styles.imageLoading]}/>
        {isLoading && <ActivityIndicator style={styles.spinner} size="large" color="#0000ff" />}
      </View>)}
    
      </View>
    );  
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
    position:'absolute',
    top:10,
  },
  button: {
    marginTop:30,
    width:'15%',
    height:'5%',
    justifyContent:"center",
      alignItems:"center",
    backgroundColor: 'rgb(200,0,54)',
    borderRadius:10,
  },
    cameraButton: {
      width:'30%',
      height:'12%',
      backgroundColor: 'rgb(200,0,54)',
      justifyContent:"center",
      alignItems:"center",
      borderRadius:100,
      position:'absolute',
      bottom:10,
    },
    buttonText: {
      color:'white',
      fontWeight:'bold',
    },
    imageContainer: {
      position: 'relative',
      width: 200,
      height: 200,
    },//TO-DO 환경변수로 빼기
    image: {
      width: '100%',
      height: '100%',
      
    },
    imageLoading: {
      opacity: 0.3,
    },
    spinner: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -18 }, { translateY: -18 }] // 스피너를 중앙으로 이동시킴
    }, box: {
      position: 'absolute',
      borderWidth: 2,
      borderColor: 'red'
    },

  })


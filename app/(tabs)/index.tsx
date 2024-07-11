import { Text, View, Image, StyleSheet, Button, Platform, TouchableHighlight, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import FormData from 'form-data';
import { Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';



export default function App() {

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const [image, setImage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');


  const openCamera = async () => {
      let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result);
      postImage();
    } 
    console.log("result.assets:",result.assets)
    return <Text></Text>
  };

  const postPicture = async () => {
    const filename = image.split('/').pop();
    const match = /\.(\w+)$/.exec(filename ?? '');
    const type = match ? `image/${match[1]}` : `image`;
    
    const formData = new FormData();

    formData.append('file', { uri: image, name: filename, type });
    formData.append('title', 'asdsa');
    
    console.log("formdata:", formData);
  }

  const postImage = async() => {     
    
    setLoading(true)
      try {
          console.log("image:", image.split('/'));
  
          const filename = image.split('/').pop();
          const match = /\.(\w+)$/.exec(filename ?? '');
          const type = match ? `image/${match[1]}` : `image`;
          
          const formData = new FormData();

          formData.append('file', { uri: image, name: filename, type });
          formData.append('title', 'asdsa');
          
          console.log("formdata:", formData);

          await new Promise(resolve => setTimeout(resolve, 3000));
          const response = await axios({
              method: 'post',
              url: `${apiUrl}/photos/upload`,
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
              data: formData
          });


          console.log("Upload successful");
          if(response) {
            setLoading(false);
            
            setResponseMessage(response.data.message || 'Upload successful');
            setImage("");
          }
          console.log("resData:",response.data);
      } catch (error) {
          await new Promise(resolve => setTimeout(resolve, 5000));
          setLoading(false);
          console.error('파일 전송에 실패하였습니다.', error);
      }
  }
  
  useEffect(()=>{
    const getList = async () => {
      const res = await axios({
        method: 'get',
        url:`${apiUrl}/photos/feed`,
      })
      setData(res.data);
    }
    getList();
  },[])

  return (
    <View style={styles.container}>
      <TouchableOpacity  style={styles.button} onPress={openCamera} ><Text style={styles.buttonText}>카메라</Text></TouchableOpacity>
      {/* <TouchableOpacity  style={styles.button} onPress={pickImage} ><Text style={styles.buttonText}>사진첩</Text></TouchableOpacity> */}
      
      
      {image && (<View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={[styles.image, isLoading && styles.imageLoading]}/>

        {isLoading && <ActivityIndicator style={styles.spinner} size="large" color="#0000ff" />}

      </View>) }
        {!image || <TouchableOpacity onPress={postImage} ><Text>재전송</Text></TouchableOpacity>}
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  button: {
    width:'40%',
    height:'20%',
    backgroundColor: 'rgb(200,0,54)',
    justifyContent:"center",
    alignItems:"center",
    borderRadius:100,
  },
  buttonText: {
    color:'white',
    fontWeight:'bold',
  },
  imageContainer: {
    position: 'relative',
    width: 200,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    opacity:1,
    position: "relative",
  },
  imageLoading: {
    opacity: 0.3,
  },
  title: {
    fontSize: 32,
  },
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -18 }, { translateY: -18 }] // 스피너를 중앙으로 이동시킴
  },

})


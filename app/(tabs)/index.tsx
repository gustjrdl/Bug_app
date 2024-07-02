import { Text, View, Image, StyleSheet, Button, Platform, TouchableHighlight, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FlatList } from 'react-native-gesture-handler';



export default function App() {

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const request = new XMLHttpRequest();

  const [image, setImage] = useState("");
  const [picture, setPicture] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  

  const openCamera = async () => {

      let picture = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    
    console.log(picture);

    if (!picture.canceled) {
      setPicture(picture.assets[0].uri);
    }
  };

  const pickImage = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    })
    console.log("result:", result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const testPost = async() => {    

    console.log("image:", image);
    }
  

  useEffect(() => {
  request.onreadystatechange = e => {
    if (request.readyState !== 4) {
      return;
    }
  
    if (request.status === 200) {
      console.log('success', request.responseText);
    } else {
      console.warn('error');
    }
  };
  
  request.open('GET', apiUrl);
  request.send();
  },[])


  return (
    <View style={styles.container}>
      <Text>Hello, world!</Text>
      <Button title='camera' onPress={openCamera} ></Button>
      <Button title='gallery' onPress={pickImage} ></Button>
      

      {image && <Image source={{ uri: image }} style={styles.image} />}
      {picture && <Image source={{ uri: picture }} style={styles.image} />}
      <Button title='ddd' onPress={testPost}></Button>
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    backgroundColor:"tomato",
  },
  image: {
    width: 200,
    height: 200,
  },

})


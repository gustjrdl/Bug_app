import { Text, View, Image, StyleSheet, Button, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';



export default function App() {

  // const [image, setImage] = useState(null);

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    console.log(result);
  };


  return (
    <View style={styles.container}>
      <Text>Hello, world!</Text>
      <Button title='HelloWorld!' onPress={openCamera} ></Button>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    backgroundColor:"tomato",
  },
  nomalButton : {
    backgroundColor:"white",
    color:"tomato",
  }

})


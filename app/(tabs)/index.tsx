import { Text, View, Image, StyleSheet, Button, Platform, TouchableHighlight } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';



export default function App() {

  const [image, setImage] = useState("");

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    console.log(result);

  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    })

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }


  return (
    <View style={styles.container}>
      <Text>Hello, world!</Text>
      <Button title='camera' onPress={openCamera} ></Button>
      <Button title='Gallery' onPress={pickImage} ></Button>
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


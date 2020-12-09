import React, {useState} from 'react';
import { Dimensions, StyleSheet, Text, View, } from 'react-native';
import Bird from './components/Bird'
export default function App() {

  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const [BirdBottom, setBirdBottom] = useState(screenHeight/2)


  

  return (
    <View style={styles.container}>
      <Bird />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

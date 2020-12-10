import React, {useEffect, useState} from 'react';
import { Dimensions, StyleSheet, Text, View, } from 'react-native';
import Bird from './components/Bird'
import Obstacles from './components/Obstacles';
export default function App() {

  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const [birdBottom, setbirdBottom] = useState(screenHeight/2)
  const [obstaclesLeft, setobstaclesLeft] = useState(screenWidth)
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 50
  const gravity = 3
  let gameTimerId
  let obstaclesLeftTimerId

 useEffect(() => {
  if( birdBottom > 0){
    gameTimerId = setInterval(() => {
      setbirdBottom(birdBottom => birdBottom - 3)
     }, 30)

     return () => {
       clearInterval(gameTimerId)
     }

    }
 }, [birdBottom])
console.log(birdBottom)

useEffect(() => {
  if (obstaclesLeft > -obstacleWidth) {
    obstaclesLeftTimerId = setInterval(() => {
      setobstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
    }, 30)
  }

  return () => {
    clearInterval(obstaclesLeftTimerId)
  }

}, [obstaclesLeft])


  return (
    <View style={styles.container}>
      <Bird
        birdBottom={birdBottom}
        birdLeft={birdLeft}
      />
          <Obstacles
    obstacleWidth={obstacleWidth}
    obstacleHeight={obstacleHeight}
    gap={gap}
    obstaclesLeft={obstaclesLeft}
    />
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

import React, {useEffect, useState} from 'react';
import { Dimensions, StyleSheet, Text, View, } from 'react-native';
import Bird from './components/Bird'
import Obstacles from './components/Obstacles';
export default function App() {

  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const [birdBottom, setbirdBottom] = useState(screenHeight/2)
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 + 30)
  const [obstaclesNegHeight, setobstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo, setobstaclesNegHeightTwo] = useState(0)
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200
  const gravity = 3
  let gameTimerId
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo

 useEffect(() => {
  if( birdBottom > 0){
    gameTimerId = setInterval(() => {
      setbirdBottom(birdBottom => birdBottom - gravity)
     }, 30)

     return () => {
       clearInterval(gameTimerId)
     }

    }
 }, [birdBottom])
console.log(birdBottom)

//first obstacle

useEffect(() => {
  if (obstaclesLeft > -obstacleWidth) {
    obstaclesLeftTimerId = setInterval(() => {
      setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
    }, 30)
    return () => {
      clearInterval(obstaclesLeftTimerId)
    }
  } else{
    setObstaclesLeft(screenWidth)
    setobstaclesNegHeight( - Math.random() * 100)
  }
}, [obstaclesLeft])

//second obstacle

useEffect(() => {
  if (obstaclesLeftTwo > -obstacleWidth) {
    obstaclesLeftTimerIdTwo = setInterval(() => {
      setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
    }, 30)
    return () => {
      clearInterval(obstaclesLeftTimerIdTwo)
    }
  } else{
    setObstaclesLeftTwo(screenWidth)
    setobstaclesNegHeightTwo( - Math.random() * 100)
  }
}, [obstaclesLeftTwo])

// collision detection

useEffect(() => {
  console.log(obstaclesLeft)
  console.log(screenWidth/2)
  console.log(obstaclesLeft > screenWidth/2)
  if (
    ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
    birdBottom > (obstaclesNegHeight + obstacleHeight + gap -30)) &&
    (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30 )
    )
    || 
    ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
    birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
    (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30 )
    )
    ) 
    {
    console.log('game over')
    gameOver()
  }
})

const gameOver = () => {
  clearInterval(gameTimerId)
  clearInterval(obstaclesLeftTimerId)
  clearInterval(obstaclesLeftTimerIdTwo)
}

  return (
    <View style={styles.container}>
      <Bird
        birdBottom={birdBottom}
        birdLeft={birdLeft}
      />
    <Obstacles
    color={'green'}
    obstacleWidth={obstacleWidth}
    obstacleHeight={obstacleHeight}
    randomBottom={obstaclesNegHeight}
    gap={gap}
    obstaclesLeft={obstaclesLeft}
    />
    <Obstacles
    color={'yellow'}
    obstacleWidth={obstacleWidth}
    obstacleHeight={obstacleHeight}
    randomBottom={obstaclesNegHeightTwo}
    gap={gap}
    obstaclesLeft={obstaclesLeftTwo}
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

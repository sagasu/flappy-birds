import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Bird from './components/Bird';

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const gravity = 3;
  let gameTimerId;
  let obstacleLeftTimerId;

  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);

  // this console will be triggered every 30 milliseconds so be careful what you place here.
  // console.log(screenWidth + " " + screenHeight);

  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        // We will fall 3 units down every 30 milliseconds 
        setBirdBottom(birdBottom => birdBottom - gravity);
      }, 30);

      return () => {
        clearInterval(gameTimerId)
      }
    }
  }, [birdBottom]);

  useEffect(() => {
    if(obstaclesLeft > 0) {
      obstacleLeftTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5);
      }, 30)
    }
    return () => {
      clearInterval(obstacleLeftTimerId )
    }
  }, [obstaclesLeft]);

  return (
    <View style={styles.container}>
      <Bird 
        birdBottom = {birdBottom}
        birdLeft = {birdLeft}
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

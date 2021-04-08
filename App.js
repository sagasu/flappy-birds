import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {Text, Dimensions, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Bird from './components/Bird';
import Obstacles from './components/Obstacles';

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const gravity = 3;
  let gameTimerId;
  let obstacleLeftTimerId;
  let secondObstacleLeftTimerId;

  const obstacleWidth = 60;
  const obstacleHeight = 300;
  const gap = 200;
  const birdWidth = 60;

  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [secondObstaclesLeft, setSecondObstaclesLeft] = useState(screenWidth + screenWidth/2);
  const [obstacleNegHeight, setObstacleNegHeight] = useState(0);
  const [secondObstacleNegHeight, setSecondObstacleNegHeight] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
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
    if(obstaclesLeft > -obstacleWidth) {
      obstacleLeftTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5);
      }, 30);

      return () => {
        clearInterval(obstacleLeftTimerId)
      }
    }else{
      setObstaclesLeft(screenWidth);
      setObstacleNegHeight(-Math.random() * 100);
      setScore(score => score + 1);
    }
    
  }, [obstaclesLeft]);

  useEffect(() => {
    if(secondObstaclesLeft > -obstacleWidth) {
      secondObstacleLeftTimerId = setInterval(() => {
        setSecondObstaclesLeft(secondObstaclesLeft => secondObstaclesLeft - 5);
      }, 30);

      return () => {
        clearInterval(secondObstacleLeftTimerId)
      }
    }else{
      setSecondObstaclesLeft(screenWidth);
      setSecondObstacleNegHeight(-Math.random() * 100);
      setScore(score => score + 1);
    }
    
  }, [secondObstaclesLeft]);

  const jump = () => {
    if(!isGameOver && (birdBottom < screenHeight)){
      setBirdBottom(birdBottom => birdBottom + 50);
    }
  };

  // Try to fix it to reduce repetition
  // useEffect(() => {
  //   manageObstacle(secondObstaclesLeft, setSecondObstacleLeftTimerId, getSecondObstacleLeftTimerId, setSecondObstaclesLeft, setSecondObstacleNegHeight );
  // }, [secondObstaclesLeft]);

  const setSecondObstacleLeftTimerId = (timerId) => {
    secondObstacleLeftTimerId = timerId;
  };

  const getSecondObstacleLeftTimerId = () => {
    return secondObstacleLeftTimerId;
  };

  const manageObstacle = (obsLeft, setObsLeftTimerId, getObsLeftTimerId, setObsLeft, setObsNegHeight) => {
    if(obsLeft > -obstacleWidth) {
      setObsLeftTimerId(setInterval(() => {
        setObsLeft(obsLeft => obsLeft - 5);
      }, 30));

      return () => {
        clearInterval(getObsLeftTimerId())
      }
    }else{
      setObsLeft(screenWidth);
      setObsNegHeight(-Math.random() * 100);
      setScore(score => score + 1);
    }
  };

  function isCollision(obsNegHeight, obsLeft){
    const halfBirdWidth = birdWidth/2;
    return (birdBottom < (obsNegHeight + obstacleHeight + halfBirdWidth)) ||
       birdBottom > (obsNegHeight + obstacleHeight + gap - halfBirdWidth) &&
       (obsLeft > screenWidth/2-halfBirdWidth && obsLeft < screenWidth/2 + halfBirdWidth)
  }

  const gameOver = () => {
    console.log('game over');
    clearInterval(gameTimerId);
    clearInterval(obstacleLeftTimerId);
    clearInterval(secondObstacleLeftTimerId);
    setIsGameOver(true);
  };

  useEffect(() => {
    if(isCollision(obstacleNegHeight, obstaclesLeft) || isCollision(secondObstacleNegHeight, obstaclesLeft)){
      gameOver();
    }
  });

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {isGameOver && <Text>{score}</Text>}
        <Bird 
          birdBottom = {birdBottom}
          birdLeft = {birdLeft}
        />
        <Obstacles 
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          obstaclesLeft={obstaclesLeft}
          randomBottom={obstacleNegHeight}
          gap={gap}
        />
        <Obstacles 
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          obstaclesLeft={secondObstaclesLeft}
          gap={gap}
          randomBottom={secondObstacleNegHeight}
        />

      </View>
    </TouchableWithoutFeedback>

    
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

import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';

const Obstacles = ({obstaclesLeft, obstacleWidth, obstacleHeight, gap, randomBottom}) => {
    const styles = StyleSheet.create({
        image: {
            position: 'absolute',
            width: obstacleWidth,
            height: obstacleHeight,
            left: obstaclesLeft,
            bottom: randomBottom + obstacleHeight + gap,
        },
        imagedown: {
            position: 'absolute',
            width: obstacleWidth,
            height: obstacleHeight,
            left: obstaclesLeft,
            bottom: randomBottom,
        },
    });

    return (
        <>
            <ImageBackground source={require('../assets/flappybird-pipe.png')} style={styles.image}>
            </ImageBackground>

            <ImageBackground source={require('../assets/flappybird-pipe.png')} style={styles.imagedown}>
            </ImageBackground>
        </>)
}

export default Obstacles;
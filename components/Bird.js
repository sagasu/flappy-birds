import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';

const Bird = ({birdBottom, birdLeft}) => {
    const birdWidth = 50;
    const birdHeight = 50;

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            backgroundColor: 'blue',
            width: 50,
            height: 60,
            bottom: birdBottom - (birdHeight/2),
            left: birdLeft - (birdWidth / 2)
        },
        image: {
            position: 'absolute',
            width: birdWidth,
            height: birdHeight,
            bottom: birdBottom - (birdHeight/2),
            left: birdLeft - (birdWidth / 2)
        },
    });

    return (
            <ImageBackground source={require('../assets/flappy-bird.png')} style={styles.image}>
            </ImageBackground>
        )
}


export default Bird;
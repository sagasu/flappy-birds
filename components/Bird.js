import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Bird = ({birdBottom, birdLeft}) => {
    const birdWidth = 50;
    const birdHeight = 50;

    return (
        <View style = {{
            position: 'absolute',
            backgroundColor: 'blue',
            width: 50,
            height: 60,
            bottom: birdBottom - (birdHeight/2),
            left: birdLeft - (birdWidth / 2)
        }}
        
        />
        )
}

export default Bird;
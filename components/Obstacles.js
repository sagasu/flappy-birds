import React from 'react';
import {View} from 'react-native';

const Obstacles = () => {
    const obstacleWidth = 60;
    const obstacleHeight = 300;
    const gap = 50;

    return (
        <>
            <View style={{
                position: 'absolute',
                backgroundColor: 'green',
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: 0 + obstacleHeight + gap,
            }} />

            <View style={{
                position: 'absolute',
                backgroundColor: 'green',
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: 0,
            }} />
        </>)
}

export default Obstacles;
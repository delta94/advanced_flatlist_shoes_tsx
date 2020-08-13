import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  
} from 'react-native';

//INTERFACES
import { CircleProps, DataProps } from '../config/Interfaces';

//CONSTS
import { CIRCLE_SIZE, SCREEN_WIDTH } from '../config/Constants';

const Circle = ({ scrollX, data }: CircleProps) => {
  return (
    <>
      <View style={styles.container}>
        {data.map(({ color }: DataProps, index: number) => {
          const inputRange = [
            (index - 0.55) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 0.55) * SCREEN_WIDTH];
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
              extrapolate: 'clamp',
            })
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 0.2, 0],
              extrapolate: 'clamp',
            })
          return (
            <Animated.View
              key={index}
              style={[styles.circle, {
                backgroundColor: color,
                opacity,
                transform: [{ scale }]
              }]} />
          )
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    top: '20%',
  },
});

export default Circle;
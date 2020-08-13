import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated
} from 'react-native';

//INTERFACES
import { PaginationProps } from '../config/Interfaces';
import { DOT_SIZE, SCREEN_WIDTH, } from '../config/Constants';

const Pagination = ({ scrollX, data }: PaginationProps) => {
  const inputRange = [-SCREEN_WIDTH, 0, SCREEN_WIDTH];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-DOT_SIZE, 0, DOT_SIZE]
  })
  return (
    <>
      <View style={styles.container}>
        <Animated.View style={[styles.dotIndicator, { transform: [{ translateX }] }]} />
        {data.map((item) => {
          return (
            <View key={item.id} style={styles.dotContainer}>
              <View style={[styles.dot, { backgroundColor: item.color }]} />
            </View>
          )
        })}
      </View>
    </>
  );
}

//pagination
//paginationDotContainer
//paginationDot

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: DOT_SIZE,
    right: 20,
    bottom: 40,
    position: 'absolute',
  },
  dotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  dotIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#CCC',
    position: 'absolute',
  },
});

export default Pagination;
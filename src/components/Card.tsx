import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageSourcePropType,
  Dimensions,
  Image,
  Animated
} from 'react-native';


//MY_CONST
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

//INTERFACES
import { CardProps } from '../config/Interfaces';


const Card = ({ item, index, scrollX }: CardProps) => {
  const inputRange = [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH];
  const inputRangeOpacity = [(index - 0.3) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 0.3) * SCREEN_WIDTH];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });

  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [SCREEN_WIDTH * 0.1, 0, -SCREEN_WIDTH * 0.1],
  });

  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [SCREEN_WIDTH * 0.7, 0, -SCREEN_WIDTH * 0.7],
  });

  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0, 1, 0],
  });
  return (
    <>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.imageContainer}>
            <Animated.Image
              source={item.image}
              style={[styles.image, {
                transform: [{ scale }]
              }]} />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.textContainer}>

            <Animated.Text
              style={[styles.textHeading, {
                opacity,
                transform: [{ translateX: translateXHeading }]
              }]}>{item.heading}</Animated.Text>

            <Animated.Text style={[styles.textDescription, {
              opacity,
              transform: [{ translateX: translateXDescription }]
            }]}>{item.description}</Animated.Text>

          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginTop: 100,
    width: 300,
    height: 300,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
  footer: {
    flex: 1,
  },
  textContainer: {
    marginTop: 100,
    paddingLeft: 50,
    width: 350,
    //backgroundColor: '#F0C'
  },
  textHeading: {
    color: '#363636',
    fontSize: 24,
    fontFamily: 'SFProText-Bold',
    textTransform: 'uppercase',
  },
  textDescription: {
    color: '#888888',
    fontSize: 16,
    fontFamily: 'SFProText-Regular',

  },
});

export default Card;
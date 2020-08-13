import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Dimensions
} from 'react-native';

//INTERFACES
import { TickerProps } from '../config/Interfaces';

//MY_IMPORTS
import { TICKER_HEIGHT } from '../config/Constants';

//MY_CONST
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Ticker = ({ data, scrollX }: TickerProps) => {

  const inputRange = [-SCREEN_WIDTH, 0, SCREEN_WIDTH];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  })

  return (
    <>
      <View style={styles.container}>
        <Animated.View style={{
          transform: [{ translateY }]
        }}>
          {data.map(({ type }, index) => {
            return (
              <Text key={index} style={styles.textType}>{type}</Text>
            )
          })}
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: TICKER_HEIGHT,
    position: 'absolute',
    top: 40,
    left: 20,
    overflow: 'hidden',
  },
  textType: {
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT,
    textTransform: 'uppercase',
    fontFamily: 'SFProText-Bold',
  },
});

export default Ticker;
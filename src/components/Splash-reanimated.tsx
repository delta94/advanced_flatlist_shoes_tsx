import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Animated, {useCode, Extrapolate, interpolate, Value, set, cond, eq, call } from 'react-native-reanimated';
import { timing } from 'react-native-redash';
import MaskedView from '@react-native-community/masked-view';

//CONST
import { BACKGROUND_COLOR } from '../config/Constants';

const Splash = ({ children, setStartScroll }: any) => {

  //STATES
  const [loading, setLoading] = useState(false);
  const loadingProgress = new Value(0);

  //ANIMATION_STUFF
  const scale = interpolate(loadingProgress, {
    inputRange: [0, 15, 100],
    outputRange: [1, 0.8, 16]
  });

  const opacity = interpolate(loadingProgress, {
    inputRange: [0, 25, 50],
    outputRange: [0, 0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  useCode(() => [
    set(loadingProgress, timing({ to: 100, duration: 1000 })),
    cond(eq(loadingProgress, 100), call([], () => { setStartScroll(true); setLoading(true); })),
  ], []);


  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={BACKGROUND_COLOR} />
      <View style={{ flex: 1 }} >
        {loading ? null : <View style={[StyleSheet.absoluteFill, { backgroundColor: '#ff3335' }]} />}
        <MaskedView
          style={styles.maskedContainer}
          maskElement={
            <View style={styles.maskedElement}>
              <View style={styles.maskedImageContainer}>
                <Animated.Image
                  style={[styles.maskedImage, {
                    transform: [{ scale }]
                  }]}
                  source={require('../assets/imgs/logo-splash.png')}
                  resizeMode={'contain'} />
              </View>
            </View>
          }>
          {loading ? null : <View style={[StyleSheet.absoluteFill, { backgroundColor: 'white' }]} />}
          <Animated.View style={{ opacity, flex: 1, }}>
            {children}
          </Animated.View>
        </MaskedView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  maskedContainer: {
    flex: 1,
  },
  maskedElement: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maskedImageContainer: {
    width: 200,
    height: 200,
  },
  maskedImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',

  },
});

export default Splash;
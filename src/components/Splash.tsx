import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, StatusBar, Animated } from 'react-native';
import MaskedView from '@react-native-community/masked-view';

//CONST
import { BACKGROUND_COLOR } from '../config/Constants';

const Splash = ({ children, setStartScroll }: any) => {

  //STATES
  const [loading, setLoading] = useState<boolean>(false);
  const loadingProgress = useRef(new Animated.Value(0)).current;

  //USE_EFFECTS
  useEffect(() => {
    Animated.timing(loadingProgress, {
      toValue: 100,
      duration: 480,
      useNativeDriver: true,
      delay: 2000
    }).start(() => {
      setStartScroll(true);
      setLoading(true);
    })

  }, [])

  //ANIMATION_STUFF
  const scale = loadingProgress.interpolate({
    inputRange: [0, 15, 100],
    outputRange: [1, 0.8, 16]
  });

  const opacity = loadingProgress.interpolate({
    inputRange: [0, 25, 50],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });


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
          <Animated.View style={{ opacity, flex: 1,}}>
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
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, StatusBar, Animated, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//IMPORT_COMPONENTS
import Splash from '../components/Splash';
import Card from '../components/Card';
import Ticker from '../components/Ticker';
import Circle from '../components/Circle';
import Pagination from '../components/Pagination';

//IMPORT_CONST
import { BACKGROUND_COLOR, FIRST_MAIN_GRADIENT_COLOR, SECOND_MAIN_GRADIENT_COLOR } from '../config/Constants';

//IMPORT_DATA_FILES
import { data } from '../data/data';

//MY_CONST


const MainScreen = () => {

  //STATES
  const [startScroll, setStartScroll] = useState<boolean>(false);

  //ANIMATION_STUFF
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={BACKGROUND_COLOR} />
      <Splash setStartScroll={setStartScroll}>
        <LinearGradient
          colors={[FIRST_MAIN_GRADIENT_COLOR, SECOND_MAIN_GRADIENT_COLOR]}
          style={[styles.container]}>
          <Circle data={data} scrollX={scrollX} />
          <Animated.FlatList
            scrollEnabled={startScroll}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => String(item.id)}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            renderItem={({ item, index }) => (
              <Card item={item} index={index} scrollX={scrollX} />
            )}
          />
          <Ticker data={data} scrollX={scrollX} />
          <Pagination data={data} scrollX={scrollX} />
          <View style={styles.logoContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.logoImage}
                source={require('../assets/imgs/logo-splash.png')} />
            </View>
            <Text style={styles.logoText}>streetshoes</Text>
          </View>
        </LinearGradient>
      </Splash>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    height: 180,
    position: 'absolute',
    bottom: 50,
    left: 10,    
  },
  logoText: {
    color: '#363636',
    fontSize: 20,
    fontFamily: 'SFProText-Bold',
    textTransform: 'uppercase',
    position: 'absolute',
    transform: [
      { rotate: '90deg' },
      { translateX: 75 },
      { translateY: 65 }

    ],
  },
  imageContainer: {
    width: 150,
    height: 150,
  },
  logoImage: {
    position: 'relative',
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    transform: [
      { translateX: -40 },
      { rotate: '55deg' },
    ],


  },
});

export default MainScreen;

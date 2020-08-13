import React, { useRef } from 'react';
import { View, StyleSheet, StatusBar, Animated } from 'react-native';

//IMPORT_COMPONENTS
import Card from '../components/Card';
import Ticker from '../components/Ticker';
import Circle from '../components/Circle';
import Pagination from '../components/Pagination';

//IMPORT_CONST
import { BACKGROUND_COLOR } from '../config/Constants';

//IMPORT_DATA_FILES
import { data } from '../data/data';

//MY_CONST


const MainScreen = () => {

  //ANIMATION_STUFF
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={BACKGROUND_COLOR} />
      <View style={styles.container}>
        <Circle data={data} scrollX={scrollX} />
        <Animated.FlatList
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
      </View>
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
});

export default MainScreen;

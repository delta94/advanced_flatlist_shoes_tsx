import React from 'react';
import { View, StyleSheet, Text, Dimensions, StatusBar } from 'react-native';

//IMPORT_CONST
import { BACKGROUND_COLOR } from '../config/Constants';

//IMPORTS_DATA_FILES
import data from '../data/data';

//maybe_const_this_param
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const MainScreen = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={BACKGROUND_COLOR} />
      <View style={styles.container}>
        <Text>MainScreen</Text>
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

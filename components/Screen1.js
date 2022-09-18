import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function Screen1(props) {
  return (
    <View>
      <Text style={styles.container}>Hello Screen One!</Text>

      <Button
        title="Go to Screen 2"
        onPress={() => props.navigation.navigate('Screen2')}
      ></Button>
    </View>
  );
}

export default Screen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

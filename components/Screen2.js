import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function Screen2(props) {
  return (
    <View>
      <Text style={styles.container}>Hello Screen Two!</Text>

      <Button
        title="Go back to Screen 1"
        onPress={() => props.navigation.navigate('Screen1')}
      ></Button>
    </View>
  );
}

export default Screen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

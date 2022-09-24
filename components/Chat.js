import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';

function Chat(props) {
  let { name } = props.route.params;
  let { color } = props.route.params;

  useEffect(() => {
    return props.navigation.setOptions({ title: name });
  });

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text>Hello Screen Two!</Text>
      <Pressable
        style={styles.backBtn}
        onPress={() => props.navigation.navigate('Start')}
      >
        <Text style={styles.btnText}>Go back</Text>
      </Pressable>
    </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  backBtn: {
    height: 45,
    width: 250,
    borderWidth: 1,
    color: '#ffffff',
    backgroundColor: '#757083',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
  },
});

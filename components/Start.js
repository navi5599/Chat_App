// Start component that renders home screen, aka Starting screen

import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
// import { Platform } from 'react-native-web';

import Image from '../img/img.png';

function Start(props) {
  //State used to update Title name in Chat component
  const [name, setName] = useState('');
  //State used to update Color background in Chat component
  const [color, setColor] = useState();
  const [containerMarginTop, setContainerMarginTop] = useState(180);
  const [containerMarginBottom, setContainerMarginBottom] = useState(0);

  const colors = {
    black: '#090C08',
    purple: '#474056',
    gray: '#8A95A5',
    green: '#B9C6AE',
  };
  //pressing input,This moves container with input and button up,since keyboard covers whole container
  const onMove = () => {
    if (Platform.OS === 'android') {
      return containerMarginTop, containerMarginBottom;
    } else {
      setContainerMarginTop(0), setContainerMarginBottom(270);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={Image} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Chat App</Text>
        <View
          style={[
            styles.smallContainer,
            {
              marginTop: containerMarginTop,
              marginBottom: containerMarginBottom,
            },
          ]}
        >
          <Pressable>
            <View>
              <TextInput
                onFocus={onMove}
                style={styles.input}
                onChangeText={(name) => setName(name)}
                value={name}
                placeholder="Your name.."
              ></TextInput>
            </View>
          </Pressable>

          <View style={styles.colorsContainer}>
            <TouchableOpacity
              onPress={() => setColor(colors.green)}
              style={[styles.touchable, { backgroundColor: colors.green }]}
            />
            <TouchableOpacity
              onPress={() => setColor(colors.gray)}
              style={[styles.touchable, { backgroundColor: colors.gray }]}
            />
            <TouchableOpacity
              onPress={() => setColor(colors.purple)}
              style={[styles.touchable, { backgroundColor: colors.purple }]}
            />
            <TouchableOpacity
              onPress={() => setColor(colors.black)}
              style={[styles.touchable, { backgroundColor: colors.black }]}
            />
          </View>
          <Text style={styles.backgroundColorText}>
            Choose your background color
          </Text>

          <Pressable
            style={styles.startBtn}
            onPress={() =>
              props.navigation.navigate('Chat', { name: name, color: color })
            }
          >
            <Text style={styles.btnText}>Start Chatting</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 45,
    marginBottom: 50,

    color: '#ffffff',
  },
  smallContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    minHeight: 300,
  },
  input: {
    height: 45,
    width: 250,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
    paddingHorizontal: 10,
  },

  colorsContainer: {
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  startBtn: {
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

  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  backgroundColorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#757083',
    opacity: 100,
    justifyContent: 'center',
    padding: 10,
  },

  touchable: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

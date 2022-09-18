import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { text: '' };
//   }

// alertMyText(input = []) {
//   Alert.alert(input.text);
// }

//   render() {
//     return (
//       <View style={styles.container}>
//         <TextInput
//           style={styles.input}
//           value={this.state.text}
//           onChangeText={(text) => this.setState({ text })}
//           placeholder="Type here ..."
//         />
//         <Text>You wrote: {this.state.text}</Text>
//         <Button
//           onPress={() => {
//             this.alertMyText({ text: this.state.text });
//           }}
//           title="Press Me"
//         />
//       </View>
//     );
//   }
// }

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen1">
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>{' '}
    </NavigationContainer>
  );
}

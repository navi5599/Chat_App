import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { db } from '../fire';

function Chat(props) {
  let { name } = props.route.params;
  let { color } = props.route.params;

  //state for messages
  const [messages, setMessages] = useState([]);
  //state to store info if user is online
  const [isConnected, setIsConnected] = useState();

  const [uid, setUid] = useState('');

  const auth = getAuth();
  //reference to the messages in firestore
  const messagesRef = collection(db, 'messages');

  useEffect(() => {
    props.navigation.setOptions({ title: name });

    // If user is online, retrieve messages from firebase store
    NetInfo.fetch().then((connection) => {
      setIsConnected(connection.isConnected);
      if (!connection.isConnected) {
        //get messages from async storage
        getMessages();
      } else {
        // Fetch collection
        const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'));

        // listen to authentication events
        const authUnsubscribe = onAuthStateChanged(auth, (user) => {
          if (!user) {
            signInAnonymously(auth);
          }

          // update user state with data
          setUid(user.uid);
          console.log(user.uid);
        });

        // listen for collection changes (Update state based on database snapshot)
        let stopListeningToSnapshots = onSnapshot(
          messagesQuery,
          onCollectionUpdate
        );

        return () => {
          // stop listening for changes
          stopListeningToSnapshots();
          // stop listening to authentication
          authUnsubscribe();
        };
      }
    });
  }, [isConnected]);

  // Reading snapshot data of messages collection, adding messages to messages state
  const onCollectionUpdate = (querySnapshot) => {
    let msg = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      msg.push({
        _id: data._id,
        createdAt: data.createdAt.toDate(),
        text: data.text,
        user: data.user,
      });
    });
    //Update state
    setMessages(msg);
    //UpdateAsync
    saveMessages(msg);
  };

  // //Add new messages
  const addMessage = (message) => {
    addDoc(messagesRef, {
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
    });
  };

  //ASYNCSTORAGE
  //get messages from async storage
  const getMessages = async () => {
    let messages = '';
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      setMessages(JSON.parse(messages));
    } catch (error) {
      console.log(error.message);
    }
  };

  //save messages to async storage
  const saveMessages = async (messages) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
      //console.log("Messages: ", messages);
    } catch (error) {
      console.log(error.message);
    }
  };

  //delete message from async storage
  const deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
      setMessages([]);
    } catch (error) {
      console.log(error.message);
    }
  };

  //Append new messages to the State and add to firestore collection (addMessage)
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    addMessage(messages[0]);
  }, []);

  //Change color of chat bubble
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: 'black',
          },
          right: {
            color: 'white',
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: '#5200BD',
          },
          left: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
    );
  };

  // Hide input bar if user is offline
  const renderInputToolbar = (props) => {
    if (!isConnected) {
      // hide Toolbar
    } else {
      // display Toolbar
      return <InputToolbar {...props} />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: color }}>
      <GiftedChat
        renderBubble={renderBubble.bind()}
        renderInputToolbar={renderInputToolbar.bind()}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: uid,
          name: name,
          avatar: 'https://placeimg.com/140/140/any',
        }}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

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

import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { db } from '../fire';

function Chat(props) {
  let { name } = props.route.params;
  let { color } = props.route.params;

  //State for messages
  const [messages, setMessages] = useState([]);
  const [uid, setUid] = useState('');

  const auth = getAuth();
  //reference to the messages in firestore
  const messagesRef = collection(db, 'messages');

  useEffect(() => {
    props.navigation.setOptions({ title: name });

    // Create a query to the messages collection, retrieving all messages sorted by their date of creation
    const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'));

    const authUnsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        signInAnonymously(auth);
      }
      // update user state with user data
      setUid(user.uid);
    });

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
  }, []);

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

  //Append new messages to the State and add to firestore collection (addMessage) and asyncStorage (saveMessages)
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    addMessage(messages[0]);
  }, []);

  //Change color of users chat bubble
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#5200BD',
          },
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: color }}>
      <GiftedChat
        renderBubble={renderBubble.bind()}
        messages={messages}
        onSend={onSend}
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

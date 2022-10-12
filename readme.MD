## Chat App

### Introduction

This is a React Native App developed using open-source platform Expo. Within app itself user should be able to use chat interface,share images and location.

### Features

- Home screen where user can type in name, and choose background color for chat screen
- Start sending messages to other participants
- Send your location
- Send photos ( choose from library, or take photo)

### Instructions

Before doing anything, of course, make sure Node and npm are available. To install node, visit : https://nodejs.org/en/download/

Then follow steps below

Run command to clone repository:

```
$ git clone https://github.com/navi5599/Chat_App.git
```

After cloning repo, you should install all dependencies,starting with Expo cli:

```
$ npm install expo-cli --global
```

In your root project folder, just run

```
$ npm install
```

After that, head over to https://expo.dev/ , and sign up. Also make sure you download your Expo App from your relevant app store for your device (iOS or Android) and install it.

Back to terminal, head over to your project folder and run

```
$ expo start
```

Expo will then create project for you,and provide you with scannable QR code. Use your phone to scan QR code, and run it with Expo App.

Create databse

1. Go to [Google Firebase](https://firebase.google.com/) and sing in with your Google account.
2. Next go to the Firebase console and create a new project (**Create Project**).
3. From Google Firebase dashboard of your project, click **Develop** from the menu on the left-hand side. After that select **Cloud Firestore**, then select **Create Database**.
4. Follow the instructions to create a new database.
5. Create a new collection "messages".
6. Under **Project settings**, search for a section called **Your apps**, Click the **Firestore for Web** button (shown as the </> icon). This will open a new screen asking you to register your web application.
7. Choose a name for your chat application, then click **Register** to generate the configuration code. Copy the contents of the `firebaseConfig` object and paste it in the firebase.js file.

### Tech used:

```
HTML
CSS
Javascript
React Native
Expo
```

---

### dependencies:

```
@expo/react-native-action-sheet": "^3.14.0",
    "@expo/webpack-config": "^0.17.0",
    "@firebase/firestore": "^3.6.0",
    "@react-native-async-storage/async-storage": "~1.17.3",
    "@react-native-community/masked-view": "^0.1.11",
    "@react-native-community/netinfo": "9.3.0",
    "@react-navigation/native": "^6.0.13",
    "@react-navigation/stack": "^6.3.0",
    "expo": "~46.0.9",
    "expo-image-picker": "~13.3.1",
    "expo-location": "~14.3.0",
    "expo-permissions": "~13.2.0",
    "expo-status-bar": "~1.4.0",
    "firebase": "^9.10.0",
    "react": "18.0.0",
    "react-dom": "18.0.0",
    "react-native": "0.69.6",
    "react-native-gesture-handler": "~2.5.0",
    "react-native-gifted-chat": "^1.0.4",
    "react-native-maps": "0.31.1",
    "react-native-reanimated": "~2.9.1",
    "react-native-safe-area-context": "4.3.1",
    "react-native-screens": "~3.15.0",
    "react-native-web": "~0.18.7",
    "react-navigation": "^4.4.4"
```

---

##### Screenshot of the App:

<img src="/img/imgss.PNG" height="580" width="260" display="inline-block" margin="0 auto">

---

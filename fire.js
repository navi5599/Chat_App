import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAf8x2aH45l15Dd4x75qMJHhDpowKR_kKE',
  authDomain: 'test057-32fd5.firebaseapp.com',
  projectId: 'test057-32fd5',
  storageBucket: 'test057-32fd5.appspot.com',
  messagingSenderId: '545782978817',
  appId: '1:545782978817:web:c966ae9a1a4801ab796300',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

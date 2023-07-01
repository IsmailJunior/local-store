import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDGAn-5E5XZR1AczfwH00fr5flnV4x1trM",
  authDomain: "ebuy-43b58.firebaseapp.com",
  projectId: "ebuy-43b58",
  storageBucket: "ebuy-43b58.appspot.com",
  messagingSenderId: "265017583283",
  appId: "1:265017583283:web:861f68d3fa2599757df2c6"
};

const firebaseApp = initializeApp( firebaseConfig );
export const firebaseAuth = getAuth( firebaseApp );
export const firebaseStore = getFirestore( firebaseApp );

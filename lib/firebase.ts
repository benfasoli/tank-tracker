import 'firebase/auth';
import 'firebase/firestore';

import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAj3gIKycq-kFjM9XCBj7k1uxD0QMHm0WE',
  authDomain: 'tank-tracker-b67e2.firebaseapp.com',
  projectId: 'tank-tracker-b67e2',
  storageBucket: 'tank-tracker-b67e2.appspot.com',
  messagingSenderId: '249460977157',
  appId: '1:249460977157:web:698ce0e3375be77818366c',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const GithubAuthProvider = new firebase.auth.GithubAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

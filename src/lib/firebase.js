import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCcE_4BcHiBx3XQbgHMvwWAyjMxDZG67h8",
  authDomain: "writing-log.firebaseapp.com",
  databaseURL: "https://writing-log.firebaseio.com",
  projectId: "writing-log",
  storageBucket: "writing-log.appspot.com",
  messagingSenderId: "376228979698"
};

firebase.initializeApp(config);

const database = firebase.database()
const auth = firebase.auth()

export { auth, database };

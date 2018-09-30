import * as firebase from 'firebase';

let config = {
  apiKey: "AIzaSyADmkvVmoG48Nyh5vUSc4BkV6nTMiabwwA",
  authDomain: "latoken-test.firebaseapp.com",
  databaseURL: "https://latoken-test.firebaseio.com",
  projectId: "latoken-test",
  storageBucket: "latoken-test.appspot.com",
  messagingSenderId: "204446833942"
};

let app = firebase.initializeApp(config);
let db = app.database();

export default db;

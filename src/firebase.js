import * as firebase from 'firebase';

let config = {
  apiKey: "AIzaSyBFGRw8GdLVtQRtla6crz0tYH1rr4X4TlM",
  authDomain: "test-task-265a3.firebaseapp.com",
  databaseURL: "https://test-task-265a3.firebaseio.com",
  projectId: "test-task-265a3",
  storageBucket: "test-task-265a3.appspot.com",
  messagingSenderId: "244091379835"
};

firebase.initializeApp(config);
firebase.auth();
let db = firebase.app().database().ref()

export default db;

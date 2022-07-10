import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDb21BzgQ17ld2vmCNgeJdd_HQcW7Cw7X0",
  authDomain: "whats-app-panel.firebaseapp.com",
  projectId: "whats-app-panel",
  storageBucket: "whats-app-panel.appspot.com",
  messagingSenderId: "805415784663",
  appId: "1:805415784663:web:75ee6988d1485d4ef9e092",
  measurementId: "G-038YF5QWX7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
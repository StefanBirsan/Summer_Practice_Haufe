import firebase from "firebase/compat";
import 'firebase/compat/storage';
import { getDatabase, ref } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAKAnbrGjhb6LZdrJiW2oCdXMwI1NvGZBM",
    authDomain: "summerpracticehaufe.firebaseapp.com",
    projectId: "summerpracticehaufe",
    storageBucket: "summerpracticehaufe.appspot.com",
    messagingSenderId: "54302484669",
    appId: "1:54302484669:web:edbbfb9cd3db3d4d00efd4",
    measurementId: "G-1PTFTRX9TN",
    databaseURL : "https://summerpracticehaufe-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

const db  = getDatabase( );

const dbRef = ref(db);

export {auth, db, firebase, dbRef};
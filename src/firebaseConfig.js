import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC3_gwjxEWaP2Ld93cDOGCZ31yQhNEgONk",
    authDomain: "whatsap-game.firebaseapp.com",
    projectId: "whatsap-game",
    storageBucket: "whatsap-game.appspot.com",
    messagingSenderId: "782045774153",
    appId: "1:782045774153:web:86bafaaac5aa2853d89a98",
    measurementId: "G-4LTPYZHRLQ"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
export default db;
import firebase from "firebase";

const firebaseConfig = {

	apiKey: "AIzaSyBD-2J5SPDb7s9p16XlhpSn53Tj5gJBfZ0",
    authDomain: "instaapp-6f24c.firebaseapp.com",
    projectId: "instaapp-6f24c",
    storageBucket: "instaapp-6f24c.appspot.com",
    messagingSenderId: "835644354742",
    appId: "1:835644354742:web:744459ebddd47140c37617"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const storage = firebase.storage()

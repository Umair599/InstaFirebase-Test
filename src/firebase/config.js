import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
    apiKey: "AIzaSyCh7l3fxRs_FU6Wl73Nn9JzKPFDG3QR5Zw",
    authDomain: "instagram-939e3.firebaseapp.com",
    projectId: "instagram-939e3",
    storageBucket: "instagram-939e3.appspot.com",
    messagingSenderId: "56594214854",
    appId: "1:56594214854:web:b48771332d290ffb778cc7",
    measurementId: "G-YSV20XTJSR"
  });
export const auth = firebase.auth();

import firebase from "firebase";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpcv3RPOSbgmV49Mkn2sM-144PXig_1WA",
  authDomain: "the-smoking-gun-9108e.firebaseapp.com",
  projectId: "the-smoking-gun-9108e",
  storageBucket: "the-smoking-gun-9108e.appspot.com",
  messagingSenderId: "641197757845",
  appId: "1:641197757845:web:19d41ac0a2736c47db929c",
};
// Initialize Firebase

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}
const fire = firebase;
export default fire;

import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAMptA7G17S74TRa-VxkKLuCJ9pF3GUkYs",
    authDomain: "chatroom-9c550.firebaseapp.com",
    projectId: "chatroom-9c550",
    storageBucket: "chatroom-9c550.appspot.com",
    messagingSenderId: "869986967699",
    appId: "1:869986967699:web:0ac3da3ccb2a0383592d66"
};

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const storage = firebase.storage()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { storage, auth, provider }
export default db
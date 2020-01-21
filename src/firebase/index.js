import firebase from 'firebase/app'
import 'firebase/storage'


// uploading 
let apiKey = process.env.REACT_APP_API_KEY_FIREBASE
var firebaseConfig = {
        apiKey: apiKey,
        authDomain: "mineraliker.firebaseapp.com",
        databaseURL: "https://mineraliker.firebaseio.com",
        projectId: "mineraliker",
        storageBucket: "mineraliker.appspot.com",
        messagingSenderId: "168350008551",
        appId: "1:168350008551:web:ee668267b30079938c4e42"
}

firebase.initializeApp(firebaseConfig)
    
const storage = firebase.storage()

export {
    storage, firebase as default 
}


import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyCINO6vE6Xo2dLHRBaLXP9R5EpukWK7a34",
    authDomain: "studyfind-9417f.firebaseapp.com",
    databaseURL: "https://studyfind-9417f.firebaseio.com",
    projectId: "studyfind-9417f",
    storageBucket: "studyfind-9417f.appspot.com",
    messagingSenderId: "113686500193",
    appId: "1:113686500193:web:96fd0b411c03f5e5766b20"
};
let app = Firebase.initializeApp(config);
export const db = app.database();
export const auth = app.auth()
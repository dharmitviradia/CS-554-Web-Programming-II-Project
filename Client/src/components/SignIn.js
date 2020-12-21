// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import HomePage from './HomePage'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

// Configure Firebase.
const config = {
  apiKey: "AIzaSyA38vkvtEqn6Be0ndC4k99hJdm38qgG8W8",
    authDomain: "stockit-c81bf.firebaseapp.com",
    databaseURL: "https://stockit-c81bf.firebaseio.com",
    projectId: "stockit-c81bf",
    storageBucket: "stockit-c81bf.appspot.com",
    messagingSenderId: "540764074322",
    appId: "1:540764074322:web:4dfba2ea50d9a81ce54a8b",
    measurementId: "G-PM7YDVYQ93"
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

const SignIn = () => {
    return (
      <div className="signIn">
        <h1>Stonk Market</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  
}

export default SignIn;
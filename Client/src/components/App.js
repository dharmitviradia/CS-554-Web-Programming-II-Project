import '../App.css';
import React, { useState, useEffect, useRef } from 'react';
import SignIn from './SignIn'
import Company from './CompanyPage'
import HomePage from './HomePage'
import Profile from './Profile'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import Search from './Search';
import firebase from 'firebase'


function App() {
  
  const[loggedIn,setLoggedIn] = useState(true);

  useEffect(
    ()=>{
    const verifyUser = async () =>{
      await firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           setLoggedIn(true);
           
         } else {
           setLoggedIn(false);
         }
         });
     }
     verifyUser();
    },[]);



    const SignOut = () =>{
      firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        <Redirect to='/sign-in'/>
      }, function(error) {
        console.error('Sign Out Error', error);
      });

    }

    if(loggedIn){
      return (
        <Router>
        <div className="App">
            <Search>Search Bar</Search>
            <button onClick={SignOut}>
              Sign out
            </button>
            </div>
          <div className='App-body'>
              <Route exact path='/' component ={HomePage}></Route>
              <Route exact path='/company-page' component ={Company}></Route>
              <Route exact path='/company-page/:id' component ={Company}></Route>
              <Route exact path='/profile' component={Profile}></Route>
          </div>
          
        </Router>
        
      )
    } else{
      return(
        <div>
          <Router>
          <Route exact path='/sign-in' component ={SignIn}></Route>
          <Redirect to='/sign-in'/>
            </Router>
        </div>
      )
    }
}

export default App;

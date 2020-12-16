import '../App.css';
import React, { useState, useEffect, useRef } from 'react';
import SignIn from '../components/SignIn'
import Company from '../components/CompanyPage'
import HomePage from '../components/HomePage'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import Search from './Seach';
import firebase from 'firebase'
import stocks from '../data/stocks'


function App() {

  
  
  const addStocks = async () =>{
    let obj = await stocks.addStocks();
      if(!obj || obj.size() === 0) obj = "This is an empty string";
      console.log(obj);
  }
  

  
  addStocks();
  
  const[loggedIn,setLoggedIn] = useState(false);

  const verifyUser = async () =>{
   await firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setLoggedIn(true);
        
      } else {
        setLoggedIn(false);
      }
      });
  }


    const SignOut = () =>{
      firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        <Redirect to='/sign-in'/>
      }, function(error) {
        console.error('Sign Out Error', error);
      });

    }

    verifyUser();

    if(loggedIn){
      return (
        <Router>
        <div className="App">

        
          <Link className='showlink' to='/'>
              Home
          </Link>
            <br></br>
          <Link className='showlink' to="/company-page">
              CompanyPage
          </Link>
            <Search>Search Bar</Search>
            <button onClick={SignOut}>
              Sign out
            </button>
            </div>
          <div className='App-body'>
              <Route exact path='/' component ={HomePage}></Route>
              <Route exact path='/company-page' component ={Company}></Route>
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

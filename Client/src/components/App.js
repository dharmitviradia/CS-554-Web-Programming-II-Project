import '../App.css';
import React, { useState, useEffect, useRef } from 'react';
import SignIn from './SignIn';
import Company from './CompanyPage';
import MarketNews from './MarketNews';
import Ipo from './Ipo';
import HomePage from './HomePage';
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom';
import Search from './Search';
import { Alert } from '@material-ui/lab';
import firebase from 'firebase';

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
          <nav id="navbar" class="">
            <div class="nav-wrapper">
              <div class="logo">
                <a href="#home"><i class="fas fa-chess-knight"></i>Stonk Market</a>
              </div>

              <ul id="menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/company-page/AAPL" id="AAPL">Stocks</Link></li>
                <li><Link to="/market-news">Market News</Link></li>
                <li><Link to="/ipo">IPO</Link></li>
                <li><button className="button" onClick={SignOut}>Sign Out</button></li>
              </ul>

              {/* <Search>Search Bar</Search> */}
            </div>
          </nav>
        </div>

        <div className='App-body'>
          <Switch>
            <Route exact path='/' component={HomePage}></Route>
            <Route exact path='/company-page/:id' component={Company}></Route>

            <Route exact path="/market-news" component={MarketNews}></Route>

            <Route exact path="/ipo" component={Ipo}></Route>

            <Route path="*" component={Error404} />
          </Switch>
          
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

function Error404() {
  return (
    <Alert severity="error" className="alert error">
      404: Resource Not Found
    </Alert>
  )
}

export default App;

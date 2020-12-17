import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const SignIn = () => {
  
    return (
      <div>
        <h1>You've Signed In</h1>
        <p>Sucessfully</p>
          <Link to='/company-page'>Company Page</Link>
      </div>
      
    );
  
}

export default SignIn;
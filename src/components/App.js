import '../App.css';
import SignIn from '../components/SignIn'
import HomePage from '../components/HomePage'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      
      <Router>
        <Route exact path='/sign-in' component ={SignIn}></Route>
        <Route exact path='/home-page' component ={HomePage}></Route>
      </Router>

    </div>
  );
}

export default App;

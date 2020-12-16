import '../App.css';
import SignIn from '../components/SignIn'
import HomePage from '../components/HomePage'
import Profile from '../components/Profile'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">

      <Router>
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/sign-in' component={SignIn}></Route>
        <Route exact path='/profile' component={Profile}></Route>
      </Router>

    </div>
  );
}

export default App;

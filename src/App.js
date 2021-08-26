import './App.css';
import Homepage from './Components/HomePage/Homepage';
import Login from './Components/Login/Login';
import Signup from './Components/SignUp/Signup';
import {
  BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useState} from "react"

function App() {

  const [ user, setLoginUser] = useState({})

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id ? <Homepage /> : <Login />
            }
          </Route>
          <Route path="/login"><Login setLoginUser={setLoginUser}/></Route>
          <Route path="/signup"><Signup /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

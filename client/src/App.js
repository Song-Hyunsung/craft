import React, { Component } from 'react';
import { Link, Route, Redirect, Switch} from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import Project from './Project';
//import  from './';
// profile/userid (this is where all projects are shown)
// profile/userid/project_id

class App extends Component {
  render() {
    let isLoggedIn = sessionStorage.getItem('loggedIn') == "true";
    return (
      <div className="App">
        <div className="craft-navbar">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Craft Home</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
                { !isLoggedIn ? (
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Log In</Link>
                    </li>
                  ) : (
                    <div>
                      <li className="nav-item">
                        <Link className="nav-link" to="#">Hello {sessionStorage.getItem('username')}</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/profile/" + sessionStorage.getItem('id')}>Profile</Link>
                      </li>
                    </div>
                  )                    
                }
              </ul>
            </div>
          </nav>
        </div>
        <div className="main-content">
        <Switch>
          <Route exact={true} path="/" component={Home}/>
          <Route exact={true} path="/signup" component={Signup}/>
          <Route exact={true} path="/login" component={Login}/>
          <Route exact={true} path="/profile/:userid" component={Profile}/>
          <Route exact={true} path="/profile/:userid/:projectid" component={Project}/>
          </Switch>
        </div>


      </div>
    );
  }
}

export default App;

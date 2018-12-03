import React, { Component } from 'react';
import { 
    Link,
    BrowserRouter as Router,
    Route,
    Redirect, 
    Switch,
    withRouter
  } from 'react-router-dom';
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
      <Router>
      <div className="App">
        <div className="craft-navbar">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/" className="navbar-brand">Craft Home</Link> 
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">Sign Up</Link>
                </li>
                { !isLoggedIn ? (
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">Log In</Link>
                    </li>
                  ) : (
                    <div>
                      <li className="nav-item">
                        <Link to="#" className="nav-link">Hello {sessionStorage.getItem('username')}</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/profile/" + sessionStorage.getItem('id')} className="nav-link">Profile</Link>
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
              <Route exact path="/" component={Home}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/login" component={Login}/>
              <Route path="/profile/:userid" component={Profile}/>
              <Route path="/profile/:userid/:projectid" component={Project}/>
          </Switch>
          </div>

        {/*
        <div className="main-content">
        <Router>
          <Switch>
          <Route exact={true} path="/" component={Home}/>
          <Route exact={true} path="/signup" component={Signup}/>
          <Route exact={true} path="/login" component={Login}/>
          <Route exact={true} path="/profile/:userid" component={Profile}/>
          <Route exact={true} path="/profile/:userid/:projectid" component={Project}/>
          </Switch>
          </Router>
        </div>
        */}

      </div>
      </Router>
    );
  }
}

export default App;
import React, { Component } from 'react';
import { Link, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import ProjectList from './ProjectList';
import TaskList from './TaskList';

export default class App extends Component {

  logout() {
    sessionStorage.clear();
  }

  render() {
    let isLoggedIn = sessionStorage.getItem('loggedIn') === "true";

    return (
      <div className="App">
        <div className="craft-navbar">
          <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <div className="collapse navbar-collapse" id="navbarNav">
                { !isLoggedIn ? ( //Navbar if user not logged in
                  <div>
                    <span className="nav navbar-brand navbar-left">Welcome guest! Log in or sign up to start Crafting!</span>
                      <ul className="nav navbar-nav navbar-right">
                        <li><Link className="nav-link" to={"/login/"}>Log In</Link></li>
                        <li><Link className="nav-link" to={"/signup/"}>Sign Up</Link></li>
                      </ul>
                  </div>
                  ) : ( //Navbar if user is logged in
                    <div>
                      <span className="nav navbar-brand navbar-left">Hello, {sessionStorage.getItem('username')}!</span>
                      <ul className="nav navbar-nav navbar-right">
                        <li><Link className="nav-link" to={"/profile/" + sessionStorage.getItem('id')}>Profile</Link></li>
                        <li><Link className="nav-link" onClick={() => {this.logout();}} to="/">Log Out</Link></li>
                      </ul>
                    </div>
                  )                    
                }
            </div>
          </nav>
        </div>

        <div className="main-content">
        <Switch>
          <Route exact={true} path="/" component={Home}/>
          <Route exact={true} path="/signup" component={Signup}/>
          <Route exact={true} path="/login" component={Login}/>
          <Route exact={true} path="/profile/:userid" component={ProjectList}/>
          <Route exact={true} path="/profile/:userid/:projectid" component={TaskList}/>
          </Switch>
        </div>


      </div>
    );
  }
}
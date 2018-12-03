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
  constructor(props) {
      super(props);
  }

  logout() {
    sessionStorage.clear();
  }

  render() {
    let isLoggedIn = sessionStorage.getItem('loggedIn') == "true";

    return (
      <div className="App">
        <div className="craft-navbar">
          <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <div className="collapse navbar-collapse" id="navbarNav">
                { !isLoggedIn ? ( //Navbar if user not logged in
                  <div>
                    <span className="nav navbar-brand navbar-left">Welcome! Please <Link className="nav-link" id="inline" to="/login">Log In</Link> or <Link className="nav-link" id="inline" to="/signup">Sign Up</Link>.</span>
                    </div>
                  ) : ( //Navbar if user is logged in
                    <div>
                      <span className="nav navbar-brand navbar-left">Hello, {sessionStorage.getItem('username')}!</span>
                      <ul className="nav navbar-nav navbar-right">
                        <li><Link className="nav-link" to={"/profile/" + sessionStorage.getItem('id')}>Profile</Link></li>
                        <li><Link className="nav-link" onClick={() => {   this.logout();}} to="/">Log Out</Link></li>
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
          <Route exact={true} path="/profile/:userid" component={Profile}/>
          <Route exact={true} path="/profile/:userid/:projectid" component={Project}/>
          </Switch>
        </div>


      </div>
    );
  }
}

export default App;
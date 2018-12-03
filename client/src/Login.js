import React, { Component } from "react";
import { PageHeader, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isloggedIn: false,
    };
  };

  usernameChanged = (event) => {
    this.setState({ username: event.target.value });
  }

  passwordChanged = (event) => {
    this.setState({ password: event.target.value });
  }

  handleLogin = (event) => {
    if(event === "true"){
      this.setState({ isloggedIn: true });
    }
  }

  login = () => {
    authenticationObject.authenticate(this.state.username, this.state.password, this.handleLogin);
  }

  render() {

    if(this.state.isloggedIn){
      return <Redirect to={"/profile/" + sessionStorage.getItem('id')} />;
    }

    return (
      <div>
        <PageHeader><center>Login</center></PageHeader>
        <div className="Login">
          <input type="text" placeholder="Username" value={this.state.username} onChange={this.usernameChanged} />
          <input type="text" placeholder="Password" value={this.state.password} onChange={this.passwordChanged} />
          <button onClick={this.login}> Log in </button>
        </div>
      </div>
    );
  }
}

const authenticationObject = {
  authenticate(username, password, cb){
    fetch('/api/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then(response => {
      if(response.status === 200){
        console.log("Correct Credentials");
        return response.json();
      } 
    }).then(body => {
      console.log(body.username);
      console.log(body.id);
      sessionStorage.setItem('id', body.id);
      sessionStorage.setItem('username', body.username);
      sessionStorage.setItem('loggedIn', "true");
      cb(sessionStorage.getItem('loggedIn'));
    }).catch(() => {
      console.log("Wrong Credentials");
      cb(sessionStorage.getItem('loggedIn'));
    })
  },
}
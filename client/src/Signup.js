import React, { Component } from "react";
import { PageHeader, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: " ",
      password: " ",
      isRegistered: false,
    };
  };

  usernameChanged = (event) => {
    this.setState({ username: event.target.value });
  }

  passwordChanged = (event) => {
    this.setState({ password: event.target.value });
  }


  handleRegister = (event) => {
    if(event === "true"){
      this.setState({ isRegistered: true });
    }
  }


  /*
  handleSubmit = (event) => {
      event.preventDefault();
      this.setState({
        username: event.target.value,
        password: event.target.value,
        isRegistered: true,
        })
      console.log(this.state)  
  }
*/  

  register = () => {
      authenticationObject.authenticate(this.state.username, this.state.password, this.handleRegister)
  }
   /* We are Registering.
  login = () => {
    authenticationObject.authenticate(this.state.username, this.state.password, this.handleLogin);
  }
  */ 
        /*
      return <Redirect to={"/profile/" + sessionStorage.getItem('id')} />;
      */


  render() {

    if(this.state.isRegistered){
        return <Redirect to={"/profile/" + sessionStorage.getItem('id')} />;
    }
    return (
      <div>
        <PageHeader><center>Register</center></PageHeader>
        <div className="Register">
                Username: <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.usernameChanged} />
                <br />
                Password: <input type="text" name="Password" placeholder="Password" value={this.state.password} onChange={this.passwordChanged} />
                <br />
                <button onClick={this.register}> Submit </button>
            {/*
                <input type="text" placeholder="Username" value={this.state.username} onChange={this.usernameChanged} />
                <input type="text" placeholder="Password" value={this.state.password} onChange={this.passwordChanged} />
                <button onClick={this.register}> Sign up  </button>
            */}
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
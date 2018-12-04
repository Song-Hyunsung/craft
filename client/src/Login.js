import React, { Component } from "react";
import { PageHeader, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Redirect } from "react-router-dom";
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
  }

  handleLogin = (event) => {
    if(event === "true"){
      this.setState({ isloggedIn: true });
    }
  }

  login = () => {
    this.authenticate(this.state.username, this.state.password, this.handleLogin);
  }

  render() {
    if(this.state.isloggedIn){
      return <Redirect to={"/profile/" + sessionStorage.getItem('id')} />;
    }

    return (
      <div>
        <PageHeader><center>Log In</center></PageHeader>
        <div className="Login">

          <form>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.username}
                onChange={this.usernameChanged}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={this.state.password}
                onChange={this.passwordChanged}
                type="password"
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              onClick={this.login}
            >
              Log In
            </Button>
          </form>
        </div>
      </div>


    );
  }
}



















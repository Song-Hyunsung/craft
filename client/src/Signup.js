import React from 'react';
import { PageHeader, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./Login.css";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isloggedIn: false,
    };
  }

  usernameChanged = (event) => {
    this.setState({ username: event.target.value });
  }

  passwordChanged = (event) => {
    this.setState({ password: event.target.value });
  }

  createNewUser(username, password, cb){
   fetch('/api/signup', {
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
       console.log("Creating new user");
       console.log(response);
       return response.json();
     } 
   }).then(body => {
     console.log(body.username);
     console.log(body.id);
     cb();
   }).catch(() => {
     console.log("Error creating user");
	 cb();
   })
  }

  handleSignUp = () => {
      this.setState({ isloggedIn: true });
  }

  signup = () => {
    this.createNewUser(this.state.username, this.state.password, this.handleSignUp);
  }


  render() {
    if(this.state.isloggedIn){
      return <Redirect to={"/login"} />;
    }

    return (
      <div>
        <PageHeader><center>Sign Up</center></PageHeader>
        <div className="Login">

          <form>
            <FormGroup controlId="username" bsSize="large">
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
              onClick={this.signup}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>


    );
  }
}
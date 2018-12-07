import React, {Component } from 'react';
import { PageHeader, Well } from "react-bootstrap";

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userID: ' ',
      project: [],
    }
  }

  componentWillMount() {
    fetch('/api/profile/' + sessionStorage.getItem('id'), {
			method: 'GET',
			headers: {
				"Content-Type" : "application/json; charset=utf-8",
			},
		}).then(response => {
			return response.json();
		}).then(body => {
			this.setState({ projects: body.project });
		}).catch(() => {
			console.log("Error retreving projects");
		})
  }
}

/*
const Profile = (props) => (
  <div>
    <PageHeader><center>Hello, User {props.match.params.userid}</center></PageHeader>
  </div>
);
*/
export default Profile;
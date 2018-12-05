import React, { Component } from 'react';
import Project from './Project'
import ProjectForm from './ProjectForm'
import { PageHeader } from "react-bootstrap";
import "./ProjectList.css";

class ProjectList extends Component {
	constructor(props){
		super(props);

		this.state = {
			projects: [],
			showPopup: false,
		};
	};


	// This is react function, that pre-configures states, so only calls once setState.
	componentWillMount(){
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
			console.log("Error retrieving projects");
		})
	}

	togglePopup = (event) => {
		this.setState({
			showPopup: !this.state.showPopup
		});
	}

	render(){
		let renderedProjects = this.state.projects.map((prj, index) => {
			return(
				<Project key={prj.id} {...prj} />
			)
		})

	   	return(
	   		<div>
	   			<PageHeader><center>{sessionStorage.getItem('username')}'s Projects</center></PageHeader>
	   			<button onClick={() => this.togglePopup()}>Add New Project</button>
	   			{this.state.showPopup ?
	   				<ProjectForm
	   					type='Add'
	   					closePopup={() => this.togglePopup()}
	   				/> : null
	   			}
	   			<div id="content-margin">
	   				{renderedProjects.length > 0 ? renderedProjects : <div><center>You have no projects to display!</center></div>}
	   			</div>
	   		</div>
		)
	}
}

export default ProjectList;
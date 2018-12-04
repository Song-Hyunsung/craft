import React, { Component } from 'react';
import Project from './Project'

class ProjectList extends Component {
	constructor(props){
		super(props);

		this.state = {
			projects: []
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
			console.log("Error retreving projects");
		})
	}

	render(){
		let renderedProjects = this.state.projects.map((prj, index) => {
			return(
				<Project key={prj.id} {...prj} />
			)
		})

	   	return(
	   		<div>
	   			<h1> Projects for {sessionStorage.getItem('username')} </h1>
	   			{renderedProjects}
	   		</div>
		)
	}
}

export default ProjectList;
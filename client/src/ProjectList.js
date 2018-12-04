import React, { Component } from 'react';
import Project from './Project'

class ProjectList extends Component {
	constructor(props){
		super(props);

		this.state = {
			projects: [null]
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
			console.log(response);
			return response.json();
		}).then(body => {
			console.log(body.project);
			this.setState({ projects: body.project });
		}).catch(() => {
			console.log("Error retreving projects");
		})
	}

	render(){
		let renderedProjects = this.state.projects.map((prj, index) => {
			console.log(prj);
			if(prj === null){
				return(
					<p key={index}> Loading Projects </p>
				)
			} else {
				return(
					<Project key={index} {...prj} />
				)
			}

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
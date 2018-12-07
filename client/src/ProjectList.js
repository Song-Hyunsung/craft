import React, { Component } from 'react';
import Project from './Project'
import { PageHeader } from "react-bootstrap";
import "./ProjectList.css";
import { createSecureContext } from 'tls';

class ProjectList extends Component {a
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
        let renderedProjects = this.state.projects
        if (renderedProjects != null) {
            renderedProjects.map((prj,index) => {
                return (<Project key = {prj.id} {...prj} />)
            })
        }

        /*
		let renderedProjects = this.state.projects.map((prj, index) => {
            if
			return(
				<Project key={prj.id} {...prj} />
			)
        })
        */
		const userSession = sessionStorage.getItem('username')
		let currentSession;
		if (userSession !== null) {
			 currentSession = userSession + ' Projects';
		}
		else {
			currentSession = 'Hello Guest!'
		}

	   	return(
	   		<div>
                   <PageHeader><center>
                   <h2>{currentSession}</h2>
                    </center></PageHeader>
	   			<div id="content-margin">
	   				{renderedProjects != null ? renderedProjects : <div><center>You have no projects to display!</center></div>}
	   			</div>
	   		</div>
		)
	}
}
export default ProjectList;
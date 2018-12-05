import React, { Component } from 'react'
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProjectForm from './ProjectForm'
import "./Project.css";

class Project extends Component {
	constructor(props){
		super(props);

		this.state = {
			userId: null,
			projectId: null,
			projectTitle: null,
			projectDescription: null,
			createdAt: null,
			updatedAt: null,
			showPopup: false,
		}
	}

	componentWillMount(){
		const {UserId, createdAt, id, projectDescription, projectTitle, updatedAt} = this.props;
		this.setState({
			userId: UserId,
			projectId: id,
			projectTitle: projectTitle,
			projectDescription: projectDescription,
			createdAt: createdAt,
			updatedAt: updatedAt
		})
	}

	deleteProject(cb){
		fetch('/api/profile/' + sessionStorage.getItem('id') + '/' + this.state.projectId, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
		}).then(response => {
			if(response.status === 200){
				console.log("Succesfully deleted project");
			}
		}).then(() => {
			cb();
		}).catch(() => {
			console.log("Error deleting project");
			cb();
		})
	}

	refreshPage(){
		window.location.reload();
	}

	togglePopup = (event) => {
		this.setState({
			showPopup: !this.state.showPopup
		});
	}

	render(){
		return(
			<Panel>
				<Panel.Heading>
					<Link to={"/profile/" + this.state.userId + "/" + this.state.projectId}>
						<b>Project Title: {this.state.projectTitle}</b>
					</Link>
				</Panel.Heading>
				<Panel.Body>
					<b>Project ID</b>: {this.state.projectId} <br />
					<b>Created at</b>: {this.state.createdAt} <br />
					<b>Associated User ID</b>: {this.state.userId} <br />
					<b>Project Description</b>: {this.state.projectDescription} <br />
				</Panel.Body>
 				<Panel.Footer>
 					<i>Last updated: {this.state.updatedAt}</i>
 					<button onClick={() => this.deleteProject(this.refreshPage)}>Delete project</button>
	 	   			<button onClick={() => this.togglePopup()}>Update Project</button>
		   			{this.state.showPopup ?
		   				<ProjectForm
		   					type='Update'
		   					updateProjectId={this.state.projectId}
		   					closePopup={() => this.togglePopup()}
		   					pastTitle={this.state.projectTitle}
		   					pastDescription={this.state.projectDescription}
		   				/> : null
		   			}
 				</Panel.Footer>
			</Panel>
		)
	}
}

export default Project;
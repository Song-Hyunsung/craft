import React, { Component } from 'react'
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import { Button } from 'muicss/react';

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
			projectArchived: null,
			showPopup: false,
		}
	}

	componentWillMount(){
		const {UserId, createdAt, id, projectDescription, projectTitle, updatedAt, projectArchived} = this.props;
		this.setState({
			userId: UserId,
			projectId: id,
			projectTitle: projectTitle,
			projectDescription: projectDescription,
			createdAt: createdAt,
			updatedAt: updatedAt,
			projectArchived: projectArchived,
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

	archiveProject(cb){
		fetch('/api/profile/' + sessionStorage.getItem('id') + '/' + this.state.projectId, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify({
				projectTitle: this.state.projectTitle,
				projectDescription: this.state.projectDescription,
				projectArchived: !this.state.projectArchived,
			}),
		}).then(response => {
			if(response.status === 200){
				console.log("Archiving Project");
				return response.json();
			}
		}).then(body => {
			cb();
		}).catch(() => {
			console.log("Error archiving project");
		})
	}

	handleArchive = () => {
		this.setState({
			projectArchived: true,
		});
		this.refreshPage();
	}

	handleUnarchive = () => {
		this.setState({
			projectArchived: false,
		})
		this.refreshPage();
	}

	refreshPage = () => {
		window.location.reload();
	}

	togglePopup = (event) => {
		this.setState({
			showPopup: !this.state.showPopup
		});
	}

	render(){
		return(
			<div>
			<Panel>
				<Panel.Heading>
					<Link to={"/profile/" + this.state.userId + "/" + this.state.projectId}>
						<b>Project Title: {this.state.projectTitle}</b>
					</Link>
				</Panel.Heading>
				<Panel.Body>
					<b>Project ID</b>: {this.state.projectId} <br />
					<b>Associated User ID</b>: {this.state.userId} <br />
					<b>Created at</b>: {this.state.createdAt} <br />
					<b>Last updated at</b>: {this.state.updatedAt} <br />
					<b>Project Description</b>: {this.state.projectDescription} <br />
				</Panel.Body>
 				<Panel.Footer>
 					{!this.state.projectArchived ?
 						<div>
 						<Button variant="raised" size="small"onClick={() => this.togglePopup()}>Update Project</Button>
 						<Button variant="raised" color="primary" size="small" onClick={() => this.archiveProject(this.handleArchive)}>Archive Project</Button>
 						</div>
 						:
 						<Button variant="raised" color="primary" size="small" onClick={() => this.archiveProject(this.handleUnarchive)}>Unarchive Project</Button>
 					}
 					<Button variant="raised" color="danger" size="small" onClick={() => this.deleteProject(this.refreshPage)}>Delete this project</Button>
		   			{this.state.showPopup ?
		   				<ProjectForm
		   					type='Update'
		   					updateProjectId={this.state.projectId}
		   					updateArchive={this.state.projectArchived}
		   					closePopup={() => this.togglePopup()}
		   					pastTitle={this.state.projectTitle}
		   					pastDescription={this.state.projectDescription}
		   				/> : null
		   			}
 				</Panel.Footer>
			</Panel>
			</div>
		)
	}
}

export default Project;
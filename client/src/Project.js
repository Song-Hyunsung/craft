import React, { Component } from 'react'
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import { Button } from 'muicss/react';
import ProjectDeletePrompt from './ProjectDeletePrompt';

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
			showDeletePrompt: false,
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

	toggleDeletePrompt = (event) => {
		this.setState({
			showDeletePrompt: !this.state.showDeletePrompt
		});
	}

	render(){
		return(
			<div>
			<Panel>
				<Panel.Heading>
					<Link to={"/profile/" + this.state.userId + "/" + this.state.projectId}>
						<b>{this.state.projectTitle}</b>
					</Link>
				</Panel.Heading>
				<Panel.Body>
					<div>{this.state.projectDescription} </div>
					<br/>
					<div className="showTime">Last updated at: {new Date(this.state.updatedAt).toLocaleString()} </div>
				</Panel.Body>
 				<Panel.Footer>
 					{!this.state.projectArchived ?
 						<span>
 						<Button variant="raised" size="small"onClick={() => this.togglePopup()}>Update</Button>
 						<Button variant="raised" color="primary" size="small" onClick={() => this.archiveProject(this.handleArchive)}>Archive</Button>
 						</span>
 						:
 						<Button variant="raised" color="primary" size="small" onClick={() => this.archiveProject(this.handleUnarchive)}>Unarchive</Button>
 					} {' '}
 					<Button variant="raised" color="danger" size="small" onClick={() => this.toggleDeletePrompt()}>Delete</Button>
 					{this.state.showDeletePrompt ?
		   				<ProjectDeletePrompt
		   					deleteProjectId={this.state.projectId}
		   					deleteProjectTitle={this.state.projectTitle}
		   					closePopup={() => this.toggleDeletePrompt()}
		   				/> : null
		   			}
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
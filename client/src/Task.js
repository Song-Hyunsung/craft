import React, { Component } from 'react'
import { Panel } from 'react-bootstrap';
import TaskForm from './TaskForm';
import { Button } from 'muicss/react';
import TaskDeletePrompt from './TaskDeletePrompt';

class Task extends Component {
	constructor(props){
		super(props);

		this.state = {
			projectId: null,
			taskId: null,
			taskTitle: null,
			taskDescription: null,
			createdAt: null,
			updatedAt: null,
			taskCompleted: null,
			showPopup: false,
			showDeletePrompt: false,
		}
	}

	componentWillMount(){
		const {ProjectId, createdAt, id, taskDescription, taskTitle, updatedAt, taskCompleted} = this.props;
		this.setState({
			projectId: ProjectId,
			taskId: id,
			taskTitle: taskTitle,
			taskDescription: taskDescription,
			createdAt: createdAt,
			updatedAt: updatedAt,
			taskCompleted: taskCompleted,
		})
	}

	completeTask(cb){
		fetch('/api/profile/' + sessionStorage.getItem('id') + '/' + this.state.projectId + '/' + this.state.taskId, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify({
				taskTitle: this.state.taskTitle,
				taskDescription: this.state.taskDescription,
				taskCompleted: !this.state.taskCompleted,
			}),
		}).then(response => {
			if(response.status === 200){
				console.log("Completing Task");
				return response.json();
			}
		}).then(body => {
			cb();
		}).catch(() => {
			console.log("Error completing Task");
		})
	}

	refreshPage(){
		window.location.reload();
	}

	handleComplete = () => {
		this.setState({
			taskCompleted: true,
		});
		this.refreshPage();
	}

	handleUncomplete = () => {
		this.setState({
			taskCompleted: false,
		});
		this.refreshPage();
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
			<Panel>
				<Panel.Heading><b>Task: {this.state.taskTitle}</b></Panel.Heading>
				<Panel.Body>
					<b>Task ID</b>: {this.state.taskId} <br />
					<b>Associated Project ID</b>: {this.state.projectId} <br />
					<b>Created at</b>: {this.state.createdAt} <br />
					<b>Last updated at</b>: {this.state.updatedAt} <br />
					<b>Task Description</b>: {this.state.taskDescription} <br />
				</Panel.Body>
				{!this.props.projectArchived ? 
 				<Panel.Footer>
 					{!this.state.taskCompleted ?
 					<span>
 					<Button variant="raised" size="small" onClick={() => this.togglePopup()}>Update Task</Button>
 					<Button variant="raised" color="primary" size="small" onClick={() => this.completeTask(this.handleComplete)}>Complete Task</Button>
 					</span>
 					:
 					<Button variant="raised" color="primary" size="small" onClick={() => this.completeTask(this.handleUncomplete)}>Work on this task again</Button> 
 					} {' '}
 					<Button variant="raised" color="danger" size="small" onClick={() => this.toggleDeletePrompt()}>Delete this task</Button>
 					{this.state.showDeletePrompt ?
		   				<TaskDeletePrompt
		   					deleteProjectId={this.state.projectId}
		   					deleteTaskId={this.state.taskId}
		   					deleteTaskTitle={this.state.taskTitle}
		   					closePopup={() => this.toggleDeletePrompt()}
		   				/> : null
		   			}
		   			{this.state.showPopup ?
		   				<TaskForm
		   					type='Update'
		   					updateProjectId={this.state.projectId}
		   					updateTaskId={this.state.taskId}
		   					updateComplete={this.state.taskCompleted}
		   					pastTitle={this.state.taskTitle}
 		   					pastDescription={this.state.taskDescription}
		   					closePopup={() => this.togglePopup()}
		   				/> : null
		   			}
 				</Panel.Footer>
 				: null
 				}
			</Panel>
		)
	}
}

export default Task;
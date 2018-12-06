import React, { Component } from 'react'
import { Panel } from 'react-bootstrap';
import TaskForm from './TaskForm';
import { Button } from 'muicss/react';

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
			showPopup: false,
		}
	}

	componentWillMount(){
		const {ProjectId, createdAt, id, taskDescription, taskTitle, updatedAt} = this.props;
		this.setState({
			projectId: ProjectId,
			taskId: id,
			taskTitle: taskTitle,
			taskDescription: taskDescription,
			createdAt: createdAt,
			updatedAt: updatedAt
		})
	}

	deleteTask(cb){
		fetch('/api/profile/' + sessionStorage.getItem('id') + '/' + this.state.projectId + '/' + this.state.taskId, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
		}).then(response => {
			if(response.status === 200){
				console.log("Succesfully deleted task");
			}
		}).then(() => {
			cb();
		}).catch(() => {
			console.log("Error deleting task");
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
				<Panel.Heading><b>Task: {this.state.taskTitle}</b></Panel.Heading>
				<Panel.Body>
					<b>Task ID</b>: {this.state.taskId} <br />
					<b>Associated Project ID</b>: {this.state.projectId} <br />
					<b>Created at</b>: {this.state.createdAt} <br />
					<b>Last updated at</b>: {this.state.updatedAt} <br />
					<b>Task Description</b>: {this.state.taskDescription} <br />
				</Panel.Body>
 				<Panel.Footer>
 					<Button variant="raised" size="small" onClick={() => this.togglePopup()}>Update Task</Button>
 					<Button variant="raised" color="primary" size="small" disabled={true}>Complete Task</Button>
 					<Button variant="raised" color="danger" size="small" onClick={() => this.deleteTask(this.refreshPage)}>Delete this task</Button>
		   			{this.state.showPopup ?
		   				<TaskForm
		   					type='Update'
		   					updateProjectId={this.state.projectId}
		   					updateTaskId={this.state.taskId}
		   					pastTitle={this.state.taskTitle}
 		   					pastDescription={this.state.taskDescription}
		   					closePopup={() => this.togglePopup()}
		   				/> : null
		   			}
 				</Panel.Footer>
			</Panel>
		)
	}
}

export default Task;
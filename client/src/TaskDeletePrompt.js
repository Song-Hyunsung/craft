import React, { Component } from 'react'
import { Modal } from "react-bootstrap";
import { Form, Input, Button } from 'muicss/react';
import { Redirect } from "react-router-dom";

class ProjectDeletePrompt extends Component {
	constructor(props){
		super(props);

		this.state = {
			projectId: null,
			taskId: null,
			taskTitle: null,
		}
	}

	componentWillMount(){
		const {deleteProjectId, deleteTaskId, deleteTaskTitle} = this.props;
		this.setState({
			projectId: deleteProjectId,
			taskId: deleteTaskId,
			taskTitle: deleteTaskTitle,
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

	refreshPage = () => {
		window.location.reload();
	}

	render(){
		return(

			<div>
				<Modal show={true}>
		          <Modal.Header>
		            <Modal.Title>
		              Delete Task
		            </Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		            Are you sure you want to delete {' '}
		            "<b>{this.state.taskTitle}</b>"?
		            <br />
		            <font color="red">This action cannot be undone.</font>
		          </Modal.Body>
		          <Modal.Footer>
		          <Button variant="raised" color="danger" onClick={() => this.deleteTask(this.refreshPage)}>Yes, Delete this task</Button>
			          <div>
		            <Button variant="raised" onClick={this.props.closePopup}>No, Cancel</Button>
		            </div>
		          </Modal.Footer>
		        </Modal>
	        </div>

	        
		)
	}
}

export default ProjectDeletePrompt;
import React, { Component } from 'react'
import { Modal } from "react-bootstrap";
import { Form, Input, Button } from 'muicss/react';

class TaskForm extends Component {
	constructor(props){
		super(props);

		this.state = {
			title: "",
			description: "",
			taskCompleted: null,
			done: false,
		}
	}

	componentWillMount(){
 		if(this.props.type === "Update"){
 			this.setState({
 				title: this.props.pastTitle,
 				description: this.props.pastDescription,
 				taskCompleted: this.props.updateComplete,
 			})
 		}
 	}

	titleChanged = (event) => {
		this.setState({ title: event.target.value });
	}

	descriptionChanged = (event) => {
		this.setState({ description: event.target.value });
	}

	addNewTask(cb){
		fetch('/api/profile/' + sessionStorage.getItem('id') + '/' + this.props.projectId, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify({
				taskTitle: this.state.title,
				taskDescription: this.state.description,
			}),
		}).then(response => {
			if(response.status === 200){
				console.log("Creating New Task");
				return response.json();
			}
		}).then(body => {
			cb();
		}).catch(() => {
			console.log("Error creating new Task");
		})
	}

	updateTask(cb){
		fetch('/api/profile/' + sessionStorage.getItem('id') + '/' + this.props.updateProjectId + '/' + this.props.updateTaskId, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify({
				taskTitle: this.state.title,
				taskDescription: this.state.description,
				taskCompleted: this.state.taskCompleted,
			}),
		}).then(response => {
			if(response.status === 200){
				console.log("Updating Task");
				return response.json();
			}
		}).then(body => {
			cb();
		}).catch(() => {
			console.log("Error updating Task");
		})
	}

	handleSubmit = () => {
		this.setState({
			done: true,
		})
		window.location.reload();
	}

	handleUpdate = () => {
		window.location.reload();
	}

	submit = () => {
		this.addNewTask(this.handleSubmit);
	}

	update = () => {
		this.updateTask(this.handleUpdate);
	}

	render(){

		return(

			<div>
				<Modal show={true}>
		          <Modal.Header>
		            <Modal.Title>
		              {this.props.type} Task
		            </Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		            <Form>
		            	<Input label="Task Title" onChange={this.titleChanged} defaultValue={this.state.title} />
        				<Input label="Task Description" onChange={this.descriptionChanged} defaultValue={this.state.description} />
		            </Form>
		          </Modal.Body>
		          <Modal.Footer>
		          	<div>
			          { this.props.type === "Add" ?
			              <Button
			                variant="raised" color="primary"
			                onClick={() => this.submit()}
			              >
			                Add
			              </Button>
			              :
			              <Button
			                variant="raised" color="primary"
			                onClick={() => this.update()}
			              >
			                Update
			              </Button>
			           }
			          </div>
			          <div>
		            <Button variant="raised" onClick={this.props.closePopup}>Close</Button>
		            </div>
		          </Modal.Footer>
		        </Modal>
	        </div>
		)
	}
}

export default TaskForm;
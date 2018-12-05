import React, { Component } from 'react'
import { PageHeader, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./ProjectForm.css";

class TaskForm extends Component {
	constructor(props){
		super(props);

		this.state = {
			title: "",
			description: "",
			done: false,
		}
	}

	componentWillMount(){
		if(this.props.type === "Update"){
			this.setState({
				title: this.props.pastTitle,
				description: this.props.pastDescription
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
	        <div className='popup'>
	          <PageHeader><center>{this.props.type} Task</center></PageHeader>
	          <div className="Login">

	            <form>
	              <FormGroup controlId="title" bsSize="large">
	                <ControlLabel>Title</ControlLabel>
	                <FormControl
	                  autoFocus
	                  type="text"
	                  value={this.state.title}
	                  onChange={this.titleChanged}
	                />
	              </FormGroup>
	              <FormGroup controlId="description" bsSize="large">
	                <ControlLabel>Description</ControlLabel>
	                <FormControl
	                  value={this.state.description}
	                  onChange={this.descriptionChanged}
	                  type="text"
	                />
	              </FormGroup>
	              { this.props.type === "Add" ?
		              <Button
		                block
		                bsSize="large"
		                onClick={() => this.submit()}
		              >
		                Add
		              </Button>
		              :
		              <Button
		                block
		                bsSize="large"
		                onClick={() => this.update()}
		              >
		                Update
		              </Button>
		           }
	              <Button block bsSize="large" onClick={this.props.closePopup}>Close</Button>
	            </form>
	          </div>
	        </div>

		)
	}
}

export default TaskForm;
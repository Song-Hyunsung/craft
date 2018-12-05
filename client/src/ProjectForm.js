import React, { Component } from 'react'
import { PageHeader, FormGroup, FormControl, ControlLabel, Modal } from "react-bootstrap";
import { Form, Input, Textarea, Button } from 'muicss/react';
import { Redirect } from "react-router-dom";
import "./ProjectForm.css";

class ProjectForm extends Component {
	constructor(props){
		super(props);

		this.state = {
			title: "",
			description: "",
			done: false,
			projectId: null,
		}
	}

	titleChanged = (event) => {
		this.setState({ title: event.target.value });
	}

	descriptionChanged = (event) => {
		this.setState({ description: event.target.value });
	}

	addNewProject(cb){
		fetch('/api/profile/' + sessionStorage.getItem('id'), {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify({
				projectTitle: this.state.title,
				projectDescription: this.state.description,
			}),
		}).then(response => {
			if(response.status === 200){
				console.log("Creating New Project");
				return response.json();
			}
		}).then(body => {
			cb(body.project.id);
		}).catch(() => {
			console.log("Error creating new project");
		})
	}

	updateProject(cb){
		fetch('/api/profile/' + sessionStorage.getItem('id') + '/' + this.props.updateProjectId, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify({
				projectTitle: this.state.title,
				projectDescription: this.state.description,
			}),
		}).then(response => {
			if(response.status === 200){
				console.log("Updating Project");
				return response.json();
			}
		}).then(body => {
			cb();
		}).catch(() => {
			console.log("Error updating project");
		})
	}

	handleSubmit = (projectId) => {
		this.setState({ 
			done: true,
			projectId: projectId, 
		});
	}

	handleUpdate = () => {
		window.location.reload();
	}

	submit = () => {
		this.addNewProject(this.handleSubmit);
	}

	update = () => {
		this.updateProject(this.handleUpdate);
	}

	render(){
		if(this.state.done && this.state.projectId != null){
        	return <Redirect to={"/profile/" + sessionStorage.getItem('id') + "/" + this.state.projectId} />;
		}

		return(

			<div>
				<Modal show="true">
		          <Modal.Header>
		            <Modal.Title>
		              {this.props.type} Project
		            </Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		            <Form>
		            	<Input label="Project Title" onChange={this.titleChanged} defaultValue={this.state.title} />
        				<Input label="Project Description" onChange={this.descriptionChanged} defaultValue={this.state.description} />
		            </Form>
		          </Modal.Body>
		          <Modal.Footer>
		          	<div>
			          { this.props.type === "Create" ?
			              <Button
			                variant="raised" color="primary"
			                onClick={() => this.submit()}
			              >
			                Create
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

export default ProjectForm;
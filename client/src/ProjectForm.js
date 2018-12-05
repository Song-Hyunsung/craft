import React, { Component } from 'react'
import { PageHeader, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
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
	        <div className='popup'>
	          <PageHeader><center>{this.props.type} Project</center></PageHeader>
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
		                Submit
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

export default ProjectForm;
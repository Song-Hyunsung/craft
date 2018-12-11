import React, { Component } from 'react'
import { Modal } from "react-bootstrap";
import { Form, Input, Button } from 'muicss/react';
import { Redirect } from "react-router-dom";

class ProjectDeletePrompt extends Component {
	constructor(props){
		super(props);

		this.state = {
			projectId: null,
			projectTitle: null,
		}
	}

	componentWillMount(){
		const {deleteProjectId, deleteProjectTitle} = this.props;
		this.setState({
			projectId: deleteProjectId,
			projectTitle: deleteProjectTitle,
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

	refreshPage = () => {
		window.location.reload();
	}

	render(){
		return(

			<div>
				<Modal show={true}>
		          <Modal.Header>
		            <Modal.Title>
		              Delete Project
		            </Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		            Are you sure you want to delete {' '}
		            "<b>{this.state.projectTitle}</b>"?
		            <br />
		            <font color="red">This action cannot be undone.</font>
		          </Modal.Body>
		          <Modal.Footer>
		          <Button variant="raised" color="danger" onClick={() => this.deleteProject(this.refreshPage)}>Yes, Delete this project</Button>
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
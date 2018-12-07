import React, { Component } from 'react'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import "./Project.css";

class Project extends Component {
	constructor(props){
		super(props);

		this.state = {
			userId: null,
			projectId: null,
			projectTitle: null,
			projectDescription: null,
			createdAt: null,
			updatedAt: null
		}
	}


	componentWillMount(){
		const {UserId, createdAt, id, projectDescription, projectTitle, updatedAt} = this.props;
		this.setState({
			userId: UserId,
			projectId: id,
			projectTitle: projectTitle,
			projectDescription: projectDescription,
			createdAt: createdAt,
			updatedAt: updatedAt
		})
	}

	render(){
		return(
			<Panel>
				<Panel.Heading><b>Project Title: {this.state.projectTitle}</b></Panel.Heading>
				<Panel.Body>
					<b>Project ID</b>: {this.state.projectId} <br />
					<b>Created at</b>: {this.state.createdAt} <br />
					<b>Associated User ID</b>: {this.state.userId} <br />
					<b>Project Description</b>: {this.state.projectDescription} <br />
				</Panel.Body>
 				<Panel.Footer><i>Last updated: {this.state.updatedAt}</i></Panel.Footer>
			</Panel>
		)
	}
}

export default Project;
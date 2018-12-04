import React, { Component } from 'react'
import { Panel } from 'react-bootstrap';

class Task extends Component {
	constructor(props){
		super(props);

		this.state = {
			projectId: null,
			taskId: null,
			taskTitle: null,
			taskDescription: null,
			createdAt: null,
			updatedAt: null
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

	render(){
		return(
			<Panel>
				<Panel.Heading><b>Task: {this.state.taskTitle}</b></Panel.Heading>
				<Panel.Body>
					<b>Task ID</b>: {this.state.taskId} <br />
					<b>Created at</b>: {this.state.createdAt} <br />
					<b>Associated Project ID</b>: {this.state.projectId} <br />
					<b>Task Description</b>: {this.state.taskDescription} <br />
				</Panel.Body>
 				<Panel.Footer><i>Last updated: {this.state.updatedAt}</i></Panel.Footer>
			</Panel>
		)
	}
}

export default Task;
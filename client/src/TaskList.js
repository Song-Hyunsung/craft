import React, { Component } from 'react';
import { PageHeader } from "react-bootstrap";
import Task from './Task';

class TaskList extends Component {
	constructor(props){
		super(props);

		this.state = {
			tasks: [],
			projectName: ""
		}
	}

	componentWillMount(){
		fetch('/api/profile/' + sessionStorage.getItem('id') + '/' + this.props.match.params.projectid, {
			method: 'GET',
			headers: {
				"Content-Type" : "application/json; charset=utf-8",
			},
		}).then(response => {
			return response.json();
		}).then(body => {
			this.setState({ projectName: body.projectTitle });
			this.setState({ tasks: body.task });
		}).catch(() => {
			console.log("Error retrieving tasks");
		})
	}

	render(){
		let renderedTasks = this.state.tasks.map((task, index) => {
			return(
				<Task key={task.id} {...task} />
			)
		})

		return(
			<div>
	   			<PageHeader><center>Tasks for {this.state.projectName}</center></PageHeader>
	   			<div id="content-margin">
	   				{renderedTasks.length > 0 ? renderedTasks : <div><center>You have no tasks to display!</center></div>}
	   			</div>
			</div>
		)
	}
}

export default TaskList;
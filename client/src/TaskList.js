import React, { Component } from 'react';
import { PageHeader } from "react-bootstrap";
import { Button, Tab, Tabs, Panel } from 'muicss/react';
import Task from './Task';
import TaskForm from './TaskForm';
import ProjectForm from './ProjectForm'

class TaskList extends Component {
	constructor(props){
		super(props);

		this.state = {
			tasks: [],
			userId: null,
			projectId: null,
			projectName: null,
			projectDescription: null,
			projectArchived: null,
			createdAt: null,
			updatedAt: null,
			showProjPopup: false,
			showPopup: false,
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
			this.setState({ userId: body.userId });
			this.setState({ projectId: body.projectId });
			this.setState({ projectDescription: body.projectDescription });
			this.setState({ createdAt: body.createdAt });
			this.setState({ updatedAt: body.updatedAt });
			this.setState({ projectArchived: body.projectArchived })
		}).catch(() => {
			console.log("Error retrieving tasks");
		})
	}

	togglePopup = (event) => {
		this.setState({
			showPopup: !this.state.showPopup
		});
	}

	toggleProjPopup = (event) => {
		this.setState({
			showProjPopup: !this.state.showProjPopup
		});
	}

	render(){
		let renderedTasks = this.state.tasks.map((task, index) => {
			if(!task.taskCompleted){
				return(
					<Task projectArchived={this.state.projectArchived} key={task.id} {...task} />
				)
			} else {
				return [];
			}
		})

		let completedTasks = this.state.tasks.map((task, index) => {
			if(task.taskCompleted){
				return(
					<Task projectArchived={this.state.projectArchived} key={task.id} {...task} />
				)
			} else {
				return [];
			}
		})

		return(
			<div>
	   			<PageHeader><center>Viewing {this.state.projectArchived ? <span>Archived</span> : null} Project: {this.state.projectName}</center></PageHeader>

	   			<Panel id="content-margin">
	   				<b>Project ID</b>: {this.state.projectId} <br />
					<b>Associated User ID</b>: {this.state.userId} <br />
					<b>Created at</b>: {this.state.createdAt} <br />
					<b>Last updated at</b>: {this.state.updatedAt} <br />
					<b>Project Description</b>: {this.state.projectDescription} <br />
					{!this.state.projectArchived ?
					<Button variant="raised" size="small"onClick={() => this.toggleProjPopup()}>Update Project</Button>
					: null
					}
					{this.state.showProjPopup ?
		   				<ProjectForm
		   					type='Update'
		   					updateProjectId={this.state.projectId}
		   					updateArchive={this.state.projectArchived}
		   					closePopup={() => this.toggleProjPopup()}
		   					pastTitle={this.state.projectName}
		   					pastDescription={this.state.projectDescription}
		   				/> : null
		   			}
	   			</Panel>

	   			<Tabs justified={true}>
	   				<Tab value="pane-1" label="Open Tasks">
	   					{!this.state.projectArchived ?
	   					<div>
			   			<center><Button variant="raised" color="primary" onClick={() => this.togglePopup()}>Add New Task</Button></center>
			   			<br />
			   			</div>
			   			: null
			   			}
			   		
			   			{this.state.showPopup ?
			   				<TaskForm
			   					type='Add'
			   					projectId={this.props.match.params.projectid}
			   					closePopup={() => this.togglePopup()}
			   				/> : null
			   			}
			   			<div id="content-margin">
			   				{renderedTasks}
			   			</div>
			   		</Tab>
			   		<Tab value="pane-2" label="Completed Tasks">
			   			<div id="content-margin">
			   				{completedTasks}
			   			</div>
			   		</Tab>
		   		</Tabs>
			</div>
		)
	}
}

export default TaskList;

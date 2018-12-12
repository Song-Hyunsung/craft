import React, { Component } from 'react';
import { PageHeader, Grid, Row, Col } from "react-bootstrap";
import { Button, Tab, Tabs, Panel } from 'muicss/react';
import Task from './Task';
import TaskForm from './TaskForm';
import ProjectForm from './ProjectForm'
import './TaskList.css';
import './App.css';

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
			this.setState({
				projectName: body.projectTitle,
				tasks: body.task,
				userId: body.userId,
				projectId: body.projectId,
				projectDescription: body.projectDescription,
				createdAt: body.createdAt,
				updatedAt: body.updatedAt,
				projectArchived: body.projectArchived
			})
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
					<Col sm={12} md={6} lg={3} key={task.id} className="reducePadding">
						<Task projectArchived={this.state.projectArchived} key={task.id} {...task} />
					</Col>
				)	
			} else {
				return [];
			}
		})

		let completedTasks = this.state.tasks.map((task, index) => {
			if(task.taskCompleted){
				return(
					<Col sm={12} md={6} lg={3} key={task.id} className="reducePadding">
						<Task projectArchived={this.state.projectArchived} key={task.id} {...task} />
					</Col>
				)
			} else {
				return [];
			}
		})

		return(
			<div>
	   			<PageHeader><center>Viewing {this.state.projectArchived ? <span>Archived</span> : null} Project: {this.state.projectName}</center></PageHeader>

	   			<center>
		   			<Panel id="content-margin" className="no-shade">
						<div> {this.state.projectDescription} </div>
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
		   		</center>

		   		<Tabs justified={true}>
	   				<Tab value="pane-1" label="Open Tasks">
	   					{!this.state.projectArchived ?
	   					<div>
	   					<br />
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
			   				<Grid>
					    		<Row className="show-grid">
		   				        	{renderedTasks}
			   				    </Row>
			   				</Grid>
			   			</div>
			   		</Tab>
			   		<Tab value="pane-2" label="Completed Tasks">
			   			<div id="content-margin" className="marginTop">
			   				<Grid>
			   					<Row className="show-grid">
			   						{completedTasks}
			   					</Row>
			   				</Grid>
			   			</div>
			   		</Tab>
		   		</Tabs>
			</div>
		)
	}
}

export default TaskList;

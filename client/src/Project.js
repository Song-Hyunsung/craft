import React, { Component } from 'react'

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
			<ul>
				<li> User ID Associated with this project: {this.state.userId} </li>
				<li> Project ID: {this.state.projectId} </li>
				<li> Project Title: {this.state.projectTitle} </li>
				<li> Project Description: {this.state.projectDescription} </li>
				<li> Project is created at: {this.state.createdAt} </li>
				<li> Project is updated at: {this.state.updatedAt} </li>
			</ul>
		)
	}
}

export default Project;
"use strict"

//import dependencies
import React from "react"
import cookie from "react-cookie"
import { connect } from "react-redux"
import { Button, Jumbotron } from "react-bootstrap"
import $ from "jquery"

//import source
import { fetchProject } from "../../actions/ProjectAction"
import ProjectContainer from "./ProjectContainer"

class Project extends React.Component {

	constructor(){
		super()
		this.state = {
			user: cookie.load("user")
		}
	}

	componentWillMount() {
		this.props.dispatch(fetchProject())
	}

	render() {
		return (
			<div className="container project-sec">
				<Jumbotron className="jumbotron">
					<h1>Project List</h1>
					<p>Please click the project title to see more detail.</p>
					<p><a target="_blank" href="https://github.com/weiyinglee">Click here to learn more on GitHub</a></p>
				</Jumbotron>
				{
					this.props.projects.map((elem, index) => {
						return (
							<ProjectContainer user={this.state.user} title={elem.Title} description={elem.Description} year={elem.Year} link={elem.Link} _id={elem.id} key={index}/>
						)
					})
				}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		projects: state.project.projects
	}
}

export default connect(mapStateToProps)(Project)
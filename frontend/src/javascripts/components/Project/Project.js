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
			<div className="project-sec">
				<div className="page-header" id="project-heading">
					<h3 className="project-heading-text">
						Find more details about my projects on <a target="_blank" role="button" className="btn btn-warning" href="https://github.com/weiyinglee">My GitHub</a>
					</h3>
				</div>
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
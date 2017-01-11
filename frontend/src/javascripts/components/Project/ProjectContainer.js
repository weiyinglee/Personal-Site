"user strict"

//import dependencies
import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import { Panel, Button } from "react-bootstrap"
import $ from "jquery"

//import source
import { deleteProject, updateProject } from "../../actions/ProjectAction"

class ProjectContainer extends React.Component {
		
	constructor() {
		super()
		this.state = {
			open: false,
			editing: false
		}
	}

	//open the edit mode
	edit() {
		this.setState({editing: !this.state.editing})
	}

	//delete the project
	del() {
		this.props.dispatch(deleteProject(this.props._id))
	}

	//update the project info
	update() {
		let title = this.refs.newTitle.value
		let date = this.refs.newDate.value
		let des = this.refs.newDescription.value
		let link = this.refs.newLink.value
		let id = this.props._id

		if(title == "" || date == "" || des == "" || link == ""){
			alert("Fields can not be empty")
		}else{
			let data = '{"Title":"' + title + '","Description":"' + des + '","Year":"' + date + '","Link":"' + link + '"}'

			this.props.dispatch(updateProject(this.props._id, data))
		}
	}

	//go to the project link
	goLink() {
		let link = this.props.link;
		window.open(link, "_blank")
	}

	render() {

		let editBtns, editBlock

		if(this.props.user && this.props.user.admin){
			editBtns = (
				<div className="project-edit">
					<Button bsSize="xsmall" onClick={this.edit.bind(this)}>Edit</Button>
					<Button bsStyle="danger" bsSize="xsmall" onClick={this.del.bind(this)}>Delete</Button>
				</div>
			)
		}

		if(this.state.editing){
			editBlock = (
				<form>
					<div className="form-group">
						<input type="text" className="form-control" ref="newTitle" placeholder="Title" defaultValue={this.props.title}/>
						<input type="text" className="form-control" ref="newDate" placeholder="Date" defaultValue={this.props.year}/>
						<input type="text" className="form-control" ref="newLink" placeholder="Link" defaultValue={this.props.link}/>
						<textarea className="form-control" rows="5" ref="newDescription" cols="30" placeholder="Description" defaultValue={this.props.description}>
						</textarea>
					</div>
					<Button bsSize="xsmall" onClick={this.update.bind(this)}>Update</Button>
				</form>
			)
		}else {
			editBlock = (
				<div>
					<div className="page-header">
						<h4 className="project-title">{this.props.title}</h4>
						<h5 className="project-date">{this.props.year}</h5>
					</div>
					<p className="project-description">{this.props.description}</p>
					<h6 className="project-link">
						<Link to="/project" className="links" onClick={this.goLink.bind(this)}>GitHub Link</Link>
					</h6>
				</div>
			)
		}

		return(
			<div className="project-frame">
				<Panel bsStyle="warning">
					{editBtns}
					{editBlock}
				</Panel>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		message: state.project.message
	}
}

export default connect(mapStateToProps)(ProjectContainer)
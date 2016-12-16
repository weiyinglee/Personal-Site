"use strict"

//import dependecies
import React from "react"
import { connect } from "react-redux"
import { Panel, Button } from "react-bootstrap"
import cookie from "react-cookie"

//import source
import { updateWork, delWork } from "../../actions/WorkAction"

class Experience extends React.Component {

	constructor() {
		super()
		this.state = {
			edit: false
		}
	}

	editing() {
		this.setState({edit: !this.state.edit})
	}

	del() {
		this.props.dispatch(delWork(this.props._id))
	}

	update() {
		let title = this.refs.newWorkTitle.value
		let date = this.refs.newWorkDate.value
		let des = this.refs.newWorkDescription.value
		let id = this.props._id

		if(title == "" || date == "" || des == ""){
			alert("Fields can not be empty")
		}else{
			let data = '{"Title":"' + title + '","Description":"' + des + '","Year":"' + date + '"}'

			this.props.dispatch(updateWork(this.props._id, data))
		}
	}

	render() {

		let editBtn, editBlk

		if(this.props.user && this.props.user.admin) {
			editBtn = (
				<div className="experience-edit">
					<Button bsStyle="default" bsSize="xsmall" onClick={this.editing.bind(this)}>Edit</Button>
					<Button bsStyle="danger" bsSize="xsmall" onClick={this.del.bind(this)}>Delete</Button>
				</div>
			)
		}

		if(this.state.edit) {
			editBlk = (
				<form>
					<div className="form-group">
						<input type="text" className="form-control" ref="newWorkTitle" placeholder="Title" defaultValue={this.props.title}/>
						<input type="text" className="form-control" ref="newWorkDate" placeholder="Date" defaultValue={this.props.year}/>
						<textarea className="form-control" rows="5" ref="newWorkDescription" cols="30" placeholder="Description" defaultValue={this.props.description}>
						</textarea>
					</div>
					<Button bsSize="xsmall" onClick={this.update.bind(this)}>Update</Button>
				</form>
			)
		}else {
			editBlk = (
				<div>
					<div className="page-header">
						<h4 className="experience-title">{this.props.title}</h4>
						<h5 className="experience-date">{this.props.year}</h5>
					</div>
					<p className="project-description">{this.props.description}</p>
				</div>
			)
		}

		return (
			<div className="container">
				<Panel header={this.props.title}>
					{editBtn}
					{editBlk}
				</Panel>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		message: state.experience.message
	}
}

export default connect(mapStateToProps)(Experience)
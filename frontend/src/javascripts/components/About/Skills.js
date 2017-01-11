	"use strict"

//import dependencies
import React from "react"
import { connect } from "react-redux"
import { Button } from "react-bootstrap"

//import source
import { updateSkill, deleteSkill } from "../../actions/SkillsAction"

class Skills extends React.Component {

	constructor() {
		super()
		this.state = {
			edit: false
		}
	}

	editing() {
		this.setState({edit: !this.state.edit})
	}

	update() {
		let title = this.refs.newSkillTitle.value
		let proficiency = this.refs.newSKillProficiency.value
		let id = this.props._id

		if(title == "" || proficiency == ""){
			alert("Fields can not be empty")
		}else{
			let data = '{"Title":"' + title + '","Proficiency":"' + proficiency + '"}'

			this.props.dispatch(updateSkill(id, data))
		}
	}

	del() {
		this.props.dispatch(deleteSkill(this.props._id))
	}

	render() {
		
		let editBtn, editBlk

		if(this.props.user && this.props.user.admin) {
			editBtn = (
				<div className="skills-edit">
					<Button bsStyle="default" bsSize="xsmall" onClick={this.editing.bind(this)}>Edit</Button>
					<Button bsStyle="danger" bsSize="xsmall" onClick={this.del.bind(this)}>Delete</Button>
				</div>
			)
		}

		if(this.state.edit) {
			editBlk = (
				<div>
					{editBtn}
					<form>
						<div className="form-group">
							<input type="text" className="form-control" ref="newSkillTitle" placeholder="Title" defaultValue={this.props.title}/>
							<input type="text" className="form-control" ref="newSKillProficiency" placeholder="Proficiency" defaultValue={this.props.proficiency}/>
						</div>
						<Button bsSize="xsmall" onClick={this.update.bind(this)}>Update</Button>
					</form>
				</div>
			)
		}else {
			editBlk = (
				<div>
					<div>
						{editBtn}
						<h4>
							<span className="skill-title">{this.props.title}</span> 
						</h4>
						<h4>
							<span className="skill-proficiency">{this.props.proficiency}</span>
						</h4>
					</div>
				</div>
			)
		}

		return (
			<div className="container">
				{editBlk}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		message: state.skills.message
	}
}


export default connect(mapStateToProps)(Skills)
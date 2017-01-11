"use strict"

//import dependencies
import React from "react"
import { connect } from "react-redux"
import { Button } from "react-bootstrap"

//import source
import { updateAward, deleteAward } from "../../actions/AwardAction"

class Award extends React.Component {

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
		let title = this.refs.newAwardTitle.value
		let time = this.refs.newAwardTime.value
		let id = this.props._id

		if(title == "" || time == ""){
			alert("Fields can not be empty")
		}else{
			let data = '{"Title":"' + title + '","Time":"' + time + '"}'

			this.props.dispatch(updateAward(id, data))
		}
	}

	del() {
		this.props.dispatch(deleteAward(this.props._id))
	}

	render() {
		
		let editBtn, editBlk

		if(this.props.user && this.props.user.admin) {
			editBtn = (
				<div className="award-edit">
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
							<input type="text" className="form-control" ref="newAwardTitle" placeholder="Title" defaultValue={this.props.title}/>
							<input type="text" className="form-control" ref="newAwardTime" placeholder="Time" defaultValue={this.props.time}/>
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
							<span className="award-title">{this.props.title}</span> 
						</h4>
						<h5>
							<span className="award-time">{this.props.time}</span>
						</h5>
					</div>
				</div>
			)
		}

		return (
			<div>
				{editBlk}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		message: state.award.message
	}
}


export default connect(mapStateToProps)(Award)
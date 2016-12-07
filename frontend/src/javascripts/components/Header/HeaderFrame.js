/*
	This is the header frame for the home page
*/

"use strict"

//import dependencies
import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import { Grid, Row, Col, Button } from "react-bootstrap"

//import source
import { fetchAboutIntro, updateAboutIntro } from "../../actions/AboutAction"

class HeaderFrame extends React.Component {

	constructor() {
		super()
		this.state = {
			editing: false //for whether to edit the profile info
		}
	}

	//open the edit mode
	editingHandler() {
		this.setState({ editing: !this.state.editing })
	}

	//update the about info on the home page header frame
	submitInfo() {
		let info = this.refs.newInfo.value  //from the ref value of input field
		let data = '{"newIntro":"' + info + '"}' //format the data to pass in

		//pass the data to the action
		this.props.dispatch(updateAboutIntro(data))
	}

	//GET the about info for the header frame
	componentWillMount() {
		//use the action to call the fetching action
		this.props.dispatch(fetchAboutIntro())
	}

	return (

		/* Handle the editing mode */
		let editBtn, editBlock

		//if this is logined in
		if(this.props.login) {
			editBtn = (<Button bsSize="xsmall" bsStyle="danger" onClick={this.editingHandler.bind(this)}>Edit</Button>)
		}

		//When edit mode is on, the about info is able to update
		if(this.state.editing){
			editBlock = (
				<div>
					<textarea rows="3" cols="50" maxLength="100" ref="newInfo" defaultValue={this.props.intro}></textarea>
					<Button bsSize="xsmall" onClick={this.submitInfo.bind(this)}>Enter</Button>
				</div>
			)
		}else {
			editBlock = (<h4>{this.props.intro}</h4>)
		}

		<div id="header-frame">
			<Grid>
				<Row>
					<Col xs={12} sm={9} md={7}>
						<div className="profile-info">
							<div className="page-header">
								<h3>Hi, My name is <span id="myname">WeiYing (Eric) Lee</span></h3>
								{editBlock}
								{editBtn}									
							</div>
							<h4>Get to know me more now</h4>
							<Link role="button" className="btn btn-info" to="/about">About me</Link>
						</div>
					</Col>
					<Col sm={3} md={5}></Col>
				</Row>
			</Grid>
		</div>		
	)
}

//to map the state to props for getting the state and dispatcher of the reducer
function mapStateToProps(state) {
	return {
		intro: state.about.intro,
		message: state.about.message
	}
}

export default connect(mapStateToProps)(HeaderFrame)
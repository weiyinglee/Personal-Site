"use strict"

//import dependencies
import React from "react"
import { connect } from "react-redux"
import { Panel, Button } from "react-bootstrap"
import $ from "jquery"

//import source
import { updateAboutSummary } from "../../actions/AboutAction"

class Intro extends React.Component {

	updateIntro() {
		let summary = this.refs.newIntro.value
		let data = '{"newSummary":"' + summary  + '"}'

		this.props.dispatch(updateAboutSummary(data))
	}

	render() {

		let introBlk

		if(this.props.edit) {
			introBlk = (
				<div>
					<textarea rows="3" cols="50" ref="newIntro" defaultValue={this.props.content}></textarea>
					<Button bsSize="xsmall" onClick={this.updateIntro.bind(this)}>Enter</Button>
				</div>
			)
		}else {
			introBlk = (<pre className="intro-summary">{this.props.content}</pre>)
		}

		return (
			<div>
				{introBlk}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		message: state.about.message
	}
}

export default connect(mapStateToProps)(Intro)
"use strict"

//import dependencies
import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import { Button, Grid, Row, Col, Panel} from "react-bootstrap"
import cookie from "react-cookie"

//import source
import { fetchAboutSummary } from "../../actions/AboutAction"
import { fetchWork, addWork } from "../../actions/WorkAction"
import Intro from "./Intro"
import Experience from "./Experience"

class About extends React.Component {

	constructor(){
		super()
		this.state = {
			user: cookie.load("user"),
			open: false
		}
	}

	openBtn() {
		this.setState({open: !this.state.open})
	}

	addWork() {
		let data = {Title: "Title", Description: "Description", Year: "Date"}

		this.props.dispatch(addWork(data))
	}

	componentWillMount() {
		this.props.dispatch(fetchAboutSummary())
		this.props.dispatch(fetchWork())
	}

	render() {

		let introEditBtn, workBtn

		if(this.state.user && this.state.user.admin){
			introEditBtn = (<Button bsStyle="danger" bsSize="xsmall" onClick={this.openBtn.bind(this)}>Edit</Button>)
			workBtn = (<Button bsStyle="success" bsSize="xsmall" onClick={this.addWork.bind(this)}>Add</Button>)
		}

		return (
			<Grid className="about-sec">
				<Row className="intro-sec">
					<Row className="about-sec-title">
						<div className="page-header">
							<h5 className="title-head">INTRODUCTION</h5>
							<h1 className="title-subHead">Learn about Me</h1>
							{introEditBtn}
						</div>
					</Row>
					<Row className="intro-sec-content">
						<div className="container">
							<Col md={6}>
								<Intro content={this.props.summary} edit={this.state.open} />
							</Col>
							<Col md={6}>
								<Panel>
									SKILLS
								</Panel>
							</Col>
						</div>
					</Row>
				</Row>
				<Row className="experience-sec">
					<Row className="about-sec-title">
						<div className="page-header">
							<h5 className="title-head">EXPERIENCE</h5>
							<h1 className="title-subHead">Previous Work</h1>
							{workBtn}
						</div>
					</Row>
					<Row className="experience-sec-content">
						<Col>
							{
								this.props.experience.map((elem, index) => {
									return (
										<Experience user={this.state.user} title={elem.Title} description={elem.Description} year={elem.Year} _id={elem.id} key={index}/>
									)
								})
							}
						</Col>
					</Row>
				</Row>
				<Row className="education-sec">
					<Row className="about-sec-title">
						<div className="page-header">
							<h5 className="title-head">EDUCATION</h5>
							<h1 className="title-subHead">My Academic</h1>
							
						</div>
					</Row>
					<Row className="education-sec-content">
						<Col md={6}></Col>
						<Col md={6}>
							<Panel>
								ACHIEVEMENT
							</Panel>
						</Col>
					</Row>
				</Row>
			</Grid>
		)
	}
}

function mapStateToProps(state) {
	return {
		summary: state.about.summary,
		Message: state.experience.message,
		experience: state.experience.experience
	}
}

export default connect(mapStateToProps)(About)
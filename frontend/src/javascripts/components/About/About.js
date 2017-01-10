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
import Education from "./Education"
import Skills from "./Skills"
import Award from "./Award"

//import img
import selfImg from "../../../images/profile-pic.png"

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
						<Row>
							<div className="container">
								<Col md={1} xs={1}></Col>
								<Col md={5} xs={12} className="profile-pic">
									<img src={selfImg}/>
								</Col>
								<Col md={6} xs={12}>
									<Intro content={this.props.summary} edit={this.state.open} />
								</Col>
							</div>
						</Row>
						<Row>
							<div className="container">
								<Col md={6} xs={12}>
									<div className="page-header">
										<h4 id="achivement-title">ACHIEVEMENT</h4>
									</div>
									<div className="achivement-content">

									</div>
								</Col>
								<Col md={6} xs={12}>
									<div className="page-header">
										<h4 id="skill-title">SKILLS</h4>
									</div>
									<div className="skill-content">

									</div>
								</Col>
							</div>
						</Row>
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
										<div className="experience-item">
											<Experience user={this.state.user} title={elem.Title} description={elem.Description} year={elem.Year} _id={elem.id} key={index}/>
										</div>
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
						<Row>
							<Col md={1} xs={3}></Col>
							<Col md={9} xs={6}>
								<Education />
							</Col>
							<Col md={1} xs={3}></Col>
						</Row>
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
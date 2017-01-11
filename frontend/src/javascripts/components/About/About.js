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
import { fetchSkills, addSkill } from "../../actions/SkillsAction"
import { fetchAward, addAward } from "../../actions/AwardAction"
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

	addSkill() {
		let data = {Title: "Title", Proficiency: "proficiency"}

		this.props.dispatch(addSkill(data))
	}

	addAward() {
		let data = {Title: "Title", Time: "Time"}
		
		this.props.dispatch(addAward(data))
	}

	componentWillMount() {
		this.props.dispatch(fetchAboutSummary())
		this.props.dispatch(fetchWork())
		this.props.dispatch(fetchSkills())
		this.props.dispatch(fetchAward())
	}

	render() {

		let introEditBtn, workBtn, skillBtn, awardBtn

		if(this.state.user && this.state.user.admin){
			introEditBtn = (<Button bsStyle="danger" bsSize="xsmall" onClick={this.openBtn.bind(this)}>Edit</Button>)
			workBtn = (<Button bsStyle="success" bsSize="xsmall" onClick={this.addWork.bind(this)}>Add</Button>)
			skillBtn = (<Button bsStyle="success" bsSize="xsmall" onClick={this.addSkill.bind(this)}>Add</Button>)
			awardBtn = (<Button bsStyle="success" bsSize="xsmall" onClick={this.addAward.bind(this)}>Add</Button>)
		}

		return (
			<Grid className="about-sec">
				<Row className="intro-sec">
					<Row className="about-sec-title">
						<div className="page-header">
							<h5 className="title-head">INTRODUCTION</h5>
							<h1 className="title-subHead">Learn about Me</h1>
						</div>
					</Row>
					<Row className="intro-sec-content">
						<Row>
							<div className="container">
								<Col md={1} xs={1}></Col>
								<Col md={5} xs={12} className="profile-pic">
									<img src={selfImg}/>
									<div className="page-header">
										<h4 id="intro-title">ABOUT ME</h4>
										{introEditBtn}
									</div>
									<div className="intro-content">
										<Intro content={this.props.summary} edit={this.state.open} />
									</div>
								</Col>
								<Col md={6} xs={12}>
									<div className="page-header">
										<h4 id="skill-title">SKILLS</h4>
										{skillBtn}
									</div>
									<div className="skill-content">
										{
											this.props.skills.map((elem, index) => {
												return (
													<div className="skill-item">
														<Skills user={this.state.user} title={elem.Title} proficiency={elem.Proficiency} _id={elem.id} key={index}/>
													</div>
												)
											})
										}
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
					<Row className="education-sec-content container">
						<Row>
							<Col md={1} xs-hidden></Col>
							<Col md={6} sm={12} xs={12}>
								<Education />
							</Col>
							<Col md={5} sm={12} xs={12}>
								<Panel header="ACHIEVEMENT" bsStyle="warning">
									{awardBtn}
									<div className="achivement-content">
										{
											this.props.award.map((elem, index) => {
												return (
													<div className="award-item">
														<Award user={this.state.user} title={elem.Title} time={elem.Time} _id={elem.id} key={index}/>
													</div>
												)
											})
										}
									</div>
								</Panel>
							</Col>
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
		experience: state.experience.experience,
		skills: state.skills.skills,
		award: state.award.award
	}
}

export default connect(mapStateToProps)(About)
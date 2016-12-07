"use strict"

//import dependencies
import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import { Grid, Row, Col, Button } from "react-bootstrap"
import cookie from "react-cookie"

//import source
import { fetchAboutSummary } from "../../actions/AboutAction"
import { fetchProject } from "../../actions/ProjectAction"

class Home extends React.Component {
	
	componentWillMount() {
		this.props.dispatch(fetchAboutSummary())
		this.props.dispatch(fetchProject())
	}

	render() {
		return (
			<Grid className="home-sec">
				<Row className="home-summary-sec">
					<Col>
						<Row className="home-sec-title">
							<div className="page-header">
								<h5 className="title-head">INTRODUCTION</h5>
								<h1 className="title-subHead">Learn about Me</h1>
							</div>
						</Row>
						<Row className="home-sec-content">
							<Col md={3} sm={3} xsHidden></Col>
							<Col md={3} sm={3} xs={6} className="profile-pic">
								<img src="../../../images/profile-pic.png"/>
							</Col>
							<Col md={5} sm={5} xs={6} className="profile-summary">
								<pre>{this.props.about_summary}</pre>
							</Col>	
							<Col md={1} sm={1} xsHidden></Col>					
						</Row>
						<Row className="more-btn-row">
							<Col md={10} sm={8} xs={4}></Col>
							<Col md={2} sm={4} xs={8}>
								<Link to="/about" role="button" className="btn btn-default">More..</Link>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row className="home-project-sec">
					<Col>
						<Row className="home-sec-title">
							<div className="page-header">
								<h5 className="title-head">MY WORK</h5>
								<h1 className="title-subHead">Projects I have done</h1>
							</div>
						</Row>
						{
							this.props.projects.map((project, index) => {
								return (
									<Row className="home-sec-content" key={index}>
										<Col md={6} sm={6}>
											<h3 className="home-project-title">{project.Title}</h3>
											<h4 className="home-project-date">{project.Year}</h4>
										</Col>
										<Col md={4} sm={4}><span className="home-project-info">{project.Description}</span></Col>						
										<Col md={2} sm={2}></Col>
									</Row>

								)
							})
						}
						<Row className="more-btn-row">
							<Col md={10} sm={8} xs={4}></Col>
							<Col md={2} sm={4} xs={8}>
								<Link to="/project" role="button" className="btn btn-default">View detail..</Link>
							</Col>
						</Row>						
					</Col>
				</Row>
				<Row className="home-contact-sec">
					<Col>
						<Row className="home-sec-title">
							<div className="page-header">
								<h5 className="title-head">MY CONTACT</h5>
								<h1 className="title-subHead">How to Contact Me</h1>
							</div>
						</Row>
						<Row className="home-sec-content">
							<Col md={6} sm={6}><span className="home-contact-title">Email</span></Col>
							<Col md={6} sm={6}><span className="home-contact-info">weiyinglee1009@yahoo.com</span></Col>						
						</Row>
						<Row className="home-sec-content">
							<Col md={6} sm={6}><span className="home-contact-title">Address</span></Col>
							<Col md={6} sm={6}><span className="home-contact-info">USA 127 N.Prospectors Rd, Diamond Bar, CA, 91765</span></Col>						
						</Row>
						<Row className="more-btn-row">
							<Col md={10} sm={8} xs={4}></Col>
							<Col md={2} sm={4} xs={8}>
								<Link to="/contact" role="button" className="btn btn-default">More..</Link>
							</Col>
						</Row>
					</Col>
				</Row>
			</Grid>
		)
	}
}

function mapStateToProps(state) {
	return {
		about_summary: state.about.summary,
		projects: state.project.projects
	}
}

export default connect(mapStateToProps)(Home)
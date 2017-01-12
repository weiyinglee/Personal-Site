"use strict"

//import dependencies
import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import { Nav, Navbar, NavItem, Button, Grid, Row, Col } from "react-bootstrap"
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap'
import cookie from "react-cookie"
import $ from "jquery"

//import source
import { addProject } from "../../actions/ProjectAction"

import HeaderFrame from "./HeaderFrame.js"

class Header extends React.Component {

	constructor() {
		super()
		this.state = {
			user: cookie.load("user")
		}
	}

	//This is for project section, adding the new default project
	addProject() {
		
		let data = {Title: "Title", Description: "Description", Year: "Date", "Link": ""}

		this.props.dispatch(addProject(data))
	}

	logout(e) {
		if(this.state.user && this.state.user.login && e == 5){
			cookie.remove("user")
			location.reload()
		}
	}

	render() {

		let extendedHeader, userlogin, projectAddBtn

		//This is for project, when login, can see the add project button
		if(this.state.user && this.state.user.admin){
			projectAddBtn = (<Button bsStyle="success" bsSize="small" className="project-add-btn" onClick={this.addProject.bind(this)}>Add</Button>)
		}

		//This is for admin login in section, can see when its unlogin, otherwise, show logout
		if(this.state.user && this.state.user.login){
			userlogin = (
				<NavItem eventKey={5}>Logout</NavItem>
			)
		}else {
			userlogin = (
				<LinkContainer to="/login">
					<NavItem eventKey={5}>Login</NavItem>
				</LinkContainer>
			)
		}

		//Depends on the path, show different headings
		switch(this.props.path) {
			case "/":
				extendedHeader = (<HeaderFrame user={this.state.user}/>)
				break
			case "/about":
				extendedHeader = (
					<div className="sub-header-title">
						<h2>ABOUT ME</h2>
					</div>
				)
				break
			case "/project":
				extendedHeader = (
					<div className="sub-header-title">
						<h2>MY PROJECTS</h2>
						{projectAddBtn}
					</div>
				)					
				break
			case "/contact":
				extendedHeader = (
					<div className="sub-header-title">
						<h2>CONTACT ME</h2>
					</div>
				)
				break
			case "/login":
				extendedHeader = (
					<div className="sub-header-title">
						<h2>USER LOGIN</h2>
					</div>
				)
				break
		}

		return (
			<div id="nav-frame">
				<Navbar inverse className="navbar">
					<Navbar.Header>
					  	<Navbar.Brand>
					    	<Link to="/" id="page-title">WeiYingLee Portfolio</Link>
					  	</Navbar.Brand>
					  	<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight onSelect={this.logout.bind(this)}>
							<IndexLinkContainer to="/">
								<NavItem eventKey={1}>Home</NavItem>
							</IndexLinkContainer>
							<LinkContainer to="/about">
								<NavItem eventKey={2}>About</NavItem>
							</LinkContainer>
							<LinkContainer to="/project">
								<NavItem eventKey={3}>Project</NavItem>
							</LinkContainer>
							<LinkContainer to="/contact">
								<NavItem eventKey={4}>Contact</NavItem>
							</LinkContainer>
							{userlogin}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				{extendedHeader}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		message: state.project.message
	}
}

export default connect(mapStateToProps)(Header)
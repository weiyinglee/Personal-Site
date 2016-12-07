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
			login: cookie.load("login")
		}
	}

	//This is for project section, adding the new default project
	addProject() {
		
		let data = {Title: "Title", Description: "Description", Year: "Date", "Link": ""}

		this.props.dispatch(addProject(data))
	}

	logout(e) {
		if(e == 5){
			cookie.remove("login");
			this.setState({login: false})
		}
	}

	render() {

		let extendedHeader, adminLogin, loginAddBtn

		//This is for project, when login, can see the add project button
		if(this.state.login){
			loginAddBtn = (<Button bsStyle="success" bsSize="small" className="project-add-btn" onClick={this.addProject.bind(this)}>Add</Button>)
		}

		//This is for admin login in section, can see when its unlogin, otherwise, show logout
		if(this.state.login){
			adminLogin = (
				<NavItem eventKey={5} id="admin-btn">Logout</NavItem>
			)
		}

		//Depends on the path, show different headings
		switch(this.props.path) {
			case "/":
				extendedHeader = (<HeaderFrame login={this.state.login}/>)
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
						{loginAddBtn}
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
					<div id="admin-title">
						<h2>Note: This is for only Administrator used!</h2>
					</div>
				)
				break
		}

		return (
			<div id="nav-frame">
				<Navbar inverse className="navbar">
					<Navbar.Header>
					  	<Navbar.Brand>
					    	<Link to="/" id="page-title">ERICLEE PORTFOLIO</Link>
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
							{adminLogin}
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
"use strict";

//import dependencies
import React from "react"
import { Nav, NavItem } from "react-bootstrap"
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap"

//import components
import FooterLinks from "./FooterLinks"

class Footer extends React.Component {
	render() {
		return (
			<div id="footer-frame">
				<div className="page-header">
					<h4 id="footer-header-title">
						Follow me on:
					</h4>
					<FooterLinks />
				</div>
				<Nav bsStyle="pills" className="footer-bar">
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
				</Nav>
				<div id="copyright-sec">
					<h5>
						© 2017 WEIYINGLEE PORTFOLIO. All Rights Reserved
					</h5>
				</div>
			</div>
		)
	}
}

export default Footer
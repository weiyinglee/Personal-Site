"use strict";

//import dependencies
import React from "react";
import cookie from "react-cookie";
import { Button } from "react-bootstrap";

export default class Contact extends React.Component {
	render() {
		return (
			<div className="contact-sec">
				<div className="page-header">
					<h3 className="contact-tool">Email</h3>
					<h4 className="contact-info">weiyinglee1009@yahoo.com</h4>
				</div>
				<div className="page-header">
					<h3 className="contact-tool">Address</h3>
					<h4 className="contact-info">USA: 127 N.Prospectors Rd, Diamond Bar, CA, 91765</h4>
				</div>
				<div className="page-header">
					<h3 className="contact-tool">Facebook</h3>
					<h4 className="contact-info"><a target="_blank" href="https://www.facebook.com/weiyinglee">My Facebook Link</a></h4>
				</div>
				<div className="page-header">
					<h3 className="contact-tool">Linkedin</h3>
					<h4 className="contact-info"><a target="_blank" href="https://www.linkedin.com/in/weiyinglee">My Linkedin Link</a></h4>
				</div>
				<div className="page-header">
					<h3 className="contact-tool">GitHub</h3>
					<h4 className="contact-info"><a target="_blank" href="https://www.github.com/weiyinglee">My GitHub Link</a></h4>
				</div>
			</div>
		)
	}
}
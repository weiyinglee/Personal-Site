"use strict"

//import dependencies
import React from "react"
import cookie from "react-cookie"
import { Link } from "react-router"
import { Panel, Button } from "react-bootstrap"

export default class Contact extends React.Component {

	constructor() {
		super()
		this.state = {
			user: cookie.load("user"),
			messages: [
				{
					"id": 1,
					"date": "11/30/15",
					"text": "dfasdfasdfasdfas"
				},
				{
					"id": 2,
					"date": "12/15/17",
					"text": "asjdlfjsaldkf"
				}
			]
		}
	}

	render() {

		let messageBlk;

		if(this.state.user && this.state.user.login) {
			messageBlk = (
				<div className="message-area">				
					<div className="page-header message-area-title">
						<h4>Hi {this.state.user.username}, here are your messages!</h4>
					</div>
					<div className="message-lists">
						<ul>
							{
								this.state.messages.map((message, index) => {
									return (
										<li key={index}>
											<Panel header={message.date} bsStyle="warning">
												<div className="message-post">
													<span className="message-text">{message.text}</span>
												</div>
												<div className="message-response">
													<h5>WeiYing: </h5>
													<span className="message-text">Hello</span>
												</div>
											</Panel>
										</li>
									)
								})
							}
						</ul>
					</div>
					<form>
						<div className="form-group">
							<textarea ref="message" className="form-control" placeholder="Message.."></textarea>
						</div>
						<Button>Send</Button>
					</form>
				</div>
			)
		}

		return (
			<div className="contact-sec">
				<div className="page-header">
					<h3 className="contact-tool">Email</h3>
					<h4 className="contact-info">weiyinglee1009@yahoo.com</h4>
				</div>
				<div className="page-header">
					<h3 className="contact-tool">Facebook</h3>
					<h4 className="contact-info">
						<Link target="_blank" to="https://www.facebook.com/weiyinglee" role="button" className="btn btn-primary">
							My Facebook Link
						</Link>
					</h4>
				</div>
				<div className="page-header">
					<h3 className="contact-tool">Leave A Message</h3>
					<h4 className="contact-info">
						{messageBlk}
					</h4>
				</div>
			</div>
		)
	}
}
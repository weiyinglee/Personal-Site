"use strict"

//import dependencies
import React from "react"
import { connect } from "react-redux"
import cookie from "react-cookie"
import { Link } from "react-router"
import { Panel, Button } from "react-bootstrap"

//import source
import { fetchMessage, addMessage, updateMessage, deleteMessage } from "../../actions/ContactAction"

class Contact extends React.Component {

	constructor() {
		super()
		this.state = {
			user: cookie.load("user"),
			edit: false
		}
	}

	addZeroBefore(n) {
		return (n < 10 ? '0' : '') + n;
	}

	addPost() {
		let newMessage = this.refs.message.value
		let date = new Date()
		let dateFormat = date.getFullYear() + "-" +
		 									date.getMonth() + "-" + 
		 									date.getDate() + " " +
		 									this.addZeroBefore(date.getHours()) + ":" + 
		 									this.addZeroBefore(date.getMinutes()) + ":" +
		 									this.addZeroBefore(date.getSeconds())
		let data = {
			date: dateFormat,
			posts: newMessage,
			response: null,
			user: this.state.user.username
		}

		this.props.dispatch(addMessage(data))
	}

	updatePost(id) {
		
		let newMessage = this.refs.new_message.value
		let date = new Date()
		let dateFormat = date.getFullYear() + "-" +
		 									date.getMonth() + "-" + 
		 									date.getDate() + " " +
		 									this.addZeroBefore(date.getHours()) + ":" + 
		 									this.addZeroBefore(date.getMinutes()) + ":" +
		 									this.addZeroBefore(date.getSeconds())
		let data = {
			date: dateFormat,
			posts: newMessage
		}

		this.props.dispatch(updateMessage(id, data))
	}

	editPost() {
		this.setState({edit: !this.state.edit})
	}

	deletePost(id) {
		this.props.dispatch(deleteMessage(id))
	}

	componentWillMount() {
		this.props.dispatch(fetchMessage())
	}

	render() {

		let messageBlk

		if(this.state.user && this.state.user.login) {
			messageBlk = (
				<div className="message-area">				
					<div className="page-header message-area-title">
						<h4>Hi {this.state.user.username}, here are your messages!</h4>
					</div>
					<div className="message-lists">
						<ul>
							{
								this.props.messages.map((message, index) => {
									if(this.state.user.username === message.user) {
										let response, editBlk
										if(message.response){
											response = (
												<div className="message-response">
													<h5>WeiYing: </h5>
													<span className="message-text">{message.response}</span>
												</div>												
											)
										}
										if(this.state.edit){
											editBlk = (
												<div className="form-group">
													<textarea ref="new_message" className="form-control" placeholder="New message.." defaultValue={message.posts}></textarea>
													<Button bsSize="xsmall" bsStyle="warning" onClick={this.updatePost.bind(this, message.id)}>Update</Button>
												</div>
											)
										}else {
											editBlk = (
												<span className="message-text">{message.posts}</span>
											)
										}
										return (
											<li key={index}>
												<Panel header={message.date} bsStyle="warning">
													<div className="message-post">
														{editBlk}
														<a className="btn btn-xs" onClick={this.editPost.bind(this)}>
															<span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
														</a>
														<a className="btn btn-xs" onClick={this.deletePost.bind(this, message.id)}>
															<span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
														</a>
													</div>
													{response}
												</Panel>
											</li>
										)
									}
								})
							}
						</ul>
					</div>
					<form>
						<div className="form-group">
							<textarea ref="message" className="form-control" placeholder="Message.."></textarea>
						</div>
						<Button onClick={this.addPost.bind(this)}>Send</Button>
					</form>
				</div>
			)
		//if the user is not login, juat ask for login
		}else {
			messageBlk = (
				<Link to="/login" role="button" className="btn btn-default">
					Login First !
				</Link>
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

function mapStateToProps(state) {
	return {
		messages: state.message.posts,
		message: state.message.message
	}
}

export default connect(mapStateToProps)(Contact)
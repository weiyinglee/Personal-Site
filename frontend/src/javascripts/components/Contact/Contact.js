"use strict"

//import dependencies
import React from "react"
import { connect } from "react-redux"
import cookie from "react-cookie"
import { Link } from "react-router"
import { Panel, Button } from "react-bootstrap"

//import source
import { fetchMessage, addMessage, updateMessage, deleteMessage, addResponse } from "../../actions/ContactAction"

class Contact extends React.Component {

	constructor() {
		super()
		this.state = {
			user: cookie.load("user"),
			editId: -1
		}
	}

	addZeroBefore(n) {
		return (n < 10 ? '0' : '') + n
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
		
		let refValue = "new_message_" + id
		let newMessage = this.refs[refValue].value
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

	updateResponse(id) {

		let refValue = "new_response_" + id
		let newResponse = this.refs[refValue].value
		let data = {response: newResponse}


		this.props.dispatch(addResponse(id, data))
	}

	editPost(id) {
		if(this.state.editId == -1) {
			this.setState({editId: id})
		}else {
			this.setState({editId: -1})
		}
	}

	deletePost(id) {
		this.props.dispatch(deleteMessage(id))
	}

	groupPostsForAdmin(messages) {
	
		let groups = {}
		let myArray = []
		
		messages.map((message, index) => {
			let groupName = message.user
			if(!groups[groupName]) {
				groups[groupName] = []
			}
			groups[groupName].push({
				id: message.id,
				posts: message.posts,
				response: message.response
			})
		})

		for(var groupName in groups) {
			myArray.push({
				user: groupName,
				user_posts: groups[groupName]
			})
		}
		
		return myArray
	}

	componentWillMount() {
		this.props.dispatch(fetchMessage())
	}

	render() {

		let messageBlk

		if(this.state.user && this.state.user.admin){
			messageBlk = (
				<div>
				{
					this.groupPostsForAdmin(this.props.messages).map((group, index) => {
						
						let postBlk = (
							<div>
							{
								group.user_posts.map((message, index) => {
									let ref = "new_response_" + message.id
									return (
										<li key={index}>
											<Panel header={message.date} bsStyle="warning">
												<div className="message-post">
													<span className="message-text">{message.posts}</span>
													<a className="btn btn-xs" onClick={this.deletePost.bind(this, message.id)}>
														<span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
													</a>
												</div>
												<div className="message-response">
													<h5>WeiYing: </h5>
													<div className="form-group">
														<textarea ref={ref} className="form-control" placeholder="New response.." defaultValue={message.response}></textarea>
														<Button bsSize="xsmall" bsStyle="warning" onClick={this.updateResponse.bind(this, message.id)}>Update</Button>
													</div>
												</div>
											</Panel>
										</li>
									)	
								})
							}
							</div>
						)

						return (
							<div className="message-area" key={index}>				
								<div className="page-header message-area-title">
									<h4>Message from {group.user}</h4>
								</div>
								<div className="message-lists">
									<ul>
										{postBlk}
									</ul>
								</div>
							</div>
						)

					})
				}
				</div>
			)
		}
		else if(this.state.user && this.state.user.login) {
			messageBlk = (
				<div className="message-area">				
					<div className="page-header message-area-title">
						<h4>Hi {this.state.user.username}, here are your messages!</h4>
					</div>
					<div className="message-lists">
						<ul>
							{
								this.props.messages.map((message, index) => {
									let ref = "new_message_" + message.id
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
										if(this.state.editId == message.id){
											editBlk = (
												<div className="form-group">
													<textarea ref={ref} className="form-control" placeholder="New message.." defaultValue={message.posts}></textarea>
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
														<a className="btn btn-xs" onClick={this.editPost.bind(this, message.id)}>
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
"use strict"

//import dependencies
import React from "react"
import { connect } from "react-redux"
import cookie from "react-cookie"
import { Grid, Row, Col, Button, Panel } from "react-bootstrap"
import { loginUser } from "../../actions/LoginAction"
import $ from "jquery"

class Login extends React.Component {
	
	constructor() {
		super()
		this.state = {
			login: cookie.load("login")
		}
	}

	login() {
		let acct = this.refs.account.value
		let pw = this.refs.password.value

		this.props.dispatch(loginUser(acct, pw))
	}

	//reg
	reg() {
		$.post("http://localhost:3000/api/reg", {
			account: "EricLee1009",
			password: "Spider1009"
		}, (res) => {
			console.log(res)
		})
	}

	componentWillMount() {
		if(this.state.login) {
			location.replace("/#/")
		}
	}

	render() {
		return (
			<Grid className="login-sec">
				<Row className="login-area">
					<Col>
						<Row className="login-sec-title">
							<div className="page-header">
								<h1 className="title-head">LOGIN SECTION</h1>
							</div>
						</Row>
						<Row>
							<Col md={3}></Col>
							<Col md={6}>
								<Panel className="login-panel" bsStyle="warning">
									<form>
										<div className="form-group">
											<input ref="account" type="text" className="form-control" placeholder="Enter account"/>
										</div>
										<div className="form-group">
											<input ref="password" type="password" className="form-control" placeholder="Enter password"/>
										</div>
										<Button onClick={this.login.bind(this)} bsStyle="warning">Login</Button>
									</form>
								</Panel>
							</Col>
							<Col md={3}></Col>
						</Row>
					</Col>
				</Row>
				<Row className="reg-area">
					<Col>
						<Row className="login-sec-title">
							<div className="page-header">
								<h1 className="title-head">REGISTER SECTION</h1>
							</div>
						</Row>
						<Row>
							<Col md={3}></Col>
							<Col md={6}>
								<Panel className="login-panel" bsStyle="success">
									<form>
										<div className="form-group">
											<input ref="new_account" type="text" className="form-control" placeholder="Create account"/>
										</div>
										<div className="form-group">
											<input ref="new_password" type="password" className="form-control" placeholder="Create password"/>
										</div>
										<div className="form-group">
											<input ref="new_password2" type="password" className="form-control" placeholder="Enter password Again"/>
										</div>
										<Button onClick={this.reg.bind(this)} bsStyle="success">Register</Button>
									</form>
								</Panel>
							</Col>
							<Col md={3}></Col>
						</Row>
					</Col>
				</Row>
			</Grid>
		)
	}
}

function matchStateToProps(state) {
	return {
		login: state.userLogin.login
	}
}

export default connect(matchStateToProps)(Login)

"use strict";

//import dependencies
import React from "react";
import { connect } from "react-redux";
import cookie from "react-cookie";
import { Button } from "react-bootstrap";
import { loginUser } from "../../actions/LoginAction";
import $ from "jquery";

class Login extends React.Component {
	
	constructor() {
		super();
		this.state = {
			login: cookie.load("login")
		}
	}

	login() {
		let acct = this.refs.account.value;
		let pw = this.refs.password.value;

		this.props.dispatch(loginUser(acct, pw));
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
			<div className="login-sec">
				<form>
					<div className="form-group">
						<input ref="account" type="text" className="form-control" placeholder="Enter account"/>
					</div>
					<div className="form-group">
						<input ref="password" type="password" className="form-control" placeholder="Enter password"/>
					</div>
					<Button onClick={this.login.bind(this)}>Login</Button>
				</form>
			</div>	
		)
	}
}

function matchStateToProps(state) {
	return {
		login: state.userLogin.login
	}
}

export default connect(matchStateToProps)(Login)
import React from "react"

import Header from "./Header/Header"
import Footer from "./Footer/Footer"

import "../../stylesheets/style.scss"

class Layout extends React.Component {
	render() {
		return (
			<div className="unselectableText">
				<Header path={this.props.location.pathname}/>
				<div className="container-fluid" id="content">
					{this.props.children}
				</div>
				<Footer />
			</div>
		)
	}
}

export default Layout
import React from "react"

import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

class Layout extends React.Component {
	render() {
		return (
			<div className="unselectableText">
				/* Pass in the React-Router pathname as props nameed path to Header*/
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
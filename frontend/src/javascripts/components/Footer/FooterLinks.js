import React from "react";

class FooterLinks extends React.Component {
	render() {
		return (
			<div>
				<ul id="link-list">
					<li>
						<a target="_blank" href="https://www.facebook.com/weiyinglee" title="Facebook"><img src="../../images/icons/facebook.png"/></a>
					</li>
					<li>
						<a target="_blank" href="https://www.linkedin.com/in/weiyinglee" title="Linkedin"><img src="../../images/icons/linkedin.png"/></a>
					</li>
					<li>
						<a target="_blank" href="https://instagram.com/ericleee1009" title="Instagram"><img src="../../images/icons/ig.png"/></a>
					</li>
					<li>
						<a target="_blank" href="https://github.com/weiyinglee" title="GitHub"><img src="../../images/icons/github.png"/></a>
					</li>
				</ul>
			</div>			
		)
	}
}

export default FooterLinks
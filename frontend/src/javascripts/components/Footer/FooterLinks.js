import React from "react";

//load img
import facebookImg from "../../../images/icons/facebook.png"
import linkedinImg from "../../../images/icons/linkedin.png"
import instagramImg from "../../../images/icons/ig.png"
import githubImg from "../../../images/icons/github.png"

class FooterLinks extends React.Component {
	render() {
		return (
			<div>
				<ul id="link-list">
					<li>
						<a target="_blank" href="https://www.facebook.com/weiyinglee" title="Facebook"><img src={facebookImg}/></a>
					</li>
					<li>
						<a target="_blank" href="https://www.linkedin.com/in/weiyinglee" title="Linkedin"><img src={linkedinImg}/></a>
					</li>
					<li>
						<a target="_blank" href="https://instagram.com/ericleee1009" title="Instagram"><img src={instagramImg}/></a>
					</li>
					<li>
						<a target="_blank" href="https://github.com/weiyinglee" title="GitHub"><img src={githubImg}/></a>
					</li>
				</ul>
			</div>			
		)
	}
}

export default FooterLinks
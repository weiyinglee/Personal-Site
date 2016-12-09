"use strict"

//import dependencies
import React from "react"
import { Router, Route, IndexRoute, browserHistory } from "react-router"

//import the routes components
import Layout from "./components/layout"
import Home from "./components/Home/Home"
import About from "./components/About/About"
import Project from "./components/Project/Project"
import Contact from "./components/Contact/Contact"
import Login from "./components/Auth/Login"

//router
const router = (
	<Router history={browserHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Home} />
			<Route path="/about" component={About} />
			<Route path="/project" component={Project} />
			<Route path="/contact" component={Contact} />
			<Route path="/login" component={Login} />
		</Route>
	</Router>
)

export default router
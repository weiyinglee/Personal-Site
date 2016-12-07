"use strict"

//import dependencies
import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, IndexRoute, hashHistory } from "react-router"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { Provider } from "react-redux"

//import source
import "../stylesheets/style.scss"

//import components
import Layout from "./components/layout"
import Home from "./components/Home/Home"
import About from "./components/About/About"
import Project from "./components/Project/Project"
import Contact from "./components/Contact/Contact"
import Login from "./components/Auth/Login"

//import reducer
import reducer from "./reducers"

//rendering place
const app = document.getElementById("root")

//creating store
const middleware = applyMiddleware(thunk)
const store = createStore(reducer, middleware)

ReactDOM.render((
	<Provider history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Home} />
			<Route path="/about" component={About} />
			<Route path="/project" component={Project} />
			<Route path="/contact" component={Contact} />
			<Route path="/login" component={Login} />
		</Route>
	</Provider>
), app)
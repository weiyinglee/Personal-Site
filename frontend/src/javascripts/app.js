"use strict"

//import dependencies
import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { Provider } from "react-redux"

//import source
import "../stylesheets/style.scss"

//import modules
import router from "./routes"

//import reducer
import reducer from "./reducers"

//rendering place
const app = document.getElementById("root")

//creating store
const middleware = applyMiddleware(thunk)
const store = createStore(reducer, middleware)

ReactDOM.render((
	<Provider store={store}>
		{router}
	</Provider>
), app)
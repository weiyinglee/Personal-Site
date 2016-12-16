"use strict"

export default function reducer(state={
	posts: [],
	message: ""
}, action) {
	switch(action.type) {
		case "FETCH_MESSAGE":
			return {...state, posts: action.payload}
			break
		case "ADD_MESSAGE":
			return {...state, message: action.payload}
			break
		case "UPDATE_MESSAGE":
			return {...state, message: action.payload}
			break
		case "DELETE_MESSAGE":
			return {...state, message: action.payload}
			break
		case "ADD_RESPONSE":
			return {...state, message: action.payload}
			break
	}
	return state
}
"use strict"

export default function reducer(state={
	experience: [],
	message: ""
}, action) {
	switch(action.type) {
		case "FETCH_WORK":
			return {...state, experience: action.payload}
			break
		case "ADD_WORK":
			return {...state, message: action.payload}
			break
		case "UPDATE_WORK":
			return {...state, message: action.payload}
			break
		case "DELETE_WORK":
			return {...state, message: action.payload}
			break
	}
	return state
}

"use strict"

export default function reducer(state={
	award: [],
	message: ""
}, action) {
	switch(action.type) {
		case "FETCH_AWARD":
			return {...state, award: action.payload}
			break
		case "ADD_AWARD":
			return {...state, message: action.payload}
			break
		case "UPDATE_AWARD":
			return {...state, message: action.payload}
			break
		case "DELETE_AWARD":
			return {...state, message: action.payload}
			break
	}
	return state
}
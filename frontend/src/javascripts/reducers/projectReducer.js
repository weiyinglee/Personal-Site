"use strict"

export default function reducer(state={
	projects: [],
	message: ""
}, action) {
	switch(action.type) {
		case "FETCH_PROJECT":
			return {
				...state,
				projects: action.payload
			}
			break
		case "ADD_PROJECT":
			return {
				...state,
				message: action.payload
			}
			break
		case "DELETE_PROJECT":
			return {
				...state,
				message: action.payload
			}
			break
		case "UPDATE_PROJECT":
			return {
				...state,
				message: action.payload
			}
			break
	}
	return state
}
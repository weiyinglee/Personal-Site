"use strict"

export default function reducer(state={
	skills: [],
	message: ""
}, action) {
	switch(action.type) {
		case "FETCH_SKILLS":
			return {...state, skills: action.payload}
			break
		case "ADD_SKILL":
			return {...state, message: action.payload}
			break
		case "UPDATE_SKILL":
			return {...state, message: action.payload}
			break
		case "DELETE_SKILL":
			return {...state, message: action.payload}
			break
	}
	return state
}
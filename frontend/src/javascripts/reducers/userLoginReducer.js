"use strict"

export default function reducer(state={
	login: false
}, action) {
	switch(action.type) {
		case "USER_LOGIN":
			return {...state, login: action.payload}
			break
	}
	return state
}
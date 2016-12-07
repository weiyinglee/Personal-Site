"use stric"

export default function reducer(state={
	summary: "",
	intro: "",
	message: ""
}, action) {
	switch(action.type) {
		case "FETCH_ABOUT_SUMMARY":
			return {...state, summary: action.payload}
			break
		case "FETCH_ABOUT_INTRO":
			return {...state, intro: action.payload}
			break
		case "UPDATE_ABOUT_INTRO":
			return {...state, message: action.payload}
			break
		case "UPDATE_ABOUT_SUMMARY":
			return {...state, message: action.payload}
			break
		case "ADD_WORK":
			return {...state, message: action.payload}
			break
		case "UPDATE_WORK":
			return {...state, message: action.payload}
			break
	}
	return state
}

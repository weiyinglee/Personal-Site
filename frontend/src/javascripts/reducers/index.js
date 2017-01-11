import { combineReducers } from "redux";

import userLoginReducer from "./userLoginReducer"
import aboutReducer from "./aboutReducer"
import messageReducer from "./messageReducer"
import projectReducer from "./projectReducer"
import workReducer from "./workReducer"
import skillsReducer from "./skillsReducer"

const allReducers = combineReducers({
	userLogin: userLoginReducer,
	message: messageReducer,
	about: aboutReducer,
	experience: workReducer,
	project: projectReducer,
	skills: skillsReducer
})

export default allReducers
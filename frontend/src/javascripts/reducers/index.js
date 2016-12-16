import { combineReducers } from "redux";

import userLoginReducer from "./userLoginReducer"
import aboutReducer from "./aboutReducer"
import messageReducer from "./messageReducer"
import projectReducer from "./projectReducer"
import workReducer from "./workReducer"

const allReducers = combineReducers({
	userLogin: userLoginReducer,
	message: messageReducer,
	about: aboutReducer,
	experience: workReducer,
	project: projectReducer
})

export default allReducers
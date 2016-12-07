import { combineReducers } from "redux";

import userLoginReducer from "./userLoginReducer"
import aboutReducer from "./aboutReducer"
import projectReducer from "./projectReducer"
import workReducer from "./workReducer"

const allReducers = combineReducers({
	userLogin: userLoginReducer,
	about: aboutReducer,
	experience: workReducer,
	project: projectReducer
})

export default allReducers
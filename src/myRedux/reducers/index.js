import { combineReducers } from "redux";
import logoutReducers from "./logoutReducers";

let combine = combineReducers({
    logoutReducers,
})

export default combine;
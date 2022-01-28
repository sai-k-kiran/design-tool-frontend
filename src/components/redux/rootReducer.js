import { combineReducers } from "redux";
import designReducer from "./Design/DesignReducer";
import userReducer from "./User/UserReducer";

export default combineReducers({
    user : userReducer,
    design: designReducer
})
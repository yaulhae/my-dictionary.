import { combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import dictionary from "./dictionary";

const middlewares = [thunk];
const rootReducer = combineReducers({
  dictionary,
});
export const enhancer = applyMiddleware(...middlewares);

export default rootReducer;

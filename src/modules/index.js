import { combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import dictionary from "./dictionary";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["dictionary"],
};

const middlewares = [thunk];

const rootReducer = combineReducers({
  dictionary,
});

export const enhancer = applyMiddleware(...middlewares);

export default persistReducer(persistConfig, rootReducer);

import { Platform, AsyncStorage } from "react-native";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

const middlewares = applyMiddleware(thunk);

let enhancer;
if(__DEV__){
	const devTools = require("remote-redux-devtools");
	enhancer = compose(
		middlewares,
		// autoRehydrate(),
		devTools({
			name: Platform.OS,
			hostname: "localhost",
			port: 5678
		})
	);
}
else{
	enhancer = compose(middlewares);
}

export default function configureStore(initialState) {
	const store = createStore(reducer, initialState, enhancer);
	return store;
}
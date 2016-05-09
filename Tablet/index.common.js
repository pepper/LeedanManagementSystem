/* @flow */
"use strict";

import React, { AppRegistry, Component } from "react-native";
// import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import createStore from "./ldsm/configureStore";
// import reducers from "../reducers/index";

// let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// let reducer = combineReducers(reducers);
// let store = createStoreWithMiddleware(reducer);

import LDSM from "./ldsm/containers";

const store = createStore();

// class Tablet extends Component{
// 	render(){
// 		return (
// 			<Provider store={store}>
// 				<LDSM />
// 			</Provider>
// 		);
// 	}
// }

const Tablet = () => (
	<Provider store={store}>
		<LDSM />
	</Provider>
);

AppRegistry.registerComponent("Tablet", () => Tablet);


// "use strict";

// import React, { AppRegistry } from "react-native";
// import { Provider } from "react-redux";
// import createStore from "./live_player/configureStore";
// import LivePlayerApp from "./live_player";

// const store = createStore();

// const LivePlayer = () => (
// 	<Provider store={store}>
// 		<LivePlayerApp />
// 	</Provider>
// );

// AppRegistry.registerComponent("player", () => LivePlayer);
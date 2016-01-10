/* @flow */
"use strict";

import React, { AppRegistry, Component } from "react-native";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux/native";

import reducers from "../reducers/index";

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let reducer = combineReducers(reducers);
let store = createStoreWithMiddleware(reducer);

import App from "./app";

class Tablet extends Component{
	render(){
		return (
			<Provider store={store}>
				{() => <App />}
			</Provider>
		);
	}
}

AppRegistry.registerComponent("Tablet", () => Tablet);
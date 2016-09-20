/* @flow */
"use strict";

import React from "react";

import { AppRegistry } from "react-native";

import { Provider } from "react-redux";
import createStore from "./ldsm/configureStore";

import LDSM from "./ldsm/containers";

const store = createStore();

const Tablet = () => (
	<Provider store={store}>
		<LDSM />
	</Provider>
);

AppRegistry.registerComponent("Tablet", () => Tablet);
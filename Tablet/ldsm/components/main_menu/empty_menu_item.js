/* @flow */
"use strict";

import React, { Component, StyleSheet, View } from "react-native";
import { Color, Size } from "../../definitions";

let style = StyleSheet.create({
	container:{
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: Size.row_height,
		borderColor: Color.light_yellow,
		borderBottomWidth: 0.5
	}
});

export default class EmptyMenuItem extends Component{
	render(){
		return (
			<View style={style.container} />
		);
	}
}
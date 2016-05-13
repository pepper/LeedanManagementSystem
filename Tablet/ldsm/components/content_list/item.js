/* @flow */
"use strict";

import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text, ListView} from "react-native";
import { Color, Size } from "../../definitions";

let style = StyleSheet.create({
	container:{
		flex: 0,
		height: Size.row_height,
		borderColor: Color.yellow,
		borderBottomWidth: Size.row_border_width,
		backgroundColor: Color.transparent
	}
});

export default class Item extends Component{
	render(){
		return (
			<View style={[style.container, this.props.style]}>
				{this.props.children}
			</View>
		);
	}
}
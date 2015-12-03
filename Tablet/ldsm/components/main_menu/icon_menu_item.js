/* @flow */
"use strict";

import React, { Component, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Color } from "../../definitions";

let iconSize = 40;
let style = StyleSheet.create({
	container:{
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	icon:{
		width: iconSize,
		height: iconSize,
		marginBottom: 5,
	},
	text:{
		fontSize: 10,
		color: Color.gray,
	},
	selectedItem:{
		color: Color.black,
	},
});

export default class IconMenuItem extends Component{
	render(){
		return (
			<View style={style.container}>
				<Icon name={this.props.icon} size={iconSize} color={(this.props.selected)?Color.black:Color.gray} style={style.icon} />
				<Text style={[style.text, this.props.selected && style.selectedItem]}>{this.props.text}</Text>
			</View>
		);
	}
}
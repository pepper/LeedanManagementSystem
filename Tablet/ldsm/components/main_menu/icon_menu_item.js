/* @flow */
"use strict";

import React, { Component, PropTypes, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Color, Size } from "../../definitions";

let iconSize = 40;
let style = StyleSheet.create({
	container:{
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: Size.row_height,
		borderColor: Color.light_yellow,
		borderBottomWidth: 0.5
	},
	icon:{
		width: iconSize,
		height: iconSize,
		marginBottom: 5
	},
	text:{
		fontSize: 10,
		color: Color.gray
	},
	selectedItem:{
		color: Color.black
	}
});

export default class IconMenuItem extends Component{
	static propTypes = {
		color: PropTypes.string,
		icon: PropTypes.string,
		menuItemKey: PropTypes.string,
		onPress: PropTypes.func,
		selected: PropTypes.bool,
		selectedColor: PropTypes.string,
		text: PropTypes.string
	};
	static defaultProps = {
		color: Color.gray,
		icon: "exclamation-triangle",
		selected: false,
		selectedColor: Color.black,
		text: ""
	};
	handlerPress = () => {
		this.props.onPress(this.props.menuItemKey);
	};
	render(){
		return (
			<TouchableOpacity onPress={this.handlerPress}>
				<View style={style.container}>
					<Icon
						name={this.props.icon}
						size={iconSize}
						color={(this.props.selected)?Color.black:Color.gray}
						style={style.icon}
					/>
					<Text style={[style.text, this.props.selected && style.selectedItem]}>{this.props.text}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}
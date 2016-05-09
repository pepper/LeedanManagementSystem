/* @flow */
"use strict";

import React, { Component, PropTypes, StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { Color, Size } from "../../definitions";
import Item from "./item";

const style = StyleSheet.create({
	container:{
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	iconColumn:{
		flex: 0,
		alignItems: "center",
		justifyContent: "center",
		height: Size.row_height - Size.row_border_width,
		width: Size.row_height,
	},
	textColumn:{
		flex: 1,
		fontSize: 18,
		fontWeight: "bold",
		lineHeight: 24,
		paddingTop: -2,
		paddingLeft: 12
	},
});

export default class Button extends Component {
	static propTypes = {
		onPress: PropTypes.func.isRequired,
		icon: PropTypes.string,
		text: PropTypes.string.isRequired,
		mode: PropTypes.string,
		color: PropTypes.string,
	};
	static defaultProps = {
		mode: "icon-text",
		color: Color.light_blue
	};
	render(){
		let order = this.props.mode.split("-");
		return (
			<Item style={this.props.style}>
				<TouchableWithoutFeedback onPress={this.props.onPress}>
					<View style={style.container}>
						{
							(order[0] && order[0] == "icon")?
							<View style={style.iconColumn} key={order.shift()}>
								<Icon name={this.props.icon} size={Size.row_height * 0.7} color={this.props.color} />
							</View>
							:
							null
						}
						{
							(order[0] && order[0] == "text")?
							<Text style={[style.textColumn, {color: this.props.color}]} key={order.shift()}>{this.props.text}</Text>
							:
							null
						}
						{
							(order[0] && order[0] == "icon")?
							<View style={style.iconColumn} key={order.shift()}>
								<Icon name={this.props.icon} size={Size.row_height * 0.7} color={this.props.color} />
							</View>
							:
							null
						}
					</View>
				</TouchableWithoutFeedback>
			</Item>
		)
	}
}
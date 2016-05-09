/* @flow */
"use strict";

import React, { Component, PropTypes, StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { Color, Size } from "../../definitions";

export default class IconTextButton extends Component {
	static propTypes = {
		onPress: PropTypes.func.isRequired,
		icon: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		size: PropTypes.number,
		isVertical: PropTypes.bool,
	};
	static defaultProps = {
		onPress: () => {
			console.log("Icon text button onPress function not defined.");
		},
		icon: "exclamation-triangle",
		text: "Not Defined",
		color: Color.yellow,
		isVertical: false,
	};
	handlerPress = () => {
		this.props.onPress(this.props.text);
	};
	render(){
		const style = StyleSheet.create({
			container:{
				flexDirection: (this.props.isVertical)?"column":"row",
				justifyContent: "flex-start",
				alignItems:"center",
			},
			icon:{
				width: this.props.size,
				height: this.props.size,
				justifyContent: "center",
				alignItems:"center",
			},
			text:{
				color: this.props.color,
				fontSize: (this.props.isVertical)?(this.props.size / 3):(this.props.size / 3) * 2,
				fontWeight: "bold"
			},
		});
		return (
			<TouchableWithoutFeedback onPress={this.handlerPress}>
				<View style={style.container}>
					<Icon name={this.props.icon} size={this.props.size} color={this.props.color} style={style.icon} />
					<Text style={style.text}>{this.props.text}</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}
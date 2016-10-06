/* @flow */
"use strict";

import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text, TouchableWithoutFeedback} from "react-native";
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
	avatar:{
		height: Size.row_height * 0.6,
		width: Size.row_height * 0.6,
		marginLeft: 10,
		borderRadius: 25,
		justifyContent: "center", 
		alignItems: "center"
	},
	avatarText:{
		textAlign: "center",
		fontSize: 28,
		fontWeight: "bold",
		color: Color.dark,
		backgroundColor: Color.transparent,
	},
	textColumn:{
		flex: 1,
		fontSize: 18,
		fontWeight: "bold",
		lineHeight: 24,
		paddingTop: -2,
		paddingLeft: 12
	},
	subTextColumn:{
		flex: 1,
		fontSize: 14,
		fontWeight: "bold",
		paddingTop: 5,
		paddingLeft: 12
	},
	text2LineColumn:{
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		backgroundColor: Color.transparent,
	}
});

export default class Button extends Component {
	static propTypes = {
		onPress: PropTypes.func,
		onLongPress: PropTypes.func,
		icon: PropTypes.string,
		text: PropTypes.string,
		subText: PropTypes.string,
		mode: PropTypes.string,
		color: PropTypes.string,
		selectTextColor: PropTypes.string,
		avatarText: PropTypes.string,
		selectAvatarTextColor: PropTypes.string,
		selected: PropTypes.bool,
		style: View.propTypes.style,
		selectedStyle: View.propTypes.style,
	};
	static defaultProps = {
		mode: "icon-text",
		color: Color.light_blue
	};
	render(){
		let order = this.props.mode.split("-");
		return (
			<Item style={[this.props.style, this.props.selected && this.props.selectedStyle]}>
				<TouchableWithoutFeedback onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
					<View style={style.container}>
						{
							(order[0] && order[0] == "avatar")?
							<View style={style.iconColumn} key={order.shift()}>
								<View style={[style.avatar, {backgroundColor: this.props.color}, this.props.selected && {backgroundColor: this.props.selectAvatarTextColor || this.props.color}]}>
									<Text style={[style.avatarText]}>{this.props.avatarText || this.props.text[0]}</Text>
								</View>
							</View>
							:
							null
						}
						{
							(order[0] && order[0] == "icon")?
							<View style={style.iconColumn} key={order.shift()}>
								<Icon name={this.props.icon} size={Size.row_height * 0.6} color={this.props.color} />
							</View>
							:
							null
						}
						{
							(order[0] && order[0] == "text")?
							<Text style={[style.textColumn, {color: this.props.color}, this.props.selected && {color: this.props.selectTextColor || this.props.color}]} key={order.shift()}>{this.props.text}</Text>
							:
							null
						}
						{
							(order[0] && order[0] == "text2line")?
							<View style={style.text2LineColumn}>
								<Text lineBreakMode={"tail"} numberOfLines={1} style={[style.textColumn, ((this.props.text.length > 10)?{fontSize:14}:{}) ,{color: this.props.color}]} key={order.shift()}>{this.props.text}</Text>
								<Text style={[style.subTextColumn, {color: this.props.color}]} key={order.shift()}>{this.props.subText}</Text>
							</View>
							:
							null
						}
						{
							(order[0] && order[0] == "icon")?
							<View style={style.iconColumn} key={order.shift()}>
								<Icon name={this.props.icon} size={Size.row_height * 0.6} color={this.props.color} />
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
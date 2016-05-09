/* @flow */
"use strict";

import React, { Component, StyleSheet, View } from "react-native";
import RoundButton from "../basic/round_button";

const style = StyleSheet.create({
	keypad:{
		flexDirection: "row",
		flexWrap: "wrap",
		paddingTop: 35,
		paddingLeft: 35,
	},
	key:{
		margin: 20,
	}
});

export default class Keypad extends Component {
	state = {
		number: false,
		leave: false,
		duty: false,
		lunch: false
	};
	componentWillMount(){
		this.rebuildState(this.props);
	}
	componentWillReceiveProps(newProps){
		this.rebuildState(newProps);
	}
	rebuildState(props){
		switch(props.mode){
			case "login":
				this.setState({
					number: true,
					leave: false,
					duty: false,
					lunch: false,
				});
				break;
			case "employee":
				this.setState({
					number: false,
					leave: false,
					duty: true,
					lunch: true,
				});
				break;
			case "leave_manager":
				this.setState({
					number: false,
					leave: true,
					duty: true,
					lunch: true,
				});
				break;
		}
	}
	handleKeyPress = (key) => {
		this.props.callback(key);
	};
	render(){
		let types = [];
		types["number"] = "blue";
		types["duty"] = "yellow";
		types["leave"] = "blueHole";
		types["lunch"] = "orange";

		let smalls = [];
		smalls["number"] = false;
		smalls["duty"] = true;
		smalls["leave"] = true;
		smalls["lunch"] = false;

		let keyList = [
			{ type: "number", text: "1" },
			{ type: "number", text: "2" },
			{ type: "number", text: "3" },
			{ type: "duty", text: "上班" },
			{ type: "number", text: "4" },
			{ type: "number", text: "5" },
			{ type: "number", text: "6" },
			{ type: "duty", text: "休息" },
			{ type: "number", text: "7" },
			{ type: "number", text: "8" },
			{ type: "number", text: "9" },
			{ type: "duty", text: "下班" },
			{ type: "leave", text: "事假" },
			{ type: "leave", text: "病假" },
			{ type: "leave", text: "特休" },
			{ type: "lunch", text: "訂餐", icon: "cutlery" },
		];

		return (
			<View style={style.keypad}>
				{
					keyList.map((key) => {
						let property = {
							key: "Key" + key.text,
							type: types[key.type],
							icon: key.icon,
							text: key.text,
							size: 100,
							smallFont: smalls[key.type],
							active: this.state[key.type],
							onPress: this.handleKeyPress,
						};
						return (
							<View style={style.key} key={"KeyContainer" + property.text}>
								<RoundButton {...property} />
							</View>
						);
					})
				}
			</View>
		);
	}
}
/* @flow */
"use strict";

import React, { Component, View, Text } from "react-native";
import IconMenuItem from "../components/main_menu/icon_menu_item";

exports.Menu = class extends Component {
	render(){
		return (
			<IconMenuItem text={"Time Punch"} icon={"bell-o"} selected={this.props.selected}/>
		);
	}
}

exports.Container = class extends Component {
	render(){
		return (
			<View>
				<Text>{"Punch container"}</Text>
			</View>
		);
	}
}
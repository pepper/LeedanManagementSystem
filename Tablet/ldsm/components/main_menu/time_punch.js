/* @flow */
"use strict";

import React, { Component } from "react-native";

import IconMenuItem from "./icon_menu_item";

export default class Menu extends Component {
	render(){
		return (
			<IconMenuItem
				text={"Time Punch"}
				icon={"bell-o"}
				{...this.props}
			/>
		);
	}
}
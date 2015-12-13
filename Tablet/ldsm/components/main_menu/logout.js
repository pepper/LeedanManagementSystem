/* @flow */
"use strict";

import React, { Component, View } from "react-native";
import IconMenuItem from "./icon_menu_item";

export default class extends Component {
	render(){
		return (
			<View>
				<IconMenuItem text={"Logout"} icon={"power-off"} selected={true}/>
			</View>
		);
	}
}
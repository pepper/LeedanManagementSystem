/* @flow */
"use strict";

import React, {Component} from "react";
import {View} from "react-native";
import IconMenuItem from "./icon_menu_item";

export default class Logout extends Component {
	render(){
		return (
			<View>
				<IconMenuItem
					{...this.props}
					text={"Logout"}
					icon={"power-off"}
					selected={true}
				/>
			</View>
		);
	}
}
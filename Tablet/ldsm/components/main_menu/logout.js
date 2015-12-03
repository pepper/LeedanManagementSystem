/* @flow */
"use strict";

import React, { Component} from "react-native";
import IconMenuItem from "./icon_menu_item";

export default class extends Component {
	render(){
		return (
			<IconMenuItem text={"Logout"} icon={"power-off"} selected={true}/>
		);
	}
}
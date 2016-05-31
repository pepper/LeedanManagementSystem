/* @flow */
"use strict";

import React, {Component} from "react";

import IconMenuItem from "./icon_menu_item";

export default class Menu extends Component {
	render(){
		return (
			<IconMenuItem
				text={"Day Book"}
				icon={"money"}
				{...this.props}
			/>
		);
	}
}
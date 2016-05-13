/* @flow */
"use strict";

import React, {Component} from "react";

import IconMenuItem from "./icon_menu_item";

export default class StockManagerMenu extends Component {
	render(){
		return (
			<IconMenuItem
				text={"Stock Manager"}
				icon={"cube"}
				{...this.props}
			/>
		);
	}
}
/* @flow */
"use strict";

import React, {Component} from "react";

import IconMenuItem from "./icon_menu_item";

export default class InvoicingMenu extends Component {
	render(){
		return (
			<IconMenuItem
				text={"Invoicing"}
				icon={"cube"}
				{...this.props}
			/>
		);
	}
}
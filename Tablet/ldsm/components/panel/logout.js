/* @flow */
"use strict";

import React, { Component, PropTypes } from "react-native";
import ConfirmPanel from "./confirm";
import { I18n } from "../../definitions";

import { Company, Panel } from "../../actions";

export default class LogoutPanel extends Component{
	static propTypes = {
		dispatch: PropTypes.func,
		panel: PropTypes.object
	};
	handleConfirm = () => {
		if(this.props.onLogout){
			this.props.onLogout();
		}
	};
	show = () => {
		this.confirm.show();
	};
	render(){
		return (
			<ConfirmPanel
				ref={(ref) => this.confirm = ref}
				title={I18n.t("logout_panel_msssage")}
				confirmButtonText={I18n.t("logout")}
				onConfirm={this.handleConfirm}
			/>
		);
	}
}
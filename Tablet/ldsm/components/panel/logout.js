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
	handleCancel = () => {
		this.props.dispatch(Panel.hidePanel());
	};
	handleConfirm = () => {
		this.props.dispatch(Panel.hidePanel());
		this.props.dispatch(Company.logout());
	};
	render(){
		return (
			<ConfirmPanel
				visible={true}
				message={I18n.t("logout_panel_msssage")}
				cancelButtonText={I18n.t("cancel")}
				confirmButtonText={I18n.t("logout")}
				onCancel={this.handleCancel}
				onConfirm={this.handleConfirm}
			/>
		);
	}
}
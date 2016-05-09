/* @flow */
"use strict";

import React, { Component, PropTypes, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import { Color } from "../definitions";

let style = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		width: 1024,
		height: 768,
		flexDirection: "column",
		backgroundColor: Color.transparent_black
	}
});

class PanelContainer extends Component{
	static propTypes = {
		dispatch: PropTypes.func,
		panel: PropTypes.object
	};
	render(){
		let Panel = (this.props.panel.panel_stack.length > 0 && this.props.panel.panel_stack[0].panel) || View;
		let panelProps = (this.props.panel.panel_stack.length > 0 && this.props.panel.panel_stack[0].props) || {};
		return (this.props.panel.panel_stack.length > 0)?(
			<View style={style.container}>
				<Panel
					{...panelProps}
					dispatch={this.props.dispatch}
				/>
			</View>
		)
		:
		(null);
	}
}

export default connect((state) => {
	return {
		panel: state.panel
	};
})(PanelContainer);
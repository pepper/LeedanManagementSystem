/* @flow */
"use strict";

import React, { Component, StyleSheet, PropTypes, View, Modal } from "react-native";
import { Color, Size } from "../../definitions";

const style = StyleSheet.create({
	container: {
		position: "absolute",
		left: 0,
		top: 0,
		flex: 1,
		width: Size.app_width,
		height: Size.app_height,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Color.transparent_black
	},
	panel: {
		flex: 0,
		width: Size.app_width * 0.85,
		height: Size.app_height * 0.7,
		justifyContent: "center",
		alignItems: "stretch",
		backgroundColor: Color.white,
		borderRadius: 16
	}
});

export default class Panel extends Component {
	state = {
		show: false
	};
	hide = () => {
		this.setState({
			show: false
		});
	};
	show = () => {
		this.setState({
			show: true
		});
	};
	render(){
		return (
			<Modal animated={true}
				transparent={true}
				visible={this.state.show}
				onRequestClose={() => {}}
			>
				<View style={style.container}>
					<View style={style.panel}>
						{this.props.children}
					</View>
				</View>
			</Modal>
		);
	}
}
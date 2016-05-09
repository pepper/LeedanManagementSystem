/* @flow */
"use strict";

import React, { Component, StyleSheet, View, Text, ListView, PropTypes } from "react-native";
import { Color, Size } from "../../definitions";

let style = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: Color.transparent,
	},
	innerContainer:{
		flex: 1,
		marginLeft: 4.5,
		marginRight: 4.5,
		flexDirection: "column",
		backgroundColor: Color.transparent,
		borderColor: Color.yellow,
		borderRightWidth: 0.5,
		borderLeftWidth: 0.5
	},
	header:{
		flex: 0,
		height: Size.first_row_height,
		borderColor: Color.light_yellow,
		borderBottomWidth: 0.5,
		alignItems: "flex-start",
		backgroundColor: Color.transparent
	},
	row:{
		flex: 1,
		height: Size.row_height,
		backgroundColor: Color.transparent
	},
	separator:{
		flex: 1,
		height: 0.5,
		backgroundColor: Color.yellow
	}
});

export default class Container extends Component{
	static propTypes = {
		header: PropTypes.node,
		style: View.propTypes.style,
		innerStyle: View.propTypes.style
	};
	render(){
		return (
			<View style={[style.container, this.props.style]}>
				<View style={[style.innerContainer, this.props.innerStyle]}>
					{
						(this.props.header)?
						<View style={style.header}>
							{this.props.header}
						</View>
						:
						null
					}
					{
						this.props.children
					}
				</View>
			</View>
		);
	}
}
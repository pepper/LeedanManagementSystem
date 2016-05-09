/* @flow */
"use strict";

import React, { Component, PropTypes, StyleSheet, View, Text, Image, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { Color, Size } from "../../definitions";
import Item from "./item";

const style = StyleSheet.create({
	container:{
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	selected:{
		backgroundColor: Color.red,
	},
	avatar:{
		height: 50,
		width: 50,
		marginLeft: 10,
		borderRadius: 25,
		backgroundColor: Color.light_blue_overlay,
		justifyContent: "center", 
		alignItems: "center" 
	},
	avatarText:{
		textAlign: "center",
		fontSize: 30,
		fontWeight: "bold",
		color: Color.dark,
		backgroundColor: Color.transparent,
	},
	nameColumn:{
		flexDirection: "column",
		width: 117,
		paddingLeft: 10,
	},
	nameText:{
		color: Color.white,
		marginBottom: 5,
		fontSize: 18,
	},
	idText:{
		color: Color.white,
		fontSize: 16,
		fontWeight: "bold",
	},
	notActiveText:{
		color: Color.white_overlay,
	},
	scoreColumn:{
		flexDirection: "column",
		width: 100,
		paddingTop: 3,
	},
	scoreTitleText:{
		color: Color.light_blue,
		fontSize: 11,
		fontWeight: "bold",
	},
	scoreText:{
		color: Color.light_blue,
		fontSize: 25,
		fontWeight: "bold",
	},
	notActiveBlueText:{
		color: Color.light_blue_overlay
	}
});

export default class People extends Component {
	static propTypes = {
		onPress: PropTypes.func,
		name: PropTypes.string,
		idNumber: PropTypes.string,
		selected: PropTypes.bool,
		totalScore: PropTypes.number
	};
	static defaultProps = {
		name: "",
		idNumber: "",
		selected: false,
		totalScore: 0
	};

	toNumberString = (input) => {
		input += "";
		var x = input.split(".");
		var x1 = x[0];
		var x2 = x.length > 1 ? "." + x[1] : "";
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, "$1" + "," + "$2");
		}
		return x1 + x2;
	};

	render(){
		return (
			<Item style={this.props.style}>
				<TouchableWithoutFeedback onPress={this.props.onPress}>
					<View style={[style.container, (this.props.selected && style.selected)]}>
						{
							(this.props.avatar && this.props.avatar != "")?
							<Image
								style={style.avatar}
								source={{uri: "data:image/jpeg;base64," + this.props.avatar, isStatic: true}}
							/>
							:
							<View style={style.avatar}>
								<Text style={style.avatarText}>{this.props.name[0]}</Text>
							</View>
						}
						
						<View style={[style.nameColumn]}>
							<Text style={[style.nameText, !this.props.active && style.notActiveText]}>{this.props.name}</Text>
							<Text style={[style.idText, !this.props.active && style.notActiveText]}>{this.props.idNumber}</Text>
						</View>
						<View style={style.scoreColumn}>
							<Text style={[style.scoreTitleText, !this.props.active && style.notActiveBlueText]}>{"Total Score"}</Text>
							<Text style={[style.scoreText, !this.props.active && style.notActiveBlueText]} numberOfLines={1}>{this.toNumberString(this.props.totalScore)}</Text>
						</View>
						{
							(!this.props.active)?
							<View style={style.darkOverlay}></View>
							:
							null
						}
					</View>
				</TouchableWithoutFeedback>
			</Item>
		)
	}
}
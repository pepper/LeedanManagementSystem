/* @flow */
"use strict";

import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text, TouchableWithoutFeedback} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { Color, Size } from "../../definitions";
import Item from "./item";

const style = StyleSheet.create({
	container:{
		flex: 1,
		flexDirection: "row",
		backgroundColor: Color.dark_green
	},
	dateContainer:{
		flex: 4,
		flexDirection: "column",
		padding: 10,
		justifyContent: "center"
	},
	dateText:{
		fontSize: 16,
		fontWeight: "bold",
		color: Color.light_blue,
	},
	quantityContainer:{
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-end",
		paddingRight: 10,
	},
	sumContainer:{
		flex: 3,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-end",
		paddingRight: 10,
	},
	iconContainer:{
		flex: 2,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	titleText:{
		fontSize: 11,
		fontWeight: "bold",
		color: Color.light_blue,
	},
	contentText:{
		fontSize: 27,
		fontWeight: "bold",
		color: Color.light_blue,
		paddingTop: 2
	}
});

export default class Summary extends Component {
	static propTypes = {
		quantity: PropTypes.number,
		sum: PropTypes.number,
		date_start: PropTypes.object,
		date_end: PropTypes.object,
	};
	static defaultProps = {
		quantity: 0,
		sum: 0,
		date_start: new Date(),
		date_end: new Date(),
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
	fillZero = (input) => {
		if(input < 10){
			return "0" + input;
		}
		return input + "";
	}
	render(){
		const startDate = this.props.date_start;
		const endDate = this.props.date_end;
		return (
			<Item style={[this.props.style, style.container]}>
				<View style={style.dateContainer}>
					<Text style={style.dateText}>{"目前帳目紀錄區間"}</Text>
					<Text style={[style.dateText, {paddingTop: 7}]}>{startDate.getFullYear() + "." + this.fillZero(startDate.getMonth() + 1) + "." + this.fillZero(startDate.getDate()) + "-" + endDate.getFullYear() + "." + this.fillZero(endDate.getMonth() + 1) + "." + this.fillZero(endDate.getDate())}</Text>
				</View>
				<View style={style.quantityContainer}>
					{
						(!this.props.hideQuantity)?
						(
							<View>
								<Text style={style.titleText}>{"Quantity"}</Text>
								<Text style={style.contentText}>{this.props.quantity + ""}</Text>
							</View>
						)
						:
						null
					}
				</View>
				<View style={style.sumContainer}>
					{
						(!this.props.hideSum)?
						(
							<View>
								<Text style={style.titleText}>{"Sum of Transactions"}</Text>
								<Text style={style.contentText}>{this.toNumberString(this.props.sum)}</Text>
							</View>
						)
						:
						null
					}
				</View>
				<View style={style.iconContainer}>
					<TouchableWithoutFeedback onPress={() => {
						alert("此功能尚未開放");
					}}>
						<Icon name={"print"} size={Size.row_height * 0.6} color={Color.light_blue} />
					</TouchableWithoutFeedback>
				</View>
			</Item>
		)
	}
}
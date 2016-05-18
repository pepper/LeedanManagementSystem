/* @flow */
"use strict";

import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";

import { Color, Size } from "../../definitions";
import ContentList, { Container, Title, Item, List, Button } from "../content_list";

const style = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row"
	},
	leftList: {
		flex: 1,
	},
	rightList:{
		flex: 1,
	},
	hideRightMargin:{
		marginRight: 0
	},
	hideLeftMarginAndBorder:{
		marginLeft: 0,
		borderLeftWidth: 0
	}
});

export default class Supplier extends Component {
	render(){
		return (
			<View style={style.container}>
				<Container style={style.leftList} innerStyle={style.hideRightMargin}>
					<Button
						text={"供應商列表"}
						onPress={() => {}}
						icon={"plus"}
						mode={"text-icon"}
						color={Color.gray}
					/>
					<List itemList={this.props.supplierList}
						minimalRowCount={9}
						renderRow={(rowData, sectionID, rowID, highlightRow) => {
							return (
								<Button
									text={rowData.title}
									onPress={() => {
										this.props.onChangeItem("supplier", rowData._id)
									}}
									mode={"text"}
									color={Color.gray}
								/>
							);
						}}
					/>
				</Container>
				<Container style={style.leftList}  innerStyle={[style.hideRightMargin, style.hideLeftMarginAndBorder]}>
					<Button
						text={"庫存列表"}
						onPress={() => {}}
						icon={"plus"}
						mode={"text-icon"}
						color={Color.gray}
					/>
					<List itemList={this.props.stockList}
						minimalRowCount={4}
						renderRow={(rowData, sectionID, rowID, highlightRow) => {
							return (
								<Button
									text={rowData.title}
									onPress={() => {
										this.props.onChangeItem("stock", rowData._id)
									}}
									mode={"text"}
									color={Color.gray}
								/>
							);
						}}
					/>
					
				</Container>
			</View>
		);
	}
}
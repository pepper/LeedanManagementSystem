/* @flow */
"use strict";

import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";
import { connect } from "react-redux";
import { Invoicing } from "../actions";
import { Color, Size } from "../definitions";

import ContentList, { Container, Title, Item, List, Button } from "../components/content_list";
import SearchBar from "../components/search/container";

const style = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row"
	},
	innerContainer: {
		flex: 1,
		flexDirection: "column"
	},
	listContainer: {
		flex: 1,
		flexDirection: "row"
	},
	shoppingCartContainer: {
		width: Size.row_height,
		backgroundColor: Color.black
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
	},
	shoppingCartTitle:{
		height: Size.first_row_height
	}
});

class InvoicingContainer extends Component {
	constructor(props){
		super(props);
	}
	handleLoadDataFromServer = () => {
		this.props.dispatch(Invoicing.loadDataFromServer());
	};
	render(){
		return (
			<View style={style.container}>
				<View style={style.innerContainer}>
					<SearchBar 
						listToSearch={(this.props.stock.stock_list || []).map((stock) => {
							return {
								key: stock._id,
								name: "● " + stock.title + " ● " + stock.specification,
								search_text: JSON.stringify(stock)
							};
						})}
						selectSearchResult={this.handleSelectSearchResult}
					/>
				</View>
				<View style={style.shoppingCartContainer}>
					<Button
						text={""}
						onLongPress={this.handleLoadDataFromServer}
						icon={"pencil"}
						mode={"icon"}
						color={Color.yellow}
						style={style.shoppingCartTitle}
					/>
				</View>
			</View>
		);
	}
}

export default connect((state) => {
	return {
		product: state.product,
		stock: state.stock,
		company: state.company,
	};
})(InvoicingContainer);
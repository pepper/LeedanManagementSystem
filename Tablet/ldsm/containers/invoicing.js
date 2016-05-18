/* @flow */
"use strict";

import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";
import { connect } from "react-redux";
import { get } from "nested-property";

import { Invoicing } from "../actions";
import { Color, Size } from "../definitions";
import ContentList, { Container, Title, Item, List, Button } from "../components/content_list";
import { Dashboard, Supplier, Stock } from "../components/invoicing";
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
	},
	shoppingCartItem:{
		height: Size.row_height
	}
});

class InvoicingContainer extends Component {
	constructor(props){
		super(props);
	}
	handleLoadStockFromServer = () => {
		this.props.dispatch(Invoicing.loadStockFromServer());
	};
	handleLoadSupplierFromServer = () => {
		this.props.dispatch(Invoicing.loadSupplierFromServer());
	};
	handleLoadProductFromServer = () => {
		this.props.dispatch(Invoicing.loadProductFromServer());
	};
	handleDashboardItemPress = (type, id) => {
		this.props.dispatch(Invoicing.selectItem(type, id));
	};
	handleChangeCurrentSupplier = (id) => {
		this.props.dispatch(Invoicing.changeCurrentSupplier(id));
	};

	render(){
		let searchList = (get(this.props.invoicing, "stock_list") || []).map((stock) => {
			return Object.assign({}, stock, { item_type: "stock" });
		});
		searchList = searchList.concat((get(this.props.invoicing, "product_list") || []).map((product) => {
			return Object.assign({}, product, { item_type: "product" });
		}));
		searchList = searchList.concat((get(this.props.invoicing, "customer_list") || []).map((customer) => {
			return Object.assign({}, customer, { item_type: "customer" });
		}));
		searchList = searchList.concat((get(this.props.invoicing, "supplier_list") || []).map((supplier) => {
			return Object.assign({}, supplier, { item_type: "supplier" });
		}));
		return (
			<View style={style.container}>
				<View style={style.innerContainer}>
					<SearchBar 
						listToSearch={searchList.map((item) => {
							return {
								item_type: item.item_type,
								key: item._id,
								name: "● " + item.title + " ● " + (item.specification || ""),
								search_text: JSON.stringify(item)
							};
						})}
						selectSearchResult={this.handleDashboardItemPress}
					/>
					{
						(this.props.invoicing.mode == "dashboard")?
						(
							<Dashboard
								stockList={get(this.props.invoicing, "stock_list") || []}
								productList={get(this.props.invoicing, "product_list") || []}
								customerList={get(this.props.invoicing, "customer_list") || []}
								supplierList={get(this.props.invoicing, "supplier_list") || []}
								onChangeItem={this.handleDashboardItemPress}
							/>
						):(null)
					}
					{
						(this.props.invoicing.mode == "supplier")?
						(
							<Supplier 
								stockList={get(this.props.invoicing, "selected_stock_list") || []}
								productList={get(this.props.invoicing, "product_list") || []}
								customerList={get(this.props.invoicing, "customer_list") || []}
								supplierList={get(this.props.invoicing, "supplier_list") || []}
								onChangeItem={this.handleDashboardItemPress}
							/>
						):(null)
					}
					{
						(this.props.invoicing.mode == "stock")?
						(
							<Stock 
								supplierList={get(this.props.invoicing, "selected_supplier_list") || []}
								currentStock={get(this.props.invoicing, "current_stock") || {}}
								currentSupplier={get(this.props.invoicing, "current_supplier") || {}}
								onChangeItem={this.handleDashboardItemPress}
								onChangeCurrentSupplier={this.handleChangeCurrentSupplier}
							/>
						):(null)
					}
				</View>
				<View style={style.shoppingCartContainer}>
					<Button
						text={""}
						onLongPress={() => {}}
						icon={"pencil"}
						mode={"icon"}
						color={Color.yellow}
						style={style.shoppingCartTitle}
					/>
					<Button
						onLongPress={this.handleLoadStockFromServer}
						text={"1"}
						mode={"text"}
						color={Color.yellow}
						style={style.shoppingCartItem}
					/>
					<Button
						onLongPress={this.handleLoadSupplierFromServer}
						text={"2"}
						mode={"text"}
						color={Color.yellow}
						style={style.shoppingCartItem}
					/>
					<Button
						onLongPress={this.handleLoadProductFromServer}
						text={"3"}
						mode={"text"}
						color={Color.yellow}
						style={style.shoppingCartItem}
					/>
				</View>
			</View>
		);
	}
}

export default connect((state) => {
	return {
		invoicing: state.invoicing,
		company: state.company,
	};
})(InvoicingContainer);
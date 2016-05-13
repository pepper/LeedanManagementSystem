/* @flow */
"use strict";

import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";
import { connect } from "react-redux";
import { Stock } from "../actions";
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

class StockManagerContainer extends Component {
	constructor(props){
		super(props);
		if(!props.stock.loaded){
			props.dispatch(Stock.loadStock());
			props.dispatch(Stock.loadSupplier());
		}
	}
	state = {
		
	};
	handleSelectSearchResult = (result) => {
		this.props.dispatch(Stock.getStock(result));
	};
	handleSelectSupplier = (id) => {
		this.props.dispatch(Stock.getSupplier(id));
	};
	render(){
		console.log(this.props.stock);
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
					<View style={style.listContainer}>
						{
							(this.props.stock.current_stock)?
							(
								<Container style={style.leftList} innerStyle={style.hideRightMargin}>
									<Button
										text={
											"品名：" + 
											this.props.stock.current_stock.title + 
											"\n料號：" + 
											this.props.stock.current_stock.serial_number
										}
										onPress={() => {}}
										icon={"pencil"}
										mode={"text-icon"}
										color={Color.yellow}
									/>
									<Button
										text={
											"安全庫存量：" + 
											this.props.stock.current_stock.safety_stock + "（" + this.props.stock.current_stock.unit + "）" +
											"\n最低進倉天數：0 個工作天"
										}
										onPress={() => {}}
										mode={"text"}
										color={Color.gray}
									/>
									<Button
										text={
											"現有庫存量：" + 
											this.props.stock.current_stock.stock_number + "（" + this.props.stock.current_stock.unit + "）"
										}
										onPress={() => {}}
										icon={"bomb"}
										mode={"text-icon"}
										color={Color.light_blue}
									/>
									<Button
										text={"供應商列表"}
										onPress={() => {}}
										icon={"plus"}
										mode={"text-icon"}
										color={Color.gray}
									/>
									<List itemList={this.props.stock.supplier_list}
										minimalRowCount={10}
										renderRow={(rowData, sectionID, rowID, highlightRow) => {
											return (
												<Button
													style={{backgroundColor: (this.props.stock.current_supplier && rowData._id == this.props.stock.current_supplier._id)?Color.dark_green:Color.light_dark}}
													text={rowData.title}
													onPress={() => {
														this.handleSelectSupplier(rowData._id)
													}}
													icon={"angle-right"}
													mode={"text-icon"}
													color={Color.gray}
												/>
											);
										}}
									/>
								</Container>
							)
							:
							(
								<Container style={style.leftList} innerStyle={style.hideRightMargin}>
									<List itemList={[]}
										minimalRowCount={10}
										renderRow={(rowData, sectionID, rowID, highlightRow) => {
											return (
												<Item>
													<Text>{rowData}</Text>
												</Item>
											);
										}}
									/>
								</Container>
							)
						}
						{
							(this.props.stock.current_supplier)?
							<Container style={style.leftList}  innerStyle={[style.hideRightMargin, style.hideLeftMarginAndBorder]}>
								<Button
									style={{backgroundColor: Color.dark_green}}
									text={
										"供應商名稱：" + 
										(this.props.stock.current_supplier.title || "") + 
										"\n統一編號：" + 
										(this.props.stock.current_supplier.tax_id || "")
									}
									onPress={() => {}}
									mode={"text"}
									color={Color.light_gray}
								/>
								<Button
									style={{backgroundColor: Color.dark_green}}
									text={
										"通訊地址：" + 
										(this.props.stock.current_supplier.post_address || "") + 
										"\n電話：" + 
										(this.props.stock.current_supplier.phone || "") +
										" / 傳真：" + 
										(this.props.stock.current_supplier.fax || "")
									}
									onPress={() => {}}
									mode={"text"}
									color={Color.light_gray}
								/>
								<Button
									style={{backgroundColor: Color.dark_green}}
									text={
										"業務聯絡人姓名：" + 
										(this.props.stock.current_supplier.contact.name || "") + 
										" / " + 
										(this.props.stock.current_supplier.cellphone || "") +
										"\n聯絡方式：" + 
										(this.props.stock.current_supplier.phone || "") +
										" / " + 
										(this.props.stock.current_supplier.email || "")
									}
									onPress={() => {}}
									mode={"text"}
									color={Color.light_gray}
								/>
								<List itemList={[]}
									minimalRowCount={10}
									renderRow={(rowData, sectionID, rowID, highlightRow) => {
										return (
											<Item>
												<Text>{rowData}</Text>
											</Item>
										);
									}}
								/>
							</Container>
							:
							<Container style={style.leftList}  innerStyle={[style.hideRightMargin, style.hideLeftMarginAndBorder]}>
								<List itemList={[]}
									minimalRowCount={10}
									renderRow={(rowData, sectionID, rowID, highlightRow) => {
										return (
											<Item>
												<Text>{rowData}</Text>
											</Item>
										);
									}}
								/>
							</Container>
						}
					</View>
				</View>
			</View>
		);
	}
}

export default connect((state) => {
	return {
		stock: state.stock,

	};
})(StockManagerContainer);
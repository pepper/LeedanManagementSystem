/* @flow */
"use strict";

import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";
import { get } from "nested-property";

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

export default class Stock extends Component {
	render(){
		return (
			<View style={style.container}>
				<Container style={style.leftList} innerStyle={style.hideRightMargin}>
					<Button
						text={
							"品名：" + 
							this.props.currentStock.title + 
							"\n料號：" + 
							this.props.currentStock.serial_number
						}
						onPress={() => {}}
						icon={"pencil"}
						mode={"text-icon"}
						color={Color.yellow}
					/>
					<Button
						text={
							"安全庫存量：" + 
							this.props.currentStock.safety_stock + "（" + this.props.currentStock.unit + "）" +
							"\n最低進倉天數：0 個工作天"
						}
						onPress={() => {}}
						mode={"text"}
						color={Color.gray}
					/>
					<Button
						text={
							"現有庫存量：" + 
							this.props.currentStock.stock_number + "（" + this.props.currentStock.unit + "）"
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
					<List itemList={this.props.supplierList}
						minimalRowCount={10}
						renderRow={(rowData, sectionID, rowID, highlightRow) => {
							return (
								<Button
									text={rowData.title}
									onPress={() => {
										this.props.onChangeCurrentSupplier(rowData._id)
									}}
									icon={"angle-right"}
									mode={"text-icon"}
									color={Color.gray}
								/>
							);
						}}
					/>
				</Container>
				<Container style={style.leftList}  innerStyle={[style.hideRightMargin, style.hideLeftMarginAndBorder]}>
					<Button
						style={{backgroundColor: Color.dark_green}}
						text={
							"供應商名稱：" + 
							(this.props.currentSupplier.title || "") + 
							"\n統一編號：" + 
							(this.props.currentSupplier.tax_id || "")
						}
						onPress={() => {}}
						mode={"text"}
						color={Color.light_gray}
					/>
					<Button
						style={{backgroundColor: Color.dark_green}}
						text={
							"通訊地址：" + 
							(this.props.currentSupplier.post_address || "") + 
							"\n電話：" + 
							(this.props.currentSupplier.phone || "") +
							" / 傳真：" + 
							(this.props.currentSupplier.fax || "")
						}
						onPress={() => {}}
						mode={"text"}
						color={Color.light_gray}
					/>
					<Button
						style={{backgroundColor: Color.dark_green}}
						text={
							"業務聯絡人姓名：" + 
							(get(this.props.currentSupplier, "contact.name") || "") + 
							" / " + 
							(this.props.currentSupplier.cellphone || "") +
							"\n聯絡方式：" + 
							(this.props.currentSupplier.phone || "") +
							" / " + 
							(this.props.currentSupplier.email || "")
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
			</View>
		);
	}
}
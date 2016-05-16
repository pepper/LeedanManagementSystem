/* @flow */
"use strict";

import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text, ListView} from "react-native";
import { Color, Size } from "../../definitions";
import Item from "./item";

let style = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: Color.transparent,
	}
});

export default class List extends Component{
	constructor(props){
		super(props);
		this.state = {
			itemList: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
		};
		this.state.itemList = this.buildItemList(props);
	}
	static propTypes = {
		itemList: PropTypes.array,
		minimalRowCount: PropTypes.number,
		renderRow: PropTypes.func,
		style: View.propTypes.style
	};
	static defaultProps = {
		minimalRowCount: 10
	};
	componentWillReceiveProps(nextProps){
		this.setState({
			itemList: this.buildItemList(nextProps),
		});
	}
	buildItemList(props){
		let itemList = Object.assign([], (props.itemList || []));
		while(itemList.length < this.props.minimalRowCount){
			itemList.push(null);
		}
		return this.state.itemList.cloneWithRows(itemList);
	}
	render(){
		return (
			<ListView
				style={[style.container, this.props.style]}
				dataSource={this.state.itemList}
				enableEmptySections={true}
				renderRow={(rowData, sectionID, rowID, highlightRow) => {
					return (rowData)?this.props.renderRow(rowData, sectionID, rowID, highlightRow):<Item />
				}}
			/>
		);
	}
}
/* @flow */
"use strict";

import React, { Component, StyleSheet, ListView } from "react-native";

let style = StyleSheet.create({
	container:{

	},
});

export default class PeopleList extends Component{
	constructor(props){
		super(props);
		this.state = {
			itemList: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
		};
		this.state.menuItemList = this.buildMenuItemList(props);
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			menuItemList: this.buildMenuItemList(nextProps),
		});
	}
	buildMenuItemList(props){
		var menuItemList = _(props.moduleList).filter((module) => (props.activeModule.indexOf(module.key) >= 0)).map((module) => {
			return {
				key: module.key,
				menu: module.menu,
				selected: props.currentModule == module.key
			};
		}) || [];
		while(menuItemList.length < 9){
			menuItemList.push({
				key: "",
				menu: View,
				selected: false,
			});
		}
		menuItemList.push({
			key: "logout",
			menu: Logout,
			selected: true,
		});
		return this.state.menuItemList.cloneWithRows(menuItemList);
	}
	render(){
		return (
			<ListView
				style={style.menuList}
				dataSource={this.state.menuItemList}
				renderRow={(rowData) => {
					let MenuItem = rowData.menu;
					return (
						<TouchableOpacity onPress={() => this.props.changeModule(rowData.key)}>
							<View style={style.menuItem}>
								<MenuItem selected={rowData.selected}/>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		);
	}
}
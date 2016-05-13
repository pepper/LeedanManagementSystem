/* @flow */
"use strict";

import React, {Component} from "react";
import {StyleSheet, View, Text, TextInput, ScrollView, TouchableWithoutFeedback} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Color, Size } from "../../definitions";

let style = StyleSheet.create({
	container:{
		flex: 0,
		flexDirection: "column",
		height: Size.first_row_height,
		backgroundColor: Color.light_blue
	},
	searchingMode:{
		flex: 1,
	},
	barContainer:{
		flex: 0,
		flexDirection: "row",
		height: Size.first_row_height,
		backgroundColor: Color.light_blue,
		borderColor: Color.gray,
		borderBottomWidth: Size.row_border_width
	},
	resultContainer:{
		flex: 1
	},
	textInput:{
		flex: 1,
		margin: 12,
		paddingLeft: 12,
		color: Color.light_blue,
		fontSize: 24,
		fontWeight: "bold",
		backgroundColor: Color.white
	},
	searchIcon:{
		flex: 0,
		marginTop: Size.first_row_height * 0.15,
		width: Size.first_row_height,
	},
	resultItem:{
		flex: 0,
		height: Size.row_height,
		borderColor: Color.gray,
		borderBottomWidth: Size.row_border_width,
		backgroundColor: Color.light_blue
	},
	resultItemText:{
		paddingTop: 15,
		paddingLeft: 12,
		color: Color.white,
		fontSize: 30
	}
});

export default class SearchBar extends Component {
// 	listToSearch
// onSearchTextChange
	state = {
		searchingMode: false,
		searchText: "",
		searchResult: []
	}
	handleChangeText = (text) => {
		clearTimeout(this.searchTimer);
		if(text != ""){
			text = text.toLowerCase();
			this.searchTimer = setTimeout(() => {
				this.setState({
					searchingMode: true,
					searchText: text,
					searchResult: this.props.listToSearch.filter((item) => {
						return item.search_text.toLowerCase().indexOf(text) >= 0;
					})
				});
			}, 500);
		}
		else{
			this.setState({
				searchingMode: false,
				searchText: "",
				searchResult: []
			});
		}
	}
	render(){
		return (
			<View style={[style.container, this.state.searchingMode && style.searchingMode]}>
				<View style={style.barContainer}>
					<TextInput
						style={style.textInput}
						placeholderTextColor={Color.light_blue}
						placeholder={"Search..."}
						onChangeText={this.handleChangeText}
						clearTextOnFocus={true}
						autoCorrect={false}
					/>
					<Icon name={"search"} size={Size.first_row_height * 0.7} color={Color.white} style={style.searchIcon} />
				</View>
				{
					(this.state.searchingMode)?
					<View style={style.resultContainer}>
					{
						(this.state.searchResult.length > 0)?
						(
							<ScrollView style={style.resultContainer}>
							{
								this.state.searchResult.map((item) => {
									return (
										<TouchableWithoutFeedback key={item.key} onPress={() => {
											this.setState({
												searchingMode: false,
												searchText: "",
												searchResult: []
											});
											this.props.selectSearchResult(item.key);
										}}>
											<View style={style.resultItem}>
												<Text style={style.resultItemText}>{item.name}</Text>
											</View>
										</TouchableWithoutFeedback>
									);
								})
							}
							</ScrollView>
						)
						:
						(
							<Text>{"No Result!"}</Text>
						)
					}
					</View>
					:
					null
				}
			</View>
		);
	}
}
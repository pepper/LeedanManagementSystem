/* @flow */
"use strict";

import React, {Component} from "react";
import {StyleSheet, View, Text, TouchableWithoutFeedback} from "react-native";
import { connect } from "react-redux";
import { get } from "nested-property";

import { DayBook } from "../actions";
import { Color, Size, I18n } from "../definitions";
import ContentList, { Container, Title, Item, List, Button, People } from "../components/content_list";
import { RecordTitle, RecordDetail, SummeryItem } from "../components/day_book";

import CreateDayBookPanel from "../components/panel/create_day_book";
import CreateDayBookTypePanel from "../components/panel/create_day_book_type";
import CreateDayBookNewRecordPanel from "../components/panel/create_day_book_new_record";
import RemoveDayBookRecordPanel from "../components/panel/remove_day_book_record";

const style = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row"
	},
	peopleList: {
		flex: 0,
		width: 300,
	},
	content: {
		flex: 1,
		flexDirection: "column",
		alignItems: "stretch"
	},
	headArea: {
		flexDirection: "row",
		height: Size.first_row_height,
		alignItems: "stretch",
	},
	headTextContainer:{
		flex: 2,
	},
	headText:{
		color: "#DDDDDD",
		fontSize: Size.title_font_size,
		paddingTop: Size.title_padding_top,
		paddingLeft: 10,
		paddingRight: 10,
	},
	headEmpty:{
		flex: 1,
	},
	summeryContainer:{
		flexDirection: "row",
		flexWrap: "wrap"
	},
});

class DayBookContainer extends Component {
	state = {
		show_type_select: false,
		content_mode: "summery",
		color_list:[
			"rgb(215,114,30)",
			"rgb(172,83,229)",
			"rgb(70,199,70)",
			"rgb(105,64,172)",
			"rgb(83,192,228)",
			"rgb(81,120,34)",
			"rgb(240,225,102)",
			"rgb(136,136,136)",
			"rgb(192,65,67)",
		],
		record_to_remove: {}
	};
	constructor(props){
		super(props);
		this.props.dispatch(DayBook.sync());
	}
	handleCreateDayBook = () => {
		this.createDayBookPanel.show();
	};
	handleCreateDayBookSubmit = (property) => {
		this.props.dispatch(DayBook.create(property));
	};
	handleChangeDayBook = (dayBookId) => {
		this.props.dispatch(DayBook.changeDayBook(dayBookId));
	};
	handleCreateDayBookType = () => {
		if(get(this.props.dayBook, "current_day_book")){
			this.createDayBookTypePanel.show();
		}
		else{
			alert(I18n.t("day_book_need_select_day_book_first"));
		}
	};
	handleCreateDayBookTypeSubmit = (property) => {
		this.props.dispatch(DayBook.addType(property));
	};
	handleCreateRecord = () => {
		if(get(this.props.dayBook, "current_day_book")){
			this.createDayBookNewRecordPanel.show();
		}
		else{
			alert(I18n.t("day_book_need_select_day_book_first"));
		}
	};
	handleCreateRecordSubmit = (property) => {
		this.props.dispatch(DayBook.addRecord(property));
	};
	handleRemoveRecord = (index) => {
		this.setState({
			record_to_remove: get(this.props.dayBook, "current_day_book.record_list").find((record) => {
				return record.index == index;
			})
		});
		this.removeDayBookRecordPanel.show();
	};
	handleRemoveRecordSubmit = (index) => {
		if(this.state.record_to_remove){
			this.props.dispatch(DayBook.removeRecord(index));
		}
		this.setState({
			record_to_remove: {}
		});
	}

	render(){
		return (
			<View style={style.container}>
				<Container style={style.peopleList} header={
					<Title columnList={[{
							flex: 11,
							title: "帳目列表"
						}, {
							flex: 9,
							title: "總金額"
						}]}
					/>
				}>
					<List itemList={(get(this.props.dayBook, "day_book_list") || []).map((dayBook) => {
						return (dayBook._id == get(this.props.dayBook, "current_day_book_id"))?Object.assign({}, dayBook, {selected: true}):Object.assign({}, dayBook)
					})}
						currentItem={get(this.props.dayBook, "current_day_book_id")}
						minimalRowCount={9}
						renderRow={(rowData, sectionID, rowID, highlightRow) => {
							return (
								<People
									name={rowData.title}
									idNumber={rowData.last_index + ""}
									selected={rowData.selected}
									totalScore={rowData.total_amount}
									subTitle={"Total amount"}
									onPress={() => {
										this.handleChangeDayBook(rowData._id);
									}}
								/>
							);
						}}
					/>
					{
						(get(this.props.dayBook, "current_day_book_id"))?
						<View>
							<Button icon="tags" text={I18n.t("day_book_add_new_type")} onPress={this.handleCreateDayBookType}/>
							<Button icon="plus" text={I18n.t("day_book_add_new_record")} onPress={this.handleCreateRecord}/>
						</View>
						:
						null
					}
					<Button icon="book" text={I18n.t("company_create_daybook")} onPress={this.handleCreateDayBook}/>
				</Container>
				
				<View style={style.content}>
					<View style={style.headArea}>
						<TouchableWithoutFeedback onPress={() => {
							this.setState({
								content_mode: "raw_date"
							});
						}}>
							<View style={[style.headTextContainer]}>
								<Text style={style.headText}>{"交易明細"}</Text>
							</View>
						</TouchableWithoutFeedback>
						<View style={style.headEmpty}></View>
						<TouchableWithoutFeedback onPress={() => {
							this.setState({
								content_mode: "summery"
							});
						}}>
							<View style={[style.headTextContainer]}>
								<Text style={style.headText}>{I18n.t("day_book_change_day")}</Text>
							</View>
						</TouchableWithoutFeedback>
						<View style={style.headEmpty}></View>
						<TouchableWithoutFeedback onPress={() => {
							this.setState({
								content_mode: "summery"
							});
						}}>
							<View style={[style.headTextContainer, {alignItems: "flex-end"}]}>
								<Text style={style.headText}>{"帳簿統計"}</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
					{
						(this.state.content_mode == "summery")?
						<View style={style.summeryContainer}>
							{
								(get(this.props.dayBook, "current_day_book.type_list") || []).map((type, index) => {
									const summery = (get(this.props.dayBook, "current_day_book.record_list") || []).reduce((result, record) => {
										if(record.type == type){
											result.total_amount += parseInt(record.amount);
											result.count += 1;
										}
										return result;
									}, { total_amount: 0, count: 0});
									return (
										<SummeryItem key={"SummeryItem" + type} color={this.state.color_list[index]} title={type} description={"總計：" + summery.total_amount + " 筆數：" + summery.count}/>
									);
								})
							}
						</View>
						:
						null
					}
					{
						(this.state.content_mode == "raw_date")?
						<View>
							<RecordTitle />
							<List itemList={(get(this.props.dayBook, "current_day_book.record_list") || [])}
								minimalRowCount={9}
								renderRow={(rowData, sectionID, rowID, highlightRow) => {
									return (
										<RecordDetail onLongPress={() => {
											this.handleRemoveRecord(rowData.index);
										}} key={rowData._id} record={rowData}/>
									);
								}}
							/>
						</View>
						:
						null
					}
				</View>

				<CreateDayBookPanel ref={(ref) => this.createDayBookPanel = ref} onConfirm={this.handleCreateDayBookSubmit} />
				<CreateDayBookTypePanel ref={(ref) => this.createDayBookTypePanel = ref} onConfirm={this.handleCreateDayBookTypeSubmit} />
				<CreateDayBookNewRecordPanel ref={(ref) => this.createDayBookNewRecordPanel = ref} onConfirm={this.handleCreateRecordSubmit} dayBook={get(this.props.dayBook, "current_day_book") || {}}/>
				<RemoveDayBookRecordPanel ref={(ref) => this.removeDayBookRecordPanel = ref} onConfirm={this.handleRemoveRecordSubmit} record={this.state.record_to_remove}/>

			</View>
		);
	}
}

export default connect((state) => {
	return {
		dayBook: state.dayBook
	};
})(DayBookContainer);
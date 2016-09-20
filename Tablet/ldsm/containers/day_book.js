/* @flow */
"use strict";

import React, {Component} from "react";
import { NativeModules, StyleSheet, View, Text, TouchableWithoutFeedback, ActionSheetIOS } from "react-native";
import { connect } from "react-redux";
import { get } from "nested-property";
import Icon from "react-native-vector-icons/FontAwesome";

import { DayBook } from "../actions";
import { Color, Size, I18n } from "../definitions";
import ContentList, { Container, Title, Item, List, Button, People, Summary } from "../components/content_list";
import { RecordTitle, RecordDetail, SummeryItem } from "../components/day_book";
import SearchBar from "../components/search/container";

import CreateDayBookPanel from "../components/panel/create_day_book";
import CreateDayBookTypePanel from "../components/panel/create_day_book_type";
import CreateDayBookNewRecordPanel from "../components/panel/create_day_book_new_record";
import RemoveDayBookRecordPanel from "../components/panel/remove_day_book_record";
import RemoveDayBookPanel from "../components/panel/remove_day_book";
import DateDurationPickerPanel from "../components/panel/date_duration_picker";

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
		alignItems: "stretch",
		borderLeftWidth: 0.5,
		borderColor: Color.gray
	},
	headArea: {
		flexDirection: "row",
		height: Size.first_row_height,
		alignItems: "stretch",
	},
	footArea: {
		backgroundColor: Color.red,
		height: Size.row_height,
	},
	searchButton:{
		position: "absolute",
		top: 0,
		right: 110,
	},
	headTextContainer:{
		flex: 1,
		alignItems: "flex-end",
	},
	changeDateTitle:{
		flex: 2,
		alignItems: "flex-start",
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
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap"
	},
	totalContainer:{
		flex: 1,
	},
	emptyItemStyle:{
		borderBottomWidth: 0.5,
		borderColor: Color.gray
	},
	detailContainer:{
		flex: 1,
	}
});

class DayBookContainer extends Component {
	state = {
		show_search_bar: false,
		show_type_select: false,
		content_mode: "raw_date",
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
		record_to_remove: {},
		day_book_to_remove: {}
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
	handleChangeDayBookTotalGroup = (group) =>{
		this.props.dispatch(DayBook.changeDayBookTotalGroup(group));
	};
	handleChangeDayBookGroup = (group) =>{
		this.props.dispatch(DayBook.changeDayBookGroup(group));
	};
	handleChangeDayBook = (dayBookId) => {
		this.props.dispatch(DayBook.changeDayBook(dayBookId));
		this.setState({
			content_mode: "raw_date"
		});
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
	};
	handleRemoveDayBook = (key) => {
		this.setState({
			day_book_to_remove: get(this.props.dayBook, "day_book_list").find((dayBook) => {
				return dayBook.key == key;
			})
		});
		this.removeDayBookPanel.show();
	};
	handleRemoveDayBookSubmit = (key) => {
		if(this.state.day_book_to_remove){
			this.props.dispatch(DayBook.removeDayBook(key));
		}
		this.setState({
			day_book_to_remove: {}
		});
	};
	handleDateDurationPicker = () => {
		this.dateDurationPickerPanel.show();
	};
	handleDateDurationPickerSubmit = (start, end) => {
		this.props.dispatch(DayBook.setDateDuration(start, end));
	};
	handleOrderChange = (type) => {
		this.setState({
			order: type,
			order_way: (this.state.order == type)?(!this.state.order_way):(true)
		});
	};
	handleSearchResult = (type, key) => {
		this.props.dispatch(DayBook.changeDayBook(type));
		this.setState({
			show_search_bar: false
		});
	};
	handleGeneratePDF = () => {
		let group = get(this.props.dayBook, "current_day_book_total_group");
		let startDate = get(this.props.dayBook, "date_duration.start");
		let endDate = get(this.props.dayBook, "date_duration.end");
		if(group && group != ""){
			if(startDate && endDate){
				let dayBookDictionary = (get(this.props.dayBook, "day_book_list") || []).reduce((dict, dayBook) => {
					if(dayBook.group == group){
						dict.revenue = (dayBook.account_way == "expenditure")?(dict.revenue - dayBook.revenue):(dict.revenue + dayBook.revenue);
						dict.balance = (dayBook.account_way == "expenditure")?(dict.balance - dayBook.balance):(dict.balance + dayBook.balance);
						dict.dayBookList.push(dayBook);
					}
					return dict;
				}, {
					revenue: 0,
					balance: 0,
					dayBookList: []
				});
				let html = `
					<div style="width:100%">
						<div style="display:inline-block;white-space:nowrap;vertical-align:bottom;width:49%">
							<span style="font-size:24px;font-weight:bold">${this.props.company.company.title}帳務列表</span>
						</div>
						<div style="display:inline-block;vertical-align:top;text-align:right;width:49%">
							<span style="font-size:20px;font-weight:bold">帳本名稱：${this.props.dayBook.current_day_book_total_group}</span>
						</div>
					</div>
					<hr />
					<br />
					<div style="width:100%;">
						<div style="display:inline-block;white-space:nowrap;vertical-align:bottom;width:39%">
							<div style="display:inline-block;white-space:nowrap;margin-right:20px">
								<div style="width:70;height:70;border:solid 1px #000000"></div>
								<div style="font-size:12px;">財務確認人A</div>
							</div>
							<div style="display:inline-block;white-space:nowrap;margin-right:20px">
								<div style="width:70;height:70;border:solid 1px #000000"></div>
								<div style="font-size:12px;">財務確認人B</div>
							</div>
							<div style="display:inline-block;white-space:nowrap;margin-right:20px">
								<div style="width:70;height:70;border:solid 1px #000000"></div>
								<div style="font-size:12px;">財務確認人C</div>
							</div>
						</div>
						<div style="display:inline-block;vertical-align:top;width:59%">
							<div style="text-align:right;width:100%;">
								<span style="font-size:16px;color:#666666">帳務統計區間：${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()}~${endDate.getFullYear()}.${endDate.getMonth() + 1}.${endDate.getDate()}</span>
							</div>
							<div style="text-align:right;margin-top:10px;width:100%;">
								<span style="font-size:18px;">本期總損益：</span>
								<span style="font-size:26px;font-weight:bold">${this.toNumberString(dayBookDictionary.revenue)}</span>
							</div>
							<div style="text-align:right;margin-top:10px;width:100%;">
								<span style="font-size:18px;">本期總結餘：</span>
								<span style="font-size:26px;font-weight:bold">${this.toNumberString(dayBookDictionary.balance)}</span>
							</div>
						</div>
					</div>
					<hr />
					<br />
				`;

				let incomeHTML = "";
				let incomeIndex = 0;
				let incomeTotal = 0;
				let expenditureHTML = "";
				let expenditureIndex = 0;
				let expenditureTotal = 0;
				dayBookDictionary.dayBookList.forEach((dayBook) => {
					switch(dayBook.account_way){
						case "income":
							incomeIndex++;
							incomeHTML += `
								<div style="font-size:16px;margin-top:10px;">${((incomeIndex < 10)?"0":"") + incomeIndex}.${dayBook.title}：${this.toNumberString(dayBook.revenue)}</div>
							`;
							incomeTotal += dayBook.revenue;
							break;
						case "expenditure":
							expenditureIndex++;
							expenditureHTML += `
								<div style="font-size:16px;margin-top:10px;">${((expenditureIndex < 10)?"0":"") + expenditureIndex}.${dayBook.title}：${this.toNumberString(dayBook.revenue)}</div>
							`;
							expenditureTotal += dayBook.revenue;
							break;
					}
				});
				html += `
					<div style="width:100%;font-size:20px;font-weight:bold;">本期 會務經費 各科目統計 ▼</div>
					<div style="width:100%;margin-top:20px;">
						<div style="display:inline-block;white-space:nowrap;width:49%">
							<span style="font-size:20px;font-weight:bold">收-總計：${this.toNumberString(incomeTotal)}</span>
						</div>
						<div style="display:inline-block;white-space:nowrap;width:49%">
							<span style="font-size:20px;font-weight:bold">支-總計：${this.toNumberString(expenditureTotal)}</span>
						</div>
					</div>
					<hr />
					<div style="width:100%;margin-top:20px;">
						<div style="display:inline-block;white-space:nowrap;vertical-align:top;width:49%">
							${incomeHTML}
						</div>
						<div style="display:inline-block;white-space:nowrap;vertical-align:top;width:49%">
							${expenditureHTML}
						</div>
					</div>
					<hr />
					<div style="width:100%;font-size:20px;font-weight:bold;page-break-before:always;">附件：帳本各科目明細 ▼</div>
				`;
				let pageBreak = 0;

				let addLine = (line) => {
					pageBreak += line;
					let result = "";
					if(pageBreak > 25){
						pageBreak = (line > 25)?0:line;
						result = `<div style="page-break-before:always;"/></div>`;
					}
					return result;
				};

				dayBookDictionary.dayBookList.forEach((dayBook) => {
					html += `
						${(dayBook.record_list.length + 4 + pageBreak > 25)?addLine(30):""}
						<div style="font-size:14px;font-weight:bold;margin-top:10px;">科目名稱：${{expenditure:"支", income:"收"}[dayBook.account_way]}–${dayBook.title}</div>
						${addLine(1)}
						<div style="display:flex;width:100%;margin-top:10px;font-size:10px;font-weight:bold;">
							<div style="text-align:center;width:60px;padding:8px;margin-right:1px;background:#E6E6E6">序號</div>
							<div style="text-align:center;flex:18;padding:8px;margin-right:1px;background:#E6E6E6">類別</div>
							<div style="text-align:center;flex:35;padding:8px;margin-right:1px;background:#E6E6E6">內容</div>
							<div style="text-align:center;flex:9;padding:8px;margin-right:1px;background:#E6E6E6">時間</div>
							<div style="text-align:right;flex:12;padding:8px;margin-right:1px;background:#E6E6E6">金額</div>
							<div style="text-align:center;flex:7;padding:8px;margin-right:1px;background:#E6E6E6">備註</div>
						</div>
						${addLine(1)}
						${
							dayBook.record_list.reduce((result, record, index) => {
								let recordDatetime = new Date(record.record_datetime);
								let color = (index % 2 == 0)?"#B6B6B6":"#E6E6E6";
								result += `
									<div style="display:flex;width:100%;margin-top:1px;font-size:10px;">
										<div style="text-align:center;width:60px;padding:8px;margin-right:1px;background:${color}">${index + 1}</div>
										<div style="text-align:center;flex:18;padding:8px;margin-right:1px;background:${color}">${record.type + " "}</div>
										<div style="text-align:center;flex:35;padding:8px;margin-right:1px;background:${color}">${record.title + " "}</div>
										<div style="text-align:center;flex:9;padding:8px;margin-right:1px;background:${color}">${recordDatetime.getMonth() + 1}.${recordDatetime.getDate()}</div>
										<div style="text-align:right;flex:12;padding:8px;margin-right:1px;background:${color}">${this.toNumberString(record.amount)}</div>
										<div style="text-align:center;flex:7;padding:8px;margin-right:1px;background:${color}">${(record.note && record.note != "")?"V":"X"}</div>
									</div>
									${addLine(1)}
								`;
								if(record.note && record.note != ""){
									result += `
										<div style="display:flex;width:100%;margin-top:1px;font-size:10px;">
											<div style="text-align:center;width:60px;padding:8px;margin-right:1px;background:${color}">備註</div>
											<div style="text-align:left;flex:1;padding:8px;margin-right:1px;background:${color}">${record.note}</div>
										</div>
										${addLine(1)}
									`;
								}
								return result;
							}, "")
						}
						<div style="display:flex;width:100%;margin-top:1px;font-size:10px;font-weight:bold;">
							<div style="flex:1;padding:8px;margin-right:1px;background:${(dayBook.record_list.length % 2 == 0)?"#B6B6B6":"#E6E6E6"}">
								<span style="float:right">總計：${dayBook.revenue}</span>
							</div>
						</div>
						<hr />
						${addLine(2)}
					`;
					// pageBreak += 5;
					// pageBreak += dayBook.record_list.reduce((result, record) => {
					// 	return result + 1 + ((record.note && record.note != "")?1:0);
					// }, 0);
					// console.log("pageBreak: " + pageBreak);
					// if(pageBreak > 20){
					// 	pageBreak = 0;
					// 	html += `<div style="page-break-before:always;"/></div>`;
					// }
				});
				NativeModules.RNHTMLtoPDF.convert({
					html: html,
					fileName: "test",
					directory: "docs"
				}).then((filePath) => {
					console.log(filePath);
					setTimeout(() => {
						ActionSheetIOS.showShareActionSheetWithOptions({
							url: `file://${filePath}`,
							message: "",
							subject: `${this.props.company.company.title}帳務列表`,
							excludedActivityTypes: []
						},
						(error) => alert(error),
						(success, method) => {
							console.log("Use " + method);
						});
					}, 500);
				});
			}
			else{
				alert("請先選擇日期區間");
			}
		}
		else{
			alert("請先選擇一本帳本");
		}
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
	render(){
		let dayBookDictionary = (get(this.props.dayBook, "day_book_list") || []).reduce((dict, dayBook) => {
			if(!dict["DayBookGroup" + dayBook.group]){
				dict["DayBookGroup" + dayBook.group] = {
					revenue: 0,
					balance: 0,
					dayBookList: []
				};
			}
			dict["DayBookGroup" + dayBook.group].revenue = (dayBook.account_way == "expenditure")?(dict["DayBookGroup" + dayBook.group].revenue - dayBook.revenue):(dict["DayBookGroup" + dayBook.group].revenue + dayBook.revenue);
			dict["DayBookGroup" + dayBook.group].balance = (dayBook.account_way == "expenditure")?(dict["DayBookGroup" + dayBook.group].balance - dayBook.balance):(dict["DayBookGroup" + dayBook.group].balance + dayBook.balance);
			dict["DayBookGroup" + dayBook.group].dayBookList.push(dayBook);
			return dict;
		}, {});
		let groupLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		let dayBookMenuList = Object.entries(dayBookDictionary).map((entry, index) => {
			const key = entry[0];
			const value = entry[1];
			let result = [{
				type: "group",
				title: key.replace("DayBookGroup", ""),
				letter: groupLetter[index]
			}];
			if(get(this.props.dayBook, "current_day_book_group") == key.replace("DayBookGroup", "")){
				return result.concat(value.dayBookList);
			}
			else{
				return result;
			}
		}).reduce((result, dayBookList) => {
			return result.concat(dayBookList);
		}, []);
		
		let totalRevenue = 0;
		let totalBalance = 0;
		let dayBookTotalList = Object.entries(dayBookDictionary).map((entry, index) => {
			const key = entry[0];
			const value = entry[1];
			let result = [{
				type: "group",
				title: key.replace("DayBookGroup", ""),
				letter: groupLetter[index],
				revenue: value.revenue,
				balance: value.balance,
			}];
			totalRevenue += value.revenue;
			totalBalance += value.balance;
			if(get(this.props.dayBook, "current_day_book_total_group") == key.replace("DayBookGroup", "")){
				return result.concat(value.dayBookList);
			}
			else{
				return result;
			}
		}).reduce((result, dayBookList) => {
			return result.concat(dayBookList);
		}, []);

		let recordList = (get(this.props.dayBook, "current_day_book.record_list") || []);
		let startDate = get(this.props.dayBook, "date_duration.start");
		let endDate = get(this.props.dayBook, "date_duration.end");
		let changeDateTitle = I18n.t("day_book_change_day");
		recordList = recordList.map((record, index) => {
			record.index = index + 1;
			return record;
		});
		if(startDate && endDate){
			recordList = recordList.filter((record) => {
				let recordDate = new Date(record.record_datetime);
				return recordDate >= startDate && recordDate <= endDate;
			});
			changeDateTitle = startDate.getFullYear() + "." + (startDate.getMonth() + 1) + "." + startDate.getDate() + "~" + endDate.getFullYear() + "." + (endDate.getMonth() + 1) + "." + endDate.getDate();
		}
		recordList.sort((a, b) => {
			switch(this.state.order){
				// case I18n.t("index"):
				// 	if(this.state.order_way){
				// 		return (a.index > b.index);
				// 	}
				// 	else{
				// 		return (a.index < b.index);
				// 	}
				case I18n.t("type"):
					if(this.state.order_way){
						return (a.type > b.type);
					}
					else{
						return (a.type < b.type);
					}
				case I18n.t("content"):
					if(this.state.order_way){
						return (a.title > b.title);
					}
					else{
						return (a.title < b.title);
					}
				case I18n.t("time"):
					if(this.state.order_way){
						return (a.record_datetime > b.record_datetime);
					}
					else{
						return (a.record_datetime < b.record_datetime);
					}
				case I18n.t("amount"):
					if(this.state.order_way){
						return (a.amount > b.amount);
					}
					else{
						return (a.amount < b.amount);
					}
			}
			return false;
		});
		return (
			<View style={style.container}>
				<Container style={style.peopleList} header={
					<Title columnList={[{
							flex: 1,
							title: I18n.t("day_book_list")
						}]}
					/>
				}>
					<Button
						mode={"avatar-text"}
						style={{
							backgroundColor: Color.black
						}}
						selectedStyle={{
							backgroundColor: Color.red
						}}
						color={Color.yellow}
						text={"總帳"}
						onPress={() => {
							this.setState({
								content_mode: "total"
							});
						}}
					/>
					<List itemList={(dayBookMenuList || []).map((dayBook) => {
						if(dayBook.type == "group"){
							return (dayBook.title == get(this.props.dayBook, "current_day_book_group"))?Object.assign({}, dayBook, {selected: true}):Object.assign({}, dayBook);
						}
						return (dayBook.key == get(this.props.dayBook, "current_day_book_key"))?Object.assign({}, dayBook, {selected: true}):Object.assign({}, dayBook);
					})}
						currentItem={get(this.props.dayBook, "current_day_book_id")}
						minimalRowCount={9}
						emptyItemStyle={{ backgroundColor: Color.black }}
						renderRow={(rowData, sectionID, rowID, highlightRow) => {
							if(rowData.type == "group"){
								return (
									<Button
										mode={"avatar-text"}
										avatarText={rowData.letter}
										style={{
											backgroundColor: Color.black
										}}
										selectedStyle={{
											backgroundColor: Color.yellow
										}}
										selectAvatarTextColor={Color.white}
										selectTextColor={Color.black}
										color={Color.yellow}
										selected={rowData.selected}
										text={rowData.title}
										onPress={() => {
											this.handleChangeDayBookGroup(rowData.title);
										}}
									/>
								);
							}
							return (
								<Button
									mode={"avatar-text2line"}
									avatarText={{expenditure:"支", income:"收"}[rowData.account_way]}
									style={{
										backgroundColor: Color.black
									}}
									selectedStyle={{
										backgroundColor: Color.red
									}}
									selected={rowData.selected}
									text={rowData.title}
									subText={rowData.last_index + ""}
									onPress={() => {
										this.handleChangeDayBook(rowData.key);
									}}
									onLongPress={() => {
										this.handleRemoveDayBook(rowData.key);
									}}
								/>
							);
						}}
					/>
					{
						(get(this.props.dayBook, "current_day_book_key"))?
						<View>
							<Button icon="plus" text={I18n.t("day_book_add_new_record")} onPress={this.handleCreateRecord}/>
						</View>
						:
						null
					}
					<Button icon="book" text={I18n.t("company_create_daybook")} onPress={this.handleCreateDayBook}/>
				</Container>
				
				<View style={style.content}>
					{
						(this.state.show_search_bar)?
						(
							<SearchBar 
								listToSearch={(get(this.props.dayBook, "day_book_list") || []).map((dayBook) => {
									return (get(dayBook, "record_list") || []).map((record) => {
										return Object.assign({}, record, {
											day_book_title: dayBook.title,
											day_book_id: dayBook.key
										});
									});
								}).reduce((result, recordList) => {
									return result.concat(recordList);
								}, []).map((record) => {
									return {
										item_type: record.day_book_id,
										key: record.uuid,
										name: "● " + record.day_book_title + " ● " + record.title,
										search_text: JSON.stringify(record)
									};
								})}
								selectSearchResult={this.handleSearchResult}
							/>
						)
						:
						null
					}
					<View style={style.headArea}>
						<TouchableWithoutFeedback onPress={this.handleDateDurationPicker}>
							<View style={[style.headTextContainer, style.changeDateTitle]}>
								<Text style={style.headText}>{changeDateTitle}</Text>
							</View>
						</TouchableWithoutFeedback>
						<View style={style.headEmpty}></View>
						<TouchableWithoutFeedback onPress={() => {
							this.setState({
								content_mode: "raw_date"
							});
						}}>
							<View style={[style.headTextContainer]}>
								<Text style={style.headText}>{I18n.t("day_book_record_detail")}</Text>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={() => {
							// this.setState({
							// 	content_mode: "summery"
							// });
						}}>
							<View style={[style.headTextContainer, {alignItems: "flex-end"}]}>
								<Text style={[style.headText, {color:Color.gray}]}>{I18n.t("day_book_summary")}</Text>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={() => {
							this.setState({
								show_search_bar: !this.state.show_search_bar
							});
						}}>
							<Icon style={style.searchButton} name={"angle-down"} size={30} color={Color.yellow} />
						</TouchableWithoutFeedback>
					</View>
					{
						(this.state.content_mode == "summery")?
						<View style={style.summeryContainer}>
							{
								(get(this.props.dayBook, "current_day_book.type_list") || []).map((type, index) => {
									const summery = recordList.reduce((result, record) => {
										if(record.type == type){
											result.total_amount += parseInt(record.amount);
											result.count += 1;
										}
										return result;
									}, { total_amount: 0, count: 0});
									return (
										<SummeryItem key={"SummeryItem" + type} color={this.state.color_list[index]} title={type} description={"總計：" + this.toNumberString(summery.total_amount) + " 筆數：" + summery.count}/>
									);
								})
							}
						</View>
						:
						null
					}
					{
						(this.state.content_mode == "total")?
						<View style={style.totalContainer}>
							{
								<Item style={{
									borderTopWidth: 0.5,
									borderBottomWidth: 0.5,
									borderColor: Color.gray,
									flexDirection: "row",
									alignItems: "center"
								}}>
									<Text style={{
										flex: 1,
										fontSize: 18,
										fontWeight: "bold",
										lineHeight: 24,
										paddingTop: -2,
										paddingLeft: 12,
										color: Color.yellow
									}}>
										{"本期總損益：" + this.toNumberString(totalRevenue)}
									</Text>
									<Text style={{
										flex: 1,
										fontSize: 18,
										fontWeight: "bold",
										lineHeight: 24,
										paddingTop: -2,
										paddingRight: 12,
										color: Color.yellow,
										textAlign: "right"
									}}>
										{"本期總結餘：" + this.toNumberString(totalBalance)}
									</Text>
								</Item>
							}
							<List itemList={(dayBookTotalList || []).map((dayBook) => {
								if(dayBook.type == "group"){
									return (dayBook.title == get(this.props.dayBook, "current_day_book_total_group"))?Object.assign({}, dayBook, {selected: true}):Object.assign({}, dayBook);
								}
								return (dayBook.key == get(this.props.dayBook, "current_day_book_key"))?Object.assign({}, dayBook, {selected: true}):Object.assign({}, dayBook);
							})}
								currentItem={get(this.props.dayBook, "current_day_book_id")}
								minimalRowCount={9}
								emptyItemStyle={style.emptyItemStyle}
								renderRow={(rowData, sectionID, rowID, highlightRow) => {
									if(rowData.type == "group"){
										return (
											<Button
												mode={"avatar-text"}
												avatarText={rowData.letter}
												style={{
													paddingLeft: 40,
													borderBottomWidth: 0.5,
													borderColor: Color.gray
												}}
												selectedStyle={{
													backgroundColor: Color.light_blue
												}}
												selectAvatarTextColor={Color.white}
												selectTextColor={Color.white}
												color={Color.yellow}
												selected={rowData.selected}
												text={rowData.title + "：" + this.toNumberString(rowData.revenue)}
												onPress={() => {
													this.handleChangeDayBookTotalGroup(rowData.title);
												}}
											/>
										);
									}
									return (
										<Button
											mode={"avatar-text"}
											avatarText={{expenditure:"支", income:"收"}[rowData.account_way]}
											style={{
												paddingLeft: 120,
												borderBottomWidth: 0.5,
												borderColor: Color.gray
											}}
											selected={rowData.selected}
											text={rowData.title + "：" + this.toNumberString(rowData.revenue)}
											onPress={() => {
												this.handleChangeDayBook(rowData.key);
											}}
											onLongPress={() => {
												this.handleRemoveDayBook(rowData.key);
											}}
										/>
									);
								}}
							/>
						</View>
						:
						null
					}
					{
						(this.state.content_mode == "raw_date")?
						<View style={style.detailContainer}>
							<RecordTitle onPress={this.handleOrderChange}/>
							<List itemList={recordList}
								minimalRowCount={9}
								emptyItemStyle={style.emptyItemStyle}
								renderRow={(rowData, sectionID, rowID, highlightRow) => {
									return (
										<RecordDetail
											style={{
												borderBottomWidth: 0.5,
												borderColor: Color.gray
											}}
											onLongPress={() => {
												this.handleRemoveRecord(rowData.index);
											}}
											key={rowData._id}
											record={rowData}
										/>
									);
								}}
							/>
						</View>
						:
						null
					}
					<View style={style.footArea}>
						<Summary
							hideSum={this.state.content_mode == "total"}
							hideQuantity={this.state.content_mode == "total"}
							quantity={recordList.length}
							sum={get(this.props.dayBook, "current_day_book.revenue")}
							date_start={startDate}
							date_end={endDate}
							disablePrint={this.state.content_mode != "total"}
							onPrint={this.handleGeneratePDF}
						/>
					</View>
				</View>

				<CreateDayBookPanel ref={(ref) => this.createDayBookPanel = ref} onConfirm={this.handleCreateDayBookSubmit} groupList={Object.keys(dayBookDictionary).map((group) => (group.replace("DayBookGroup", "")))} />
				<CreateDayBookTypePanel ref={(ref) => this.createDayBookTypePanel = ref} onConfirm={this.handleCreateDayBookTypeSubmit} />
				<CreateDayBookNewRecordPanel ref={(ref) => this.createDayBookNewRecordPanel = ref} onConfirm={this.handleCreateRecordSubmit} dayBook={get(this.props.dayBook, "current_day_book") || {}}/>
				<RemoveDayBookRecordPanel ref={(ref) => this.removeDayBookRecordPanel = ref} onConfirm={this.handleRemoveRecordSubmit} record={this.state.record_to_remove} />
				<RemoveDayBookPanel ref={(ref) => this.removeDayBookPanel = ref} onConfirm={this.handleRemoveDayBookSubmit} dayBook={this.state.day_book_to_remove} />
				<DateDurationPickerPanel ref={(ref) => this.dateDurationPickerPanel = ref} onConfirm={this.handleDateDurationPickerSubmit} />
			</View>
		);
	}
}

export default connect((state) => {
	return {
		company: state.company,
		dayBook: state.dayBook
	};
})(DayBookContainer);
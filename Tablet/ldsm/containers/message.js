/* @flow */
"use strict";

import React, { Component, PropTypes, View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux/native";
import { Color } from "../definitions";

import { Message } from "../actions";

var style = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		width: 1024,
		flexDirection: "column",
		paddingTop: 10,
		backgroundColor: Color.transparent
	},
	messageBox: {
		flex: 1,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: Color.white,
		padding: 5,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 5
	},
	infoMessage: {
		backgroundColor: Color.yellow
	},
	errorMessage: {
		backgroundColor: Color.orange
	},
	messageText: {
		fontSize: 12,
		fontWeight: "bold"
	},
	infoText: {
		color: Color.dark
	},
	errorText: {
		color: Color.white
	}
});

class MessageContainer extends Component{
	static propTypes = {
		dispatch: PropTypes.func,
		message: PropTypes.object
	};
	constructor(props){
		super(props);
		this.state = {
			hide_message_interval_list: []
		};
	}
	componentWillReceiveProps(props){
		while(this.state.hide_message_interval_list.length < props.message.message_list.length){
			this.state.hide_message_interval_list.push(setTimeout(this.hideOneMessage, 5000));
		}
	}
	hideOneMessage = () => {
		this.props.dispatch(Message.alreadyShowMessage());
	};
	render(){
		return (
			<View style={style.container}>
				{
					this.props.message.message_list.slice(this.props.message.current_index).map((message) => {
						return (
							<View
								key={"Message" + message.index}
								style={[style.messageBox, {info: style.infoMessage, error: style.errorMessage}[message.type]]}
							>
								<Text style={[style.messageText, {info: style.infoText, error: style.errorText}[message.type]]}>{message.message}</Text>
							</View>
						);
					})
				}
			</View>
		);
	}
}

export default connect((state) => {
	return { message: state.message };
})(MessageContainer);
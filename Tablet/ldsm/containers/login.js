/* @flow */
"use strict";

import validator from "validator";
import React, { Component, StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux/native";
import TextInput from "../components/basic/text_input";
import Button from "../components/basic/button";

import ActionCreators, { Company } from "../actions";

let style = StyleSheet.create({
	container:{
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonContainer:{
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-end",
	},
	button:{
		marginLeft: 10,
	}
});

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			mode: "register",
			title: "Leedan Company",
			username: "leedan",
			password: "1234",
			password_again: "1234",
		};
	}
	onLoginPressHandler(){
		if(validator.toString(this.state.username) != "" && validator.toString(this.state.password) != ""){
			// Login!!!
		}
		else{
			alert("請輸入正確的帳號密碼");
		}
		// Action.companyLogin(this.state.username, this.state.password);
	}
	onRegisterPressHandler(){
		if(
			validator.toString(this.state.title) != ""
			&& validator.toString(this.state.username) != ""
			&& validator.toString(this.state.password) != ""
			&& validator.toString(this.state.password_again) != ""
			&& this.state.password_again == this.state.password
		){
			this.props.dispatch(Company.register(this.state.title ,this.state.username, this.state.password));
		}
		else{
			alert("所有項目均為必填項目");
		}
	}
	render(){
		return (
			<View style={[style.container, this.props.style || {} ]}>
				{
					(this.state.mode == "register")?
					(
						<TextInput onChangeText={(text) => this.setState({title: text})} placeholder={"Please enter your company title."} />
					)
					:
					(null)
				}
				<TextInput onChangeText={(text) => this.setState({username: text})} placeholder={"Please enter your company username."} />
				<TextInput onChangeText={(text) => this.setState({password: text})} placeholder={"Please enter your password."} password={true} />
				{
					(this.state.mode == "register")?
					(
						<TextInput onChangeText={(text) => this.setState({password_again: text})} placeholder={"Please enter your password again."} password={true} />
					)
					:
					(null)
				}
				{
					(this.state.mode == "register")?
					(
						<View style={style.buttonContainer}>
							<Button style={style.button} onPress={() => this.setState({mode: "login"})}>
								<Text>{"Cancel"}</Text>
							</Button>
							<Button style={style.button} onPress={this.onRegisterPressHandler.bind(this)}>
								<Text>{"Submit"}</Text>
							</Button>
						</View>
					)
					:
					(null)
				}
				{
					(this.state.mode == "login")?
					(
						<View style={style.buttonContainer}>
							<Button style={style.button} onPress={() => this.setState({mode: "register"})}>
								<Text>{"Register"}</Text>
							</Button>
							<Button style={style.button} onPress={this.onLoginPressHandler.bind(this)}>
								<Text>{"Login"}</Text>
							</Button>
						</View>
					)
					:
					(null)
				}
			</View>
		);
	}
}

export default connect(
  state => ({})
)(Login)

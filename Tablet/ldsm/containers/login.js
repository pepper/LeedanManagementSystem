/* @flow */
"use strict";

import React, { Component, PropTypes, StyleSheet, View } from "react-native";
import { connect } from "react-redux/native";

import { Company } from "../actions";

import Login from "../components/login/login";
import Register from "../components/login/register";

let style = StyleSheet.create({
	container:{
		flex: 1
	},
	buttonContainer:{
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-end"
	},
	button:{
		marginLeft: 10
	}
});

class LoginContainer extends Component{
	static propTypes = {
		dispatch: PropTypes.func,
		style: View.propTypes.style
	};
	constructor(props){
		super(props);
		props.dispatch(Company.checkLogin());
	}
	state = {
		mode: "login"
	};
	handleChangeToLoginMode = () => {
		this.setState({
			mode: "login"
		});
	};
	handleChangeToRegisterMode = () => {
		this.setState({
			mode: "register"
		});
	};
	render(){
		return (
			<View style={[style.container, this.props.style || {} ]}>
				{
				(this.state.mode == "register")?
					<Register
						dispatch={this.props.dispatch}
						onChangeMode={this.handleChangeToLoginMode}
					/>
				:
					<Login
						dispatch={this.props.dispatch}
						onChangeMode={this.handleChangeToRegisterMode}
					/>
				}
			</View>
		);
	}
}

export default connect(() => ({}))(LoginContainer);
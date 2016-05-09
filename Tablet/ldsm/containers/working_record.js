/* @flow */
"use strict";

import React, { Component, View, Text } from "react-native";
import { connect } from "react-redux";

class WorkingRecordContainer extends Component {
	render(){
		return (
			<View>
				<Text>{"Working container"}</Text>
			</View>
		);
	}
}

export default connect((state) => {
	return {
		company: state.company
	};
})(WorkingRecordContainer);
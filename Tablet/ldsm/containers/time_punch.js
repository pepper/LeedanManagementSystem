/* @flow */
"use strict";

import React, { Component, StyleSheet, View } from "react-native";
import { connect } from "react-redux/native";

let style = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row"
	}
});

class TimePunchContainer extends Component {
	render(){
		return (
			<View style={style.container} />
		);
	}
}

export default connect((state) => {
	return {
		company: state.company
	};
})(TimePunchContainer);
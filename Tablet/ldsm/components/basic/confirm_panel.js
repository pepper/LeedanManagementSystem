import React, { Component, StyleSheet, Modal, View, Text, TouchableOpacity } from "react-native";
import Button from "./button";
import { Color } from "../../definitions";


let style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	innerContainer:{
		backgroundColor: Color.white,
		borderRadius: 10,
		padding: 20,
		paddingBottom: 0,
	},
	content: {
		backgroundColor: Color.transparent,
	},
	message: {
		fontSize: 18,
	},
	buttonContainer: {
		flexDirection: "row",
		marginTop: 20,
	},
	cancelButton: {
		backgroundColor: Color.gray,
		marginRight: 10,
	},
	confirmButton: {
		backgroundColor: Color.light_blue,
	},
	buttonText: {
		fontSize: 14,
		color: Color.white,
	}
});

export default class extends Component{
	render(){
		return (
			<Modal
				animated={true}
				transparent={true}
				{...this.props}
			>
				<View style={style.container}>
					<View style={style.innerContainer}>
						<View style={style.content}>
							<Text style={style.message}>{this.props.message}</Text>
						</View>
						<View style={[style.content, style.buttonContainer]}>
							<Button style={style.cancelButton} onPress={this.props.onCancel}>
								<Text style={style.buttonText}>{this.props.cancelButtonText}</Text>
							</Button>
							<Button style={style.confirmButton} onPress={this.props.onConfirm}>
								<Text style={style.buttonText}>{this.props.confirmButtonText}</Text>
							</Button>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}
"use strict";

var React = require("react-native");
var Icon = require("react-native-vector-icons/FontAwesome");

var Color = require("../../definitions/color");

var {
	Text,
	View,
	TouchableWithoutFeedback,
	PropTypes,
	StyleSheet,
} = React;

var RoundButton = React.createClass({
	getInitialState: function(){
		return {
			pressing: false,
		}
	},
	propTypes:{
		onPress: PropTypes.func.isRequired,
		icon: PropTypes.string,
		text: PropTypes.string,
		size: PropTypes.number,
		smallFont: PropTypes.bool,
		active: PropTypes.bool,
		borderWidth: PropTypes.number,
	},
	getDefaultProps: function() {
		return {
			onPress: function(){
				console.log("Round button onPress function not defined.");
			},
			text: "Not Defined",
			colorType: "blue",
			smallFont: false,
			active: false,
			borderWidth: 1,
		};
	},
	onPressInHandler: function(){
		if(this.props.active){
			this.setState({
				pressing: true,
			});
		}
	},
	onPressOutHandler: function(){
		if(this.props.active){
			this.setState({
				pressing: false,
			});
		}
	},
	onPressHandler: function(){
		if(this.props.active){
			this.props.onPress(this.props.text);
		}
	},
	render: function(){
		var iconSize = this.props.size * 0.6;
		var textSize = this.props.size * 0.7;
		var smallTextSize = this.props.size * 0.3;
		
		var borderColor = Color.gray;
		var backgroundColor = "transparent";
		var textColor = Color.gray;
		
		var activeBorderColor = Color.light_blue;
		var activeBackgroundColor = Color.light_blue;
		var activeTextColor = Color.white;
		
		var pressingBorderColor = Color.light_blue;
		var pressingBackgroundColor = Color.gray;
		var pressingTextColor = Color.white;
		
		switch(this.props.type){
			case "blue":
				borderColor = Color.light_blue;
				backgroundColor = "transparent";
				textColor = Color.gray;
				activeBorderColor = Color.light_blue;
				activeBackgroundColor = Color.light_blue;
				activeTextColor = Color.white;
				pressingBorderColor = Color.light_blue;
				pressingBackgroundColor = Color.gray;
				pressingTextColor = Color.white;
				break;
			case "yellow":
				borderColor = Color.gray;
				backgroundColor = "transparent";
				textColor = Color.gray;
				activeBorderColor = Color.yellow;
				activeBackgroundColor = Color.yellow;
				activeTextColor = Color.white;
				pressingBorderColor = Color.yellow;
				pressingBackgroundColor = Color.gray;
				pressingTextColor = Color.white;
				break;
			case "orange":
				borderColor = Color.gray;
				backgroundColor = "transparent";
				textColor = Color.gray;
				activeBorderColor = Color.orange;
				activeBackgroundColor = Color.orange;
				activeTextColor = Color.white;
				pressingBorderColor = Color.orange;
				pressingBackgroundColor = Color.gray;
				pressingTextColor = Color.white;
				break;
			case "blueHole":
				borderColor = Color.gray;
				backgroundColor = "transparent";
				textColor = Color.gray;
				activeBorderColor = Color.light_blue;
				activeBackgroundColor = "transparent";
				activeTextColor = Color.white;
				pressingBorderColor = Color.light_blue;
				pressingBackgroundColor = Color.light_blue;
				pressingTextColor = Color.white;
				break;
			case "whiteHole":
				borderColor = Color.gray;
				backgroundColor = "transparent";
				textColor = Color.gray;
				activeBorderColor = Color.white;
				activeBackgroundColor = "transparent";
				activeTextColor = Color.white;
				pressingBorderColor = Color.white;
				pressingBackgroundColor = Color.white;
				pressingTextColor = Color.gray;
		}

		var style = StyleSheet.create({
			container:{
				width: this.props.size,
				height: this.props.size,
				justifyContent: "center",
				alignItems: "center",
				borderWidth: this.props.borderWidth,
				borderRadius: this.props.size / 2,
				borderColor: borderColor,
			},
			active:{
				backgroundColor: activeBackgroundColor,
				borderColor: activeBorderColor,
			},
			pressing:{
				backgroundColor: pressingBackgroundColor,
				borderColor: pressingBorderColor,
			},
			icon:{
				width: iconSize,
			},
			text:{
				fontSize: textSize,
				color: textColor,
			},
			smallText:{
				fontSize: smallTextSize,
			},
			activeText:{
				color: activeTextColor,
			},
			pressingText:{
				color: pressingTextColor,
			},
		});
		var iconColor = textColor;
		if(this.props.active){
			iconColor = activeTextColor;
		}
		if(this.state.pressing){
			iconColor = pressingTextColor;
		}
		return (
			<TouchableWithoutFeedback onPressIn={this.onPressInHandler} onPressOut={this.onPressOutHandler} onPress={this.onPressHandler}>
				<View style={[style.container, (this.props.active && style.active), (this.state.pressing && style.pressing)]}>
					{
						(this.props.icon)?
						<Icon name={this.props.icon} size={iconSize} color={iconColor} style={style.icon} />
						:
						<Text style={[style.text, (this.props.smallFont && style.smallText), (this.props.active && style.activeText), (this.state.pressing && style.pressingText)]}>{this.props.text}</Text>
					}
				</View>
			</TouchableWithoutFeedback>
		);
	}
});

module.exports = RoundButton;
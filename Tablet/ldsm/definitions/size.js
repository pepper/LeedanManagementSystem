/* @flow */
"use strict";

import { Dimensions } from "react-native";

module.exports = {
	app_width: Dimensions.get("window").width,
	app_height: Dimensions.get("window").height,

	first_row_height: 64,
	first_row_padding_top: 35,
	row_height: 70,
	row_border_width: 0.5,

	title_padding_top: 35,
	title_font_size: 20,
	title_padding_left: 13,

	ios:{
		full_width: 1024,
		full_height: 768,

		main_menu_width: 90,

		second_menu_default_width: 300,
		second_menu_item_default_height: 70.5,
		second_menu_title_height: 64,
		second_menu_side_padding: 4.5,
		second_menu_icon_size: 40,
		second_menu_icon_column_height: 69.5,
		second_menu_icon_column_width: 70,

		// list_view_title_height: 64,
		// list_view_row_height: 70.5,
		list_view_title_padding_top: 35,
		list_view_title_font_size: 20,
		list_view_title_padding_left: 13
	}
};

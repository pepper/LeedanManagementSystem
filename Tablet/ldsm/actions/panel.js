/* @flow */
"use strict";

import { createAction } from "redux-actions";
import Constant from "../constants/";

exports.showPanel = (key, props) => {
	return createAction(Constant.SHOW_PANEL)({
		key: key,
		props: props
	});
};
exports.hidePanel = () => {
	return createAction(Constant.HIDE_PANEL)();
};
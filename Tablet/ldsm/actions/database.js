/* @flow */
"use strict";

import { createAction } from "redux-actions";
import Constant from "../constants/";
import { init } from "../databases";

exports.initDatabase = (daName) => {
	return (dispatch) => {
		dispatch(createAction(Constant.INIT_DATABASE_START)());
		init(daName).then(() => {
			dispatch(createAction(Constant.INIT_DATABASE_FINISH)());
		}).catch((err) => {
			console.log(err);
			dispatch(createAction(Constant.INIT_DATABASE_FAIL)());
		});
	};
};
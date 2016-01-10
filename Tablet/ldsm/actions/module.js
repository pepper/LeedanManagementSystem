/* @flow */
"use strict";

import { createAction } from "redux-actions";
import Constant from "../constants/";

exports.changeModule = (key) => {
	return createAction(Constant.CHANGE_MODULE)(key);
};
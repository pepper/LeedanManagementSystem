import { createAction } from "redux-actions";
import Constant from "../constants/";
import database from "../databases";

exports.register = (title, username, password) => {
	return (dispatch) => {
		dispatch(createAction(Constant.REGISTER_START)());
		database.register(title, username, password).then(() => {
			dispatch(createAction(Constant.REGISTER_FINISH)());
		}).catch((err) => {
			console.log(err);
			dispatch(createAction(Constant.REGISTER_FAIL)());
		});
	}
}

// exports.companyCheckLogin = () => {
// 	return (dispatch) => {
// 		dispatch(createAction(Constant.CHECK_LOGIN_START)());

// 	}
// }

exports.initDatabase = (daName) => {
	return (dispatch) => {
		dispatch(createAction(Constant.INIT_DATABASE_START)());
		database.initDatabase(daName).then(() => {
			dispatch(createAction(Constant.INIT_DATABASE_FINISH)());
		}).catch((err) => {
			console.log(err);
			dispatch(createAction(Constant.INIT_DATABASE_FAIL)());
		});
	}
}
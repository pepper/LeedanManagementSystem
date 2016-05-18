import { combineReducers } from "redux";

import messageReducer from "./message";
import moduleReducer from "./module";
import companyReducer from "./company";
import panelReducer from "./panel";
// import stockReducer from "./stock";
import invoicingReducer from "./invoicing";
import employeeReducer from "./employee";
import systemReducer from "./system";

export default combineReducers({
	...messageReducer,
	...moduleReducer,
	...companyReducer,
	...panelReducer,
	// ...stockReducer,
	...invoicingReducer,
	...employeeReducer,
	...systemReducer,
});
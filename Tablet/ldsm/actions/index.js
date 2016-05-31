/* @flow */
"use strict";

import MessageAction from "./message";
import DatabaseAction from "./database";
import CompanyAction from "./company";
import ModuleAction from "./module";
import PanelAction from "./panel";
// import StockAction from "./stock";
import InvoicingAction from "./invoicing";
import EmployeeAction from "./employee";
import DayBookAction from "./day_book";

module.exports = {
	Message: MessageAction,
	Database: DatabaseAction,
	Company: CompanyAction,
	Module: ModuleAction,
	Panel: PanelAction,
	// Stock: StockAction,
	Invoicing: InvoicingAction,
	Employee: EmployeeAction,
	DayBook: DayBookAction,
};
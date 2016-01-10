/* @flow */
"use strict";

import MessageAction from "./message";
import DatabaseAction from "./database";
import CompanyAction from "./company";
import ModuleAction from "./module";
import PanelAction from "./panel";

module.exports = {
	Message: MessageAction,
	Database: DatabaseAction,
	Company: CompanyAction,
	Module: ModuleAction,
	Panel: PanelAction
};
import md5 from "md5";
import uuid from "uuid";
import { get } from "nested-property";

import { privateKey } from "../config";
import { I18n, ErrorDinifition } from "../definitions";
import { checkPropertyRequire, checkDocumentNotExist, checkoutDocuments, getDocument, createDocument, updateDocument } from "./util";
import Employee from "./employee";

export default class Company {
	constructor(property){
		Object.assign(this, {
			title:			"",
			description:	"",
			uuid:			"",
			username:		"",
			password:		"",
			employee_list:	[],
			avtive_module:	[]
		}, property);
	}
	createEmployee = async (property) => {
		let employee = await Employee.create(this, property);
		this.employee_list.push(employee._id);
		return await updateDocument(this);
	};
	loadEmployeeList = async () => {
		let promiseList = this.employee_list.map(async (employeeId) => {
			return await Employee.load(employeeId);
		});
		return await Promise.all(promiseList);
	}
}
Company.views = {
	lists:{
		map: function(doc){
			emit(doc.username, doc);
		}.toString()
	}
};

Company.register = async (property) => {
	checkPropertyRequire(property, "title");
	checkPropertyRequire(property, "username");
	checkPropertyRequire(property, "password");
	// TODO: Must check passsword weak
	await checkDocumentNotExist("company", "lists", {
		keys: [property.username],
		limit: 1
	}, I18n.t("username_already_token"));
	let company = new Company();
	company.title = property.title;
	company.username = property.username;
	company.password = md5(property.password + privateKey);
	company.uuid = uuid.v4();
	return await createDocument(company);
};

Company.login = async (property) => {
	checkPropertyRequire(property, "username");
	checkPropertyRequire(property, "password");
	let company = get(await checkoutDocuments("company", "lists", {
		keys: [property.username],
		limit: 1
	}), "rows.0");
	if(get(company, "value.password") == md5(property.password + privateKey)){
		return company.id;
	}
	else{
		throw new Error(I18n.t("username_or_password_wrong"));
	}
};

Company.load = async (companyId) => {
	return new Company(await getDocument(companyId));
};
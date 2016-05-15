import md5 from "md5";
import uuid from "uuid";
import { get } from "nested-property";

import { privateKey } from "../config";
import { I18n, ErrorDinifition } from "../definitions";

import { checkPropertyRequire, checkDocumentNotExist, checkoutDocuments, getDocument, createDocument } from "./util";

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
		if(this.employee_list.every((employee) => {
			return employee.id_number != property.id_number && employee.passcode != property.passcode;
		})){
			let newEmployee = new Employee();
			await newEmployee.create(this, property);
			this.employee_list.push(newEmployee);
			return await database.updateDocument(this);
		}
		else{
			throw new ErrorDinifition.AlreadyExistError(I18n.t("employee_passcode_or_id_number_already_token"));
		}
	};
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
	console.log(company);
	console.log(get(company, "value.password"));
	console.log(privateKey);
	console.log(md5(property.password + privateKey));
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
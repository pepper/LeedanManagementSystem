import md5 from "md5";
import uuid from "uuid";
import { get } from "nested-property";

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
			await newEmployee.create(company, property);
			this.employee_list.push(newEmployee);
			return await database.updateDocument(this);
		}
		else{
			throw new error.AlreadyExistError("Employee passcode or id number already token");
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
	}, "Company username already token");
	let company = new Company();
	company.title = title;
	company.username = property.username;
	company.password = md5(property.password + privateKey);
	company.uuid = uuid.v4();
	return await database.createDocument(company);
};

Company.login = async (property) => {
	checkPropertyRequire(property, "username");
	checkPropertyRequire(property, "password");
	let company = get(await checkoutDocuments("company", "lists", {
		keys: [property.username],
		limit: 1
	}), "0");
	if(company.password == md5(property.password + privateKey)){
		return company.id;
	}
	else{
		throw new Error("Username or password wrong.");
	}
};

Company.load = async (companyId) => {
	return new Company(await getDocument(companyId));
}
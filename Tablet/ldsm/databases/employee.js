import uuid from "uuid";

import { I18n, ErrorDinifition } from "../definitions";
import { checkPropertyRequire, checkDocumentNotExist, createDocument, getDocument } from "./util";

export default class Employee {
	constructor(property){
		Object.assign(this, {
			company_id:		"",
			name:			"",
			id_number:		"",
			serial_number:	"",
			passcode:		"",
			avatar:			"",
			permission:		"",
			group:			""
		}, property);
	}
	// addPunchRecord = (type) => {
	// 	if(!this.punch_record){
	// 		this.punch_record = [];
	// 	}
	// 	this.punch_record.push({
	// 		create_datetime: new Date(),
	// 		type: type
	// 	});
	// };
}
Employee.views = {
	lists:{
		map: function(doc){
			emit(doc.company_id + doc.id_number, doc);
		}.toString()
	}
};

Employee.create = async (company, property) => {
	await checkPropertyRequire(property, "name");
	await checkPropertyRequire(property, "id_number");
	await checkPropertyRequire(property, "passcode");
	let number = Math.floor(Math.random() * 1000000000);
	let serialNumber = ("1" + (new Array(10 - number.toString().length)).join("0") + number);
	
	// await checkDocumentNotExist("employee", "lists", {
	// 	keys: [company._id + property.id_number],
	// 	limit: 1
	// }, I18n.t("employee_passcode_or_id_number_already_token"));

	let employee = new Employee({
		company_id: company._id,
		name: property.name,
		id_number: property.id_number,
		passcode: property.passcode,
		permission: [].concat(property.permission),
		serial_number: serialNumber
	});
	return await createDocument(employee);
	// return employee;
};

Employee.load = async (employeeId) => {
	return new Employee(await getDocument(employeeId));
};
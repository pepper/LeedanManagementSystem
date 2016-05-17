import md5 from "md5";
import uuid from "uuid";
import { get } from "nested-property";
import validator from "validator";

import { privateKey } from "../config";
import { I18n, ErrorDinifition } from "../definitions";
import { checkPropertyRequire, checkDocumentNotExist, checkoutDocuments, getDocument, createDocument, updateDocument } from "./util";
import Employee from "./employee";
import Stock from "./stock";
import Product from "./product";

export default class Company {
	constructor(property){
		Object.assign(this, {
			data_type:				"company",
			title:					"",
			description:			"",
			uuid:					"",
			username:				"",
			password:				"",
			employee_id_list:		[],		// Employee
			avtive_module:			[],

			tax_id:					"",
			post_address:			"",
			phone:					"",
			fax:					"",

			contact:{
				name:				"",
				cellphone:			"",
				phone:				"",
				email:				""
			},

			product_id_list:		[],		// Product
			stock_id_list:			[],		// Stock
			order_id_list:			[],		// Order
			supply_id_list:			[],		// Company
		}, property);
	}

	// Basic
	createEmployee = async (property) => {
		let employee = await Employee.create(this, property);
		this.employee_id_list.push(employee._id);
		return await updateDocument(this);
	};
	loadEmployeeList = async () => {
		let promiseList = this.employee_id_list.map(async (employeeId) => {
			return await Employee.load(employeeId);
		});
		return await Promise.all(promiseList);
	};
	updateProperty = async (property, notSave) => {
		if(get(property, "name")){
			this.name = property.name;
		}
		if(get(property, "tax_id")){
			this.tax_id = property.tax_id;
		}
		if(get(property, "post_address")){
			this.post_address = property.post_address;
		}
		if(get(property, "phone")){
			this.phone = property.phone;
		}
		if(get(property, "fax")){
			this.fax = property.fax;
		}
		if(get(property, "contact.name")){
			this.contact.name = property.contact.name;
		}
		if(get(property, "contact.cellphone")){
			this.contact.cellphone = property.contact.cellphone;
		}
		if(get(property, "contact.phone")){
			this.contact.phone = property.contact.phone;
		}
		if(get(property, "contact.email")){
			this.contact.email = property.contact.email;
		}
		if(!notSave){
			await updateDocument(this);
		}
	};

	// Product
	createProduct = async (property) => {
		let product = await Product.create(this, product);
		this.product_id_list.push(product._id);
		return await updateDocument(this);
	};

	// Stock
	createStock = async (property) => {
		let stock = await Stock.create(this, property);
		this.stock_id_list.push(stock._id);
		return await updateDocument(this);
	};
	createMultipleStock = async (propertyList) => {
		let stockList = await Stock.createMultiple(this, propertyList);
		if(stockList.length > 0){
			this.stock_id_list = this.stock_id_list.concat(stockList.map((stock) => (stock.id)));
			return await updateDocument(this);
		}
		return this;
	};

	// Supplier

}
Company.views = {
	lists:{
		map: function(doc){
			if(doc["data_type"] == "company"){
				emit("company" + doc.username, doc);
			}
			if(doc["data_type"] == "employee"){
				emit("employee" + doc.company_id + doc.id_number, doc);
			}
			if(doc["data_type"] == "stock"){
				emit("stock" + doc.company_id + doc.sku_number, doc);
			}
		}.toString()
	}
};

Company.register = async (property) => {
	checkPropertyRequire(property, "title");
	checkPropertyRequire(property, "username");
	checkPropertyRequire(property, "password");
	// TODO: Must check passsword weak
	await checkDocumentNotExist("company", "lists", {
		keys: ["company" + property.username],
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
		keys: ["company" + property.username],
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

Company.createSupplier = async (property) => {
	checkPropertyRequire(property, "title");
	let company = new Company();
	company.updateSupplierInformation();
	company.uuid = uuid.v4();
	company.title = property.title;
	await company.updateProperty(property);
	return await createDocument(company);
};
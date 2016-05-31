import md5 from "md5";
import uuid from "uuid";
import { get } from "nested-property";
import validator from "validator";

import { privateKey } from "../config";
import { I18n, ErrorDinifition } from "../definitions";
import { checkPropertyRequire, checkDocumentNotExist, checkoutDocuments, getDocument, createDocument, updateDocument, modifyDocuments, getDocumentList } from "./util";
import Employee from "./employee";
import Stock from "./stock";
import Product from "./product";
import DayBook from "./day_book";

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
			supplier_id_list:		[],		// Company
			day_book_id_list:		[],		// DayBook
		}, property);
	}

	// Basic
	createEmployee = async (property) => {
		let employee = await Employee.create(this, property);
		this.employee_id_list.push(employee._id);
		return new Company(await updateDocument(this));
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
		let product = await Product.create(this, property);
		this.product_id_list.push(product._id);
		return await updateDocument(this);
	};
	createMultipleProduct = async (propertyList) => {
		let productList = await Product.createMultiple(this, propertyList);
		if(productList.length > 0){
			this.product_id_list = this.product_id_list.concat(productList.map((product) => (product.id)));
			return new Company(await updateDocument(this));
		}
		return this;
	};
	loadProductList = async () => {
		return await Product.loadList(this.product_id_list);
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
			return new Company(await updateDocument(this));
		}
		return this;
	};
	loadStockList = async () => {
		return await Stock.loadList(this.stock_id_list);
	};

	// Supplier
	createSupplier = async (property) => {
		let supplier = await Company.createSupplier(property);
		this.supplier_id_list.push(supplier._id);
		return await updateDocument(this);
	};
	createMultipleSupplier = async (propertyList) => {
		let supplierList = await Company.creeateMultipleSupplier(propertyList);
		if(supplierList.length > 0){
			this.supplier_id_list = this.supplier_id_list.concat(supplierList.map((supplier) => (supplier.id)));
			return new Company(await updateDocument(this));
		}
		return this;
	};
	loadSupplierList = async () => {
		return await Company.loadList(this.supplier_id_list);
	};

	// Day Book
	createDayBook = async (property) => {
		let dayBook = await DayBook.create(this, property);
		this.day_book_id_list.push(dayBook._id);
		return await updateDocument(this);
	};
	removeDayBook = async () => {

	};
	loadDayBookList = async () => {
		return await DayBook.loadList(this.day_book_id_list);
	};
}
Company.views = {
	lists:{
		map: function(doc){
			emit(doc._id, doc);
			if(doc["data_type"] == "company"){
				emit("company" + doc.username, doc);
			}
			if(doc["data_type"] == "employee"){
				emit("employee" + doc.company_id + doc.id_number, doc);
			}
			if(doc["data_type"] == "stock"){
				emit("stock" + doc.company_id + doc.sku_number, doc);
			}
			if(doc["data_type"] == "product"){
				emit("product" + doc.company_id + doc.sku_number, doc);
			}
			if(doc["data_type"] == "day_book"){
				emit("daybook" + doc.company_id + doc.title, doc);
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

Company.createSupplier = async (property, notSave) => {
	checkPropertyRequire(property, "title");
	let company = new Company();
	company.uuid = uuid.v4();
	company.title = property.title;
	await company.updateProperty(property, true);
	if(!notSave){
		company = await createDocument(company);
	}
	return company;
};

Company.creeateMultipleSupplier = async (propertyList) => {
	const promiseList = propertyList.map(async (property) => {
		return await Company.createSupplier(property, true);
	});
	
	const supplierList = await Promise.all(promiseList);
	let modifyResult = await modifyDocuments(supplierList);
	return modifyResult;
};

Company.loadList = async (companyIdList) => {
	return (await getDocumentList("company", "lists", {
		keys: companyIdList
	})).rows.map((companyObject) => {
		return new Company(companyObject.value);
	});
};
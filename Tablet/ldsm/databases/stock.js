import uuid from "uuid";
import { get } from "nested-property";

import { I18n, ErrorDinifition } from "../definitions";
import { checkPropertyRequire, checkDocumentNotExist, getDocument, createDocument, updateDocument, modifyDocuments } from "./util";

export default class Stock {
	constructor(property){
		Object.assign(this, {
			data_type:				"stock",
			company_id:				"",
			title:					"",
			sku_number:				"",
			uuid:					"",
			serial_number:			"",
			stock_number:			0,
			safety_stock:			0,
			shortest_binning_days:	0,
			unit:					"",
			specification:			"",
			type:					"",
			supplier_id_list:		"",	// Company
			keeper_id:				"",	// Employee
			keeper_name:			""
		}, property);
	}
	updateProperty = async (property, notSave) => {
		if(get(property, "stock_number") && property.stock_number >= 0){
			this.stock_number = property.stock_number;
		}
		if(get(property, "safety_stock") && property.safety_stock >= 0){
			this.safety_stock = property.safety_stock;
		}
		if(get(property, "shortest_binning_days") && property.shortest_binning_days >= 0){
			this.shortest_binning_days = property.shortest_binning_days;
		}
		if(get(property, "unit")){
			this.unit = property.unit;
		}
		if(get(property, "specification")){
			this.specification = property.specification;
		}
		if(get(property, "type")){
			this.type = property.type;
		}
		if(!notSave){
			await updateDocument(this);
		}
		return this;
	};
	setKeeper = async (keeperId) => {
		const keeper = await getDocument(keeperId);
		this.keeper_id = keeper._id;
		this.keeper_name = keeper.name;
		await updateDocument(this);
		return this;
	};
	addSupplier = async (supplierIdList) => {
		const promiseList = supplierIdList.map(async (supplierId) => {
			return await getDocument(supplierId);
		});
		await getDocument(supplierIdList);
		const supplierList = await Promise.all(promiseList);
		this.supplier_id_list = this.supplier_id_list.concat(supplierList.filter((supplier) => {
			return this.supplier_id_list.indexOf(supplier._id) < 0;
		}).map((supplier) => {
			return supplier._id;
		}));
		await updateDocument(this);
		return this;
	};
}

Stock.views = {
	lists:{
		map: function(doc){
			emit(doc.company_id + doc.sku_number, doc);
		}.toString()
	}
};

Stock.create = async (company, property, createMultipleUse) => {
	await checkPropertyRequire(property, "title");
	await checkPropertyRequire(property, "sku_number");
	let number = Math.floor(Math.random() * 1000000000);
	let serialNumber = ("2" + (new Array(10 - number.toString().length)).join("0") + number);
	
	if(!createMultipleUse){
		await checkDocumentNotExist("company", "lists", {
			keys: ["stock" + company._id + property.sku_number],
			limit: 1
		}, I18n.t("stock_sku_number_already_token"));
	}
	let stock = new Stock({
		company_id: company._id,
		title: property.title,
		sku_number:	property.sku_number,
		uuid: uuid.v4(),
		serial_number: serialNumber
	});
	await stock.updateProperty(property, true);
	if(!createMultipleUse){
		stock = await createDocument(stock);
	}
	return stock;
};

Stock.createMultiple = async (company, propertyList) => {
	// TODO:Must filter out duplicate sku-number in propertyList
	const result = await checkDocumentNotExist("company", "lists", {
		keys: propertyList.map((property) => {
			return "stock" + company._id + property.sku_number
		})
	}, I18n.t("stock_sku_number_already_token"), true);
	console.log(result);

	if(get(result, "rows.length") > 0){
		let currentSkuNumberList = result.rows.map((stock) => {
			return stock.value.sku_number;
		});
		propertyList = propertyList.filter((property) => ( currentSkuNumberList.indexOf(property.sku_number) < 0));
	}
	const promiseList = propertyList.map(async (property) => {
		return await Stock.create(company, property, true);
	});
	
	// const stockList = await Promise.all(promiseList);
	// let modifyResult = await modifyDocuments(stockList);
	// console.log(modifyResult);
	// return modifyResult;
	return [];
}
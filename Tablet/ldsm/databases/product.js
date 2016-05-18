import uuid from "uuid";
import { get } from "nested-property";

import { I18n, ErrorDinifition } from "../definitions";
import { checkPropertyRequire, checkDocumentNotExist, getDocument, createDocument, updateDocument, modifyDocuments, getDocumentList } from "./util";

export default class Product {
	constructor(property){
		Object.assign(this, {
			data_type:				"product",
			company_id:				"",
			title:					"",
			sku_number:				"",
			uuid:					"",
			serial_number:			"",
			unit:					"",
			stock_number:			0,
			specification:			"",
			type:					""
		}, property);
	}
	updateProperty = async (property, notSave) => {
		if(get(property, "stock_number") && property.stock_number >= 0){
			this.stock_number = property.stock_number;
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
}

Product.create = async (company, property, createMultipleUse) => {
	await checkPropertyRequire(property, "title");
	await checkPropertyRequire(property, "sku_number");
	let number = Math.floor(Math.random() * 1000000000);
	let serialNumber = ("8" + (new Array(10 - number.toString().length)).join("0") + number);
	
	if(!createMultipleUse){
		await checkDocumentNotExist("company", "lists", {
			keys: ["product" + company._id + property.sku_number],
			limit: 1
		}, I18n.t("stock_sku_number_already_token"));
	}

	let product = new Product({
		company_id: company._id,
		title: property.title,
		sku_number:	property.sku_number,
		uuid: uuid.v4(),
		serial_number: serialNumber
	});
	await product.updateProperty(property, true);
	if(!createMultipleUse){
		product = await createDocument(product);
	}
	return product;
};

Product.createMultiple = async (company, propertyList) => {
	// TODO:Must filter out duplicate sku-number in propertyList
	const result = await checkDocumentNotExist("company", "lists", {
		keys: propertyList.map((property) => {
			return "product" + company._id + property.sku_number;
		})
	}, I18n.t("product_sku_number_already_token"), true);
	
	if(get(result, "rows.length") > 0){
		let currentSkuNumberList = result.rows.map((product) => {
			return product.value.sku_number;
		});
		propertyList = propertyList.filter((property) => ( currentSkuNumberList.indexOf(property.sku_number) < 0));
	}
	const promiseList = propertyList.map(async (property) => {
		return await Product.create(company, property, true);
	});
	
	const productList = await Promise.all(promiseList);
	let modifyResult = await modifyDocuments(productList);
	return modifyResult;
};

Product.loadList = async (productIdList) => {
	return (await getDocumentList("company", "lists", {
		keys: productIdList
	})).rows.map((productObject) => {
		return new Product(productObject.value);
	});
};
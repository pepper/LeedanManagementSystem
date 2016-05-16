import { checkPropertyRequire, checkDocumentNotExist, getDocument, createDocument, updateDocument } from "./util";

export default class Product {
	constructor(property){
		Object.assign(this, {
			ompany_id:				"",
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

Product.views = {
	lists:{
		map: function(doc){
			emit(doc.company_id + doc.sku_number, doc);
		}.toString()
	}
};

Product.create = async (company, property) => {
	await checkPropertyRequire(property, "title");
	await checkPropertyRequire(property, "sku_number");
	let number = Math.floor(Math.random() * 1000000000);
	let serialNumber = ("2" + (new Array(10 - number.toString().length)).join("0") + number);
	
	await checkDocumentNotExist("product", "lists", {
		keys: [company._id + property.sku_number],
		limit: 1
	}, I18n.t("stock_sku_number_already_token"));

	let stock = new Stock({
		company_id: company._id,
		title: property.title,
		sku_number:	property.sku_number,
		uuid: uuid.v4(),
		serial_number: serialNumber
	});
	await stock.updateProperty(property);
	return await createDocument(stock);
};
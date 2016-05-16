export default class Product {
	constructor(property){
		Object.assign(this, {
			ompany_id:				"",
			title:					"",
			uuid:					"",
			serial_number:			"",
			unit:					"",
			stock_number:			0,
			specification:			"",
			type:					""
		}, property);
	}
}
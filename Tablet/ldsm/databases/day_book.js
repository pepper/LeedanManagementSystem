import uuid from "uuid";

import { I18n, ErrorDinifition } from "../definitions";
import { checkPropertyRequire } from "./util";

import Model from "./model";
import Collection from "./collection";

class DayBookCollect extends Collection{
	async init(refPath, eventHandler, modelClass, propsList){
		await super.init(refPath, eventHandler, DayBook, propsList);
	}
}

DayBookCollect.load = async (companyId, eventHandler) => {
	let dayBookCollect = new DayBookCollect();
	console.log("company/" + companyId + "/day_books");
	await dayBookCollect.init("company/" + companyId + "/day_books", eventHandler);
	return dayBookCollect;
};

class DayBook extends Model{
	async init(refPath, autoId, eventHandler, props, notInitUpdate){
		if(props){
			await checkPropertyRequire(props, "title");
			await checkPropertyRequire(props, "account_way");
			props = Object.assign({
				title:				"",
				account_way:		"",
				group:				"",
				type_list:			[],
				record_list:		[],
				total_amount:		0,
				last_index:			0,
				modify_datetime:	(new Date()).toString()
			}, props);
		}
		await super.init(refPath, autoId, eventHandler, props, notInitUpdate);
	}
	addRecord = async (property) => {
		await checkPropertyRequire(property, "title");
		await checkPropertyRequire(property, "amount", "number");
		await checkPropertyRequire(property, "type");
		if(property.amount < 0){
			throw new ErrorDinifition.InputPropertyNotAcceptError(I18n.t("day_book_amount_must_grade_then_zero"));
		}

		let newRecord = Object.assign({
			index: this.last_index + 1,
			uuid: uuid.v4(),
			title: "",
			type: "",
			note: "",
			amount: 0,
			record_datetime: (new Date()).toString(),
			create_datetime: (new Date()).toString()
		}, {
			title: property.title,
			type: property.type || "",
			note: property.note || "",
			amount: property.amount,
			record_datetime: property.record_datetime.toString() || (new Date()).toString()
		});

		this.record_list.push(newRecord);
		this.total_amount += property.amount;
		this.last_index += 1;
		this.modify_datetime = (new Date()).toString();
		if(this.type_list.indexOf(property.type) < 0){
			this.type_list.push(property.type);
		}

		this.update(this);
	};
	removeRecord = async (recordIndex) => {
		let amount = 0;
		let newRecordList = this.record_list.filter((record) => {
			if(record.index == recordIndex){
				amount = record.amount;
				return false;
			}
			return true;
		});
		if(newRecordList.length != this.record_list.length){
			this.record_list = newRecordList;
			this.total_amount -= amount;
			this.modify_datetime = (new Date()).toString();
			this.update(this);
		}
	};
	recalculate = async () => {
		const newTotalAmount = this.record_list.reduce((total, record) => {
			return total + record.amount;
		}, 0);
		if(this.total_amount != newTotalAmount){
			this.total_amount = newTotalAmount;
			this.modify_datetime = (new Date()).toString();
			return await updateDocument(this);
		}
		return this;
	};
}

DayBook.create = async (refPath, property) => {
	await checkPropertyRequire(property, "title");
	let dayBook = new DayBook();
	await dayBook.init(refPath, true, null, {
		title: property.title,
		modify_datetime: (new Date()).toString()
	});
};

DayBook.load = async (companyId, eventHandler) => {
	// Load all exist daybook
	// Load last daybook when create

};

module.exports = {
	DayBookCollect: DayBookCollect,
	DayBook: DayBook
};

// DayBook.load = async (dayBookId) => {
// 	return new DayBook(await getDocument(dayBookId));
// };

// DayBook.loadList = async (dayBookIdList) => {
// 	return (await getDocumentList("company", "lists", {
// 		keys: dayBookIdList
// 	})).rows.map((dayBookObject) => {
// 		return new DayBook(dayBookObject.value);
// 	});
// };
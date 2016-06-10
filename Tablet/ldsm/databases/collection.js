import { FIRDatabase } from "react-native-google-firebase";
import { auth, database, checkPropertyRequire } from "./util";

export default class Collection {
	async init(refPath, eventHandler, modelClass, propsList){
		// TODO: Must add new ID mode
		if(!refPath || refPath == ""){
			throw new Error("Must provide reference path.");
		}
		if(!modelClass){
			throw new Error("Must provide child class.");
		}
		this.modelClass = modelClass;
		this.ref = await database().rootReference.child(refPath);
		if(eventHandler){
			await this.observe(eventHandler);
		}
		if(Array.isArray(propsList)){
			this.update(props);
		}
	}
	update(props){
		this.ref.setValue(props);
	}
	add(props){
		const ModelClass = this.modelClass;
		let child = new ModelClass();
		child.init(this.ref.path, true, null, props);
	}
	remove(){

	}
	async observe(eventHandler){
		this.handle = await this.ref.observeEventType(FIRDatabase.FIRDataEventType.FIRDataEventTypeValue, (valueList) => {
			// console.log(valueList);
			// Object.entries(valueList).map((entries) => {
			// 	console.log(item);
			// });
			Object.assign(this, {
				children: valueList
			});
			eventHandler(this);
		});
	}
}

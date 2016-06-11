import { get } from "nested-property";
import { FIRDatabase } from "react-native-google-firebase";
import { database } from "./util";

export default class Collection {
	async init(refPath, eventHandler, modelClass){
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
	}
	update(props){
		let input = Object.assign({}, props);
		delete input.ref;
		this.ref.setValue(input);
	}
	add(props){
		const ModelClass = this.modelClass;
		let child = new ModelClass();
		child.init(this.ref.path, true, null, props);
	}
	get(key){
		return get(this, "children." + key);
	}
	remove(key){
		const child = get(this, "children." + key);
		if(child){
			child.remove();
		}
	}
	async observe(eventHandler){
		this.handle = await this.ref.observeEventType(FIRDatabase.FIRDataEventType.FIRDataEventTypeValue, async (valueList) => {
			const ModelClass = this.modelClass;
			this.children = {};
			await Promise.all(Object.entries(valueList || {}).map(async (entries) => {
				let child = new ModelClass();
				await child.init(this.ref.path + "/" + entries[0], false, null, entries[1], true);
				this.children[entries[0]] = child;
			}));
			eventHandler(this);
		});
	}
}

import { FIRDatabase } from "react-native-google-firebase";
import { database } from "./util";

export default class Model {
	async init(refPath, autoId, eventHandler, props, notInitUpdate){
		// TODO: Must add new ID mode
		if(!refPath || refPath == ""){
			throw new Error("Must provide reference path.");
		}
		this.ref = await database().rootReference.child(refPath);
		if(autoId){
			this.ref = await this.ref.childByAutoId();
		}
		if(eventHandler){
			await this.observe(eventHandler);
		}
		if(props){
			let input = Object.assign({}, props);
			delete input.ref;
			if(notInitUpdate){
				Object.assign(this, input);
			}
			else{
				this.update(input);
			}
		}
	}
	update(props){
		console.log("Model", this);
		let input = Object.assign({}, props);
		delete input.ref;
		this.ref.setValue(input);
	}
	remove(){
		this.ref.removeValue();
	}
	async observe(eventHandler){
		this.handle = await this.ref.observeEventType(FIRDatabase.FIRDataEventType.FIRDataEventTypeValue, (value) => {
			delete value.ref;
			Object.assign(this, value);
			eventHandler(this);
		});
	}
}

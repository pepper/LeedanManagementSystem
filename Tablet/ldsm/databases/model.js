import { FIRDatabase } from "react-native-google-firebase";
import { auth, database, checkPropertyRequire } from "./util";

export default class Model {
	async init(refPath, autoId, eventHandler, props, notInitUpdate){
		// TODO: Must add new ID mode
		if(!refPath || refPath == ""){
			throw new Error("Must provide reference path.");
		}
		if(autoId){
			this.ref = await this.ref.childByAutoId();
		}
		this.ref = await database().rootReference.child(refPath);
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
	delete(){

	}
	async observe(eventHandler){
		this.handle = await this.ref.observeEventType(FIRDatabase.FIRDataEventType.FIRDataEventTypeValue, (value) => {
			delete value.ref;
			Object.assign(this, value);
			eventHandler(this);
		});
	}
}

import { FIRDatabase } from "react-native-google-firebase";
import { auth, database, checkPropertyRequire } from "./util";

export default class Model {
	async init(refPath, autoId, eventHandler, props){
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
			this.update(props);
		}
	}
	update(props){
		this.ref.setValue(props);
	}
	delete(){

	}
	async observe(eventHandler){
		this.handle = await this.ref.observeEventType(FIRDatabase.FIRDataEventType.FIRDataEventTypeValue, (value) => {
			Object.assign(this, value);
			eventHandler(this);
		});
	}
}

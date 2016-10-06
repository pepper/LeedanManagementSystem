import { database } from "./util";

export default class Model {
	async init(refPath, autoId, eventHandler, props, notInitUpdate){
		// TODO: Must add new ID mode
		if(!refPath || refPath == ""){
			throw new Error("Must provide reference path.");
		}
		this.ref = database().ref(refPath);
		if(autoId){
			// this.ref = await this.ref.childByAutoId();
			this.ref = firebase.database().ref(refPath).push();
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
		let input = Object.assign({}, props);
		Object.entries(input).forEach((entry) => {
			if (typeof entry[1] === "function") {
				input[entry[0]] = null;
			}
		});
		delete input.ref;
		this.ref.set(input);
	}
	remove(){
		this.ref.remove();
	}
	async observe(eventHandler){
		this.handle = await this.ref.on("value", (snapshot) => {
			Object.assign(this, snapshot.val());
			eventHandler(this);
		});
	}
}

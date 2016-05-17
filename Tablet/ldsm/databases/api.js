requestAPI = async (method, url, data) => {
	let response = await fetch(url, {
		method: method,
		headers:{
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: (data)?JSON.stringify(data):null,
	});
	if(response.status >= 200 && response.status < 300){
		let json = await response.json();
		if(json.success){
			return json.objects;
		}
		else{
			throw new Error(json.message);
		}
	}
	else{
		throw new Error(response.status + " " + response._bodyText);
	}
};

exports.loadStock = async () => {
	return await requestAPI("GET", "http://leedan.fu-good.tw/api/company/557a9e588982f49c0750eb70/stock");
}

exports.loadSupplier = async () => {
	return await requestAPI("GET", "http://leedan.fu-good.tw/api/company/557a9e588982f49c0750eb70/supplier");
}

exports.loadProduct = async () => {
	return await requestAPI("GET", "http://leedan.fu-good.tw/api/company/557a9e588982f49c0750eb70/product");
}

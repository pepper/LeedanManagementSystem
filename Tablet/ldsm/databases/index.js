import { initDatabase, createDesignDocument } from "./util";
import Company from "./company";

// TODO: Must move to config and scret bank
const port = 5984;
const username = "react-native-sync-model";
const password = "ledom-cnys-evitan-tcaer";

exports.init = async (dbName) => {
	await initDatabase(username, password, port, dbName);
	await createDesignDocument("company", Company.views);
};

exports.Company = Company;
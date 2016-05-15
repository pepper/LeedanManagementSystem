import { initDatabase, createDesignDocument } from "./util";
import Company from "./company";
import { databasePort, databaseUsername, databasePassword } from "../config";

exports.init = async (dbName) => {
	await initDatabase(databaseUsername, databasePassword, databasePort, dbName);
	await createDesignDocument("company", Company.views);
};

exports.Company = Company;
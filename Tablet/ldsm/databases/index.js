import { initDatabase, createDesignDocument } from "./util";
import Company from "./company";
import Employee from "./employee";
import Stock from "./stock";
import Product from "./product";
import { databasePort, databaseUsername, databasePassword } from "../config";

exports.init = async (dbName) => {
	await initDatabase(databaseUsername, databasePassword, databasePort, dbName);
	await createDesignDocument("company", Company.views);
	// await createDesignDocument("employee", Employee.views);
	// await createDesignDocument("stock", Stock.views);
};

exports.Company = Company;
exports.Employee = Employee;
exports.Stock = Stock;
exports.Product = Product;
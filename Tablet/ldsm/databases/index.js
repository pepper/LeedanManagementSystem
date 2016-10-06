import { initFirebase, initAuth, initDatabase } from "./util";
import Company from "./company";
import Employee from "./employee";
import Stock from "./stock";
import Product from "./product";
import { DayBookCollect, DayBook } from "./day_book";
// import { databasePort, databaseUsername, databasePassword } from "../config";

// import { FIRApp } from "react-native-google-firebase";

exports.init = async (dbName) => {
	// await initDatabase(databaseUsername, databasePassword, databasePort, dbName);
	// await createDesignDocument("company", Company.views);
	// await createDesignDocument("employee", Employee.views);
	// await createDesignDocument("stock", Stock.views);

	initFirebase();
};

exports.Company = Company;
exports.Employee = Employee;
exports.Stock = Stock;
exports.Product = Product;
exports.DayBookCollect = DayBookCollect;
exports.DayBook = DayBook;
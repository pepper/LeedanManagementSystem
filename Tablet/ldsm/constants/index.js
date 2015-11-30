var constantArray = [
	"LOGIN_COMPANY_ID",

	"ALREADY_SHOW_MESSAGE",
	"ERROR_MESSAGE",
	"INFO_MESSAGE",

	"INIT_DATABASE_START",
	"INIT_DATABASE_FINISH",
	"INIT_DATABASE_FAIL",

	"LOGIN_FINISH",
	"LOGOUT_FINISH",
];

var constantObject = {};
constantArray.forEach(function(constant){
	constantObject[constant] = constant;
});

module.exports = constantObject;
var constantArray = [
	"INIT_DATABASE_START",
	"INIT_DATABASE_FINISH",
	"INIT_DATABASE_FAIL",
	"REGISTER_START",
	"REGISTER_FINISH",
	"REGISTER_FAIL",
];

var constantObject = {};
constantArray.forEach(function(constant){
	constantObject[constant] = constant;
});

module.exports = constantObject;
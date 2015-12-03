var messageReducer = require("./message");
var moduleReducer = require("./module");
var companyReducer = require("./company");

module.exports = { ...messageReducer, ...moduleReducer, ...companyReducer };
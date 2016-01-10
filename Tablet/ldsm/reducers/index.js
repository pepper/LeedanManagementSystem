var messageReducer = require("./message");
var moduleReducer = require("./module");
var companyReducer = require("./company");
var panelReducer = require("./panel");

module.exports = { ...messageReducer, ...moduleReducer, ...companyReducer, ...panelReducer };
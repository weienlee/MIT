var loopIndex = 0;

var generateCode = function(parsedOutput) {
	var command = parsedOutput;
	var type = command["type"];
	var code;
	switch(type) {
		case "initialize":
			var variable = command["variable"]["value"];
			var value = getValue(command["value"]);
			code = variable + " = " + value;
			break;

		case "set":
			var variable = command["variable"]["value"];
			var value = getValue(command["value"]);
			code = variable + " = " + value;
			break;

		case "return":
			var value = getValue(command["value"]);
			code = "return " + value;
			break;

		case "forloop":
			var forloopVar = getLoopVar(loopIndex);
			loopIndex += 1;
			if (command["loopOver"] == "integer") {
				var loopEnd = "range(" + command["value"]["value"] + ")";
			} else {
				var loopEnd = command["value"]["value"];
			}
			code = "for " + forloopVar + " in " + loopEnd + ":";
			break;

		case "ifstatement":
			var boolObject = command["boolean"];
			var boolExpression = parseBoolExpression(boolObject);
			code = "if " + boolExpression + ":";
			break;

		case "whileloop":
			var boolObject = command["boolean"];
			var boolExpression = parseBoolExpression(boolObject);
			code = "while " + boolExpression + ":";
			break;
	}
	return code;
};

var getComparator = function(comparatorString) {
	var symbol;
	switch(comparatorString) {
		case "less than":
			symbol = "<";
			break;

		case "greater than":
			symbol = ">";
			break;

		case "equal to":
			symbol = "==";
			break;

		case "not equal to":
			symbol = "!=";
			break;

		case "less than or equal to":
			symbol = "<=";
			break;

		case "greater than or equal to":
			symbol = ">=";
			break;
	}
	return symbol;
};

var parseBoolExpression = function(boolObject) {
	var val1 = boolObject["firstVal"]["value"];
	var val2 = boolObject["secondVal"]["value"];
	var comparator = getComparator(boolObject["comparator"]);
	return val1 + " " + comparator + " " + val2;

};

var getValue = function(valueObject) {
	if (valueObject["type"] == "string") {
		var value = "'" + valueObject["value"] + "'";
	} else {
		var value = valueObject["value"];
	}
	return value;
};

var getLoopVar = function(index)
{
    var possible = "abcdefghijklmnopqrstuvwxyz";
    return possible[index];
};
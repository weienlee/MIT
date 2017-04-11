MAIN -> INITIALIZE | SET | RETURN | FOR | IF | WHILE

# COMMANDS
INITIALIZE -> "initialize" _ VARIABLE _ TO _ VALUE {% function(data) {
	return {type:"initialize", variable:data[2], value:data[6]}}%}
SET -> "set" _ VARIABLE _ TO _ VALUE {% function(data) {
	return {type:"set", variable:data[2], value:data[6]}}%}
RETURN -> "return" _ VALUE {% function(data) {
	return {type:"return", value:data[2]} }%}
FOR -> "create" _ "a ":? FORLOOP ((INT _ "times") | ("over" _ VARIABLE)) {% function(data) {
	if (data[4][0][0] == "over") {
		return {type: "forloop", loopOver: "variable", value: data[4][0][2]}
	} else {
		return {type: "forloop", loopOver: "integer", value: data[4][0][0]}
	}}%}
	
IF -> "if" _ BOOLEAN_EXPRESSION {% function(data) {
	return {type:"ifstatement", boolean:data[2]}}%}
WHILE -> "while" _ BOOLEAN_EXPRESSION {% function(data) {
	return {type:"whileloop", boolean:data[2]}}%}




FORLOOP -> "for loop" _ ("which" | "that") _ "iterates" _ 

COMPARATOR -> ("less than" | "greater than" | "equal to" | "not equal to" | "less than or equal to" | "greater than or equal to") {% function(data) {return data[0][0]} %}
BOOLEAN_EXPRESSION -> VALUE _ "is" _ COMPARATOR _ VALUE {% function(data) {
	return {firstVal:data[0], comparator:data[4], secondVal:data[6]}} %}

NAME -> [a-zA-Z]:+ {% function(d) {return {value:d[0].join("")}} %}
VARIABLE -> "variable" _ NAME {% function(data) {
	return {type:"variable", value:data[2]["value"]}} %}
INT -> [0-9]:+        {% function(d) {return {type:"int", value:d[0].join("")}} %}
STRING -> ("the string "):? [a-zA-z]:+ {%
    function (data) {
		var value = data[1].join("");
		if (!data[0] && (value == "true" || value == "false")) {
			return {type: "boolean",
				value: value};
		} else {
		return {type: "string",
				value: value};
		}
    }
%}

VALUE -> VARIABLE {% function(data) {return data[0]} %} | STRING {% function(data) {return data[0]} %} | INT {% function(data) {return data[0]} %}

_ -> " " {% function(data) {return data[0]} %}
TO -> "to" {% function(data) {return data[0]} %}
			
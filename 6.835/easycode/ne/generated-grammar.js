// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }
var grammar = {
    ParserRules: [
    {"name": "MAIN", "symbols": ["INITIALIZE"]},
    {"name": "MAIN", "symbols": ["SET"]},
    {"name": "MAIN", "symbols": ["RETURN"]},
    {"name": "MAIN", "symbols": ["FOR"]},
    {"name": "MAIN", "symbols": ["IF"]},
    {"name": "MAIN", "symbols": ["WHILE"]},
    {"name": "INITIALIZE$string$1", "symbols": [{"literal":"i"}, {"literal":"n"}, {"literal":"i"}, {"literal":"t"}, {"literal":"i"}, {"literal":"a"}, {"literal":"l"}, {"literal":"i"}, {"literal":"z"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "INITIALIZE", "symbols": ["INITIALIZE$string$1", "_", "VARIABLE", "_", "TO", "_", "VALUE"], "postprocess":  function(data) {
        return {type:"initialize", variable:data[2], value:data[6]}}},
    {"name": "SET$string$1", "symbols": [{"literal":"s"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "SET", "symbols": ["SET$string$1", "_", "VARIABLE", "_", "TO", "_", "VALUE"], "postprocess":  function(data) {
        return {type:"set", variable:data[2], value:data[6]}}},
    {"name": "RETURN$string$1", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"t"}, {"literal":"u"}, {"literal":"r"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RETURN", "symbols": ["RETURN$string$1", "_", "VALUE"], "postprocess":  function(data) {
        return {type:"return", value:data[2]} }},
    {"name": "FOR$string$1", "symbols": [{"literal":"c"}, {"literal":"r"}, {"literal":"e"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "FOR$ebnf$1$string$1", "symbols": [{"literal":"a"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "FOR$ebnf$1", "symbols": ["FOR$ebnf$1$string$1"], "postprocess": id},
    {"name": "FOR$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FOR$subexpression$1$subexpression$1$string$1", "symbols": [{"literal":"t"}, {"literal":"i"}, {"literal":"m"}, {"literal":"e"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "FOR$subexpression$1$subexpression$1", "symbols": ["INT", "_", "FOR$subexpression$1$subexpression$1$string$1"]},
    {"name": "FOR$subexpression$1", "symbols": ["FOR$subexpression$1$subexpression$1"]},
    {"name": "FOR$subexpression$1$subexpression$2$string$1", "symbols": [{"literal":"o"}, {"literal":"v"}, {"literal":"e"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "FOR$subexpression$1$subexpression$2", "symbols": ["FOR$subexpression$1$subexpression$2$string$1", "_", "VARIABLE"]},
    {"name": "FOR$subexpression$1", "symbols": ["FOR$subexpression$1$subexpression$2"]},
    {"name": "FOR", "symbols": ["FOR$string$1", "_", "FOR$ebnf$1", "FORLOOP", "FOR$subexpression$1"], "postprocess":  function(data) {
        if (data[4][0][0] == "over") {
        	return {type: "forloop", loopOver: "variable", value: data[4][0][2]}
        } else {
        	return {type: "forloop", loopOver: "integer", value: data[4][0][0]}
        }}},
    {"name": "IF$string$1", "symbols": [{"literal":"i"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "IF", "symbols": ["IF$string$1", "_", "BOOLEAN_EXPRESSION"], "postprocess":  function(data) {
        return {type:"ifstatement", boolean:data[2]}}},
    {"name": "WHILE$string$1", "symbols": [{"literal":"w"}, {"literal":"h"}, {"literal":"i"}, {"literal":"l"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "WHILE", "symbols": ["WHILE$string$1", "_", "BOOLEAN_EXPRESSION"], "postprocess":  function(data) {
        return {type:"whileloop", boolean:data[2]}}},
    {"name": "FORLOOP$string$1", "symbols": [{"literal":"f"}, {"literal":"o"}, {"literal":"r"}, {"literal":" "}, {"literal":"l"}, {"literal":"o"}, {"literal":"o"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "FORLOOP$subexpression$1$string$1", "symbols": [{"literal":"w"}, {"literal":"h"}, {"literal":"i"}, {"literal":"c"}, {"literal":"h"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "FORLOOP$subexpression$1", "symbols": ["FORLOOP$subexpression$1$string$1"]},
    {"name": "FORLOOP$subexpression$1$string$2", "symbols": [{"literal":"t"}, {"literal":"h"}, {"literal":"a"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "FORLOOP$subexpression$1", "symbols": ["FORLOOP$subexpression$1$string$2"]},
    {"name": "FORLOOP$string$2", "symbols": [{"literal":"i"}, {"literal":"t"}, {"literal":"e"}, {"literal":"r"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "FORLOOP", "symbols": ["FORLOOP$string$1", "_", "FORLOOP$subexpression$1", "_", "FORLOOP$string$2", "_"]},
    {"name": "COMPARATOR$subexpression$1$string$1", "symbols": [{"literal":"l"}, {"literal":"e"}, {"literal":"s"}, {"literal":"s"}, {"literal":" "}, {"literal":"t"}, {"literal":"h"}, {"literal":"a"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "COMPARATOR$subexpression$1", "symbols": ["COMPARATOR$subexpression$1$string$1"]},
    {"name": "COMPARATOR$subexpression$1$string$2", "symbols": [{"literal":"g"}, {"literal":"r"}, {"literal":"e"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}, {"literal":"r"}, {"literal":" "}, {"literal":"t"}, {"literal":"h"}, {"literal":"a"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "COMPARATOR$subexpression$1", "symbols": ["COMPARATOR$subexpression$1$string$2"]},
    {"name": "COMPARATOR$subexpression$1$string$3", "symbols": [{"literal":"e"}, {"literal":"q"}, {"literal":"u"}, {"literal":"a"}, {"literal":"l"}, {"literal":" "}, {"literal":"t"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "COMPARATOR$subexpression$1", "symbols": ["COMPARATOR$subexpression$1$string$3"]},
    {"name": "COMPARATOR$subexpression$1$string$4", "symbols": [{"literal":"n"}, {"literal":"o"}, {"literal":"t"}, {"literal":" "}, {"literal":"e"}, {"literal":"q"}, {"literal":"u"}, {"literal":"a"}, {"literal":"l"}, {"literal":" "}, {"literal":"t"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "COMPARATOR$subexpression$1", "symbols": ["COMPARATOR$subexpression$1$string$4"]},
    {"name": "COMPARATOR$subexpression$1$string$5", "symbols": [{"literal":"l"}, {"literal":"e"}, {"literal":"s"}, {"literal":"s"}, {"literal":" "}, {"literal":"t"}, {"literal":"h"}, {"literal":"a"}, {"literal":"n"}, {"literal":" "}, {"literal":"o"}, {"literal":"r"}, {"literal":" "}, {"literal":"e"}, {"literal":"q"}, {"literal":"u"}, {"literal":"a"}, {"literal":"l"}, {"literal":" "}, {"literal":"t"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "COMPARATOR$subexpression$1", "symbols": ["COMPARATOR$subexpression$1$string$5"]},
    {"name": "COMPARATOR$subexpression$1$string$6", "symbols": [{"literal":"g"}, {"literal":"r"}, {"literal":"e"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}, {"literal":"r"}, {"literal":" "}, {"literal":"t"}, {"literal":"h"}, {"literal":"a"}, {"literal":"n"}, {"literal":" "}, {"literal":"o"}, {"literal":"r"}, {"literal":" "}, {"literal":"e"}, {"literal":"q"}, {"literal":"u"}, {"literal":"a"}, {"literal":"l"}, {"literal":" "}, {"literal":"t"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "COMPARATOR$subexpression$1", "symbols": ["COMPARATOR$subexpression$1$string$6"]},
    {"name": "COMPARATOR", "symbols": ["COMPARATOR$subexpression$1"], "postprocess": function(data) {return data[0][0]}},
    {"name": "BOOLEAN_EXPRESSION$string$1", "symbols": [{"literal":"i"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BOOLEAN_EXPRESSION", "symbols": ["VALUE", "_", "BOOLEAN_EXPRESSION$string$1", "_", "COMPARATOR", "_", "VALUE"], "postprocess":  function(data) {
        return {firstVal:data[0], comparator:data[4], secondVal:data[6]}} },
    {"name": "NAME$ebnf$1", "symbols": [/[a-zA-Z]/]},
    {"name": "NAME$ebnf$1", "symbols": ["NAME$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "NAME", "symbols": ["NAME$ebnf$1"], "postprocess": function(d) {return {value:d[0].join("")}}},
    {"name": "VARIABLE$string$1", "symbols": [{"literal":"v"}, {"literal":"a"}, {"literal":"r"}, {"literal":"i"}, {"literal":"a"}, {"literal":"b"}, {"literal":"l"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "VARIABLE", "symbols": ["VARIABLE$string$1", "_", "NAME"], "postprocess":  function(data) {
        return {type:"variable", value:data[2]["value"]}} },
    {"name": "INT$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "INT$ebnf$1", "symbols": ["INT$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "INT", "symbols": ["INT$ebnf$1"], "postprocess": function(d) {return {type:"int", value:d[0].join("")}}},
    {"name": "STRING$ebnf$1$subexpression$1$string$1", "symbols": [{"literal":"t"}, {"literal":"h"}, {"literal":"e"}, {"literal":" "}, {"literal":"s"}, {"literal":"t"}, {"literal":"r"}, {"literal":"i"}, {"literal":"n"}, {"literal":"g"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "STRING$ebnf$1$subexpression$1", "symbols": ["STRING$ebnf$1$subexpression$1$string$1"]},
    {"name": "STRING$ebnf$1", "symbols": ["STRING$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "STRING$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "STRING$ebnf$2", "symbols": [/[a-zA-z]/]},
    {"name": "STRING$ebnf$2", "symbols": ["STRING$ebnf$2", /[a-zA-z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "STRING", "symbols": ["STRING$ebnf$1", "STRING$ebnf$2"], "postprocess": 
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
        },
    {"name": "VALUE", "symbols": ["VARIABLE"], "postprocess": function(data) {return data[0]}},
    {"name": "VALUE", "symbols": ["STRING"], "postprocess": function(data) {return data[0]}},
    {"name": "VALUE", "symbols": ["INT"], "postprocess": function(data) {return data[0]}},
    {"name": "_", "symbols": [{"literal":" "}], "postprocess": function(data) {return data[0]}},
    {"name": "TO$string$1", "symbols": [{"literal":"t"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TO", "symbols": ["TO$string$1"], "postprocess": function(data) {return data[0]}}
]
  , ParserStart: "MAIN"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();

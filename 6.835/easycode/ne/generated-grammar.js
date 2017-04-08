// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }
var grammar = {
    ParserRules: [
    {"name": "MAIN", "symbols": ["WHILE"]},
    {"name": "INITIALIZE$string$1", "symbols": [{"literal":"i"}, {"literal":"n"}, {"literal":"i"}, {"literal":"t"}, {"literal":"i"}, {"literal":"a"}, {"literal":"l"}, {"literal":"i"}, {"literal":"z"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "INITIALIZE", "symbols": ["INITIALIZE$string$1", "_", "VARIABLE", "_", "TO", "_", "VALUE"]},
    {"name": "SET$string$1", "symbols": [{"literal":"s"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "SET", "symbols": ["SET$string$1", "_", "VARIABLE", "_", "TO", "_", "VALUE"]},
    {"name": "RETURN$string$1", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"t"}, {"literal":"u"}, {"literal":"r"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RETURN$subexpression$1", "symbols": ["VARIABLE"]},
    {"name": "RETURN$subexpression$1", "symbols": ["VALUE"]},
    {"name": "RETURN", "symbols": ["RETURN$string$1", "_", "RETURN$subexpression$1"]},
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
    {"name": "FOR", "symbols": ["FOR$string$1", "_", "FOR$ebnf$1", "FORLOOP", "FOR$subexpression$1"]},
    {"name": "IF$string$1", "symbols": [{"literal":"i"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "IF", "symbols": ["IF$string$1", "_", "BOOLEAN_EXPRESSION"]},
    {"name": "WHILE$string$1", "symbols": [{"literal":"w"}, {"literal":"h"}, {"literal":"i"}, {"literal":"l"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "WHILE", "symbols": ["WHILE$string$1", "_", "BOOLEAN_EXPRESSION"]},
    {"name": "NAME$ebnf$1", "symbols": [/[a-zA-Z]/]},
    {"name": "NAME$ebnf$1", "symbols": ["NAME$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "NAME", "symbols": ["NAME$ebnf$1"]},
    {"name": "VARIABLE$string$1", "symbols": [{"literal":"v"}, {"literal":"a"}, {"literal":"r"}, {"literal":"i"}, {"literal":"a"}, {"literal":"b"}, {"literal":"l"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "VARIABLE", "symbols": ["VARIABLE$string$1", "_", "NAME"]},
    {"name": "FORLOOP$string$1", "symbols": [{"literal":"f"}, {"literal":"o"}, {"literal":"r"}, {"literal":" "}, {"literal":"l"}, {"literal":"o"}, {"literal":"o"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "FORLOOP$subexpression$1$string$1", "symbols": [{"literal":"w"}, {"literal":"h"}, {"literal":"i"}, {"literal":"c"}, {"literal":"h"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "FORLOOP$subexpression$1", "symbols": ["FORLOOP$subexpression$1$string$1"]},
    {"name": "FORLOOP$subexpression$1$string$2", "symbols": [{"literal":"t"}, {"literal":"h"}, {"literal":"a"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "FORLOOP$subexpression$1", "symbols": ["FORLOOP$subexpression$1$string$2"]},
    {"name": "FORLOOP$string$2", "symbols": [{"literal":"i"}, {"literal":"t"}, {"literal":"e"}, {"literal":"r"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "FORLOOP", "symbols": ["FORLOOP$string$1", "_", "FORLOOP$subexpression$1", "_", "FORLOOP$string$2", "_"]},
    {"name": "COMPARATOR$string$1", "symbols": [{"literal":"l"}, {"literal":"e"}, {"literal":"s"}, {"literal":"s"}, {"literal":" "}, {"literal":"t"}, {"literal":"h"}, {"literal":"a"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "COMPARATOR", "symbols": ["COMPARATOR$string$1"]},
    {"name": "COMPARATOR$string$2", "symbols": [{"literal":"g"}, {"literal":"r"}, {"literal":"e"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}, {"literal":"r"}, {"literal":" "}, {"literal":"t"}, {"literal":"h"}, {"literal":"a"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "COMPARATOR", "symbols": ["COMPARATOR$string$2"]},
    {"name": "COMPARATOR$string$3", "symbols": [{"literal":"e"}, {"literal":"q"}, {"literal":"u"}, {"literal":"a"}, {"literal":"l"}, {"literal":" "}, {"literal":"t"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "COMPARATOR", "symbols": ["COMPARATOR$string$3"]},
    {"name": "COMPARATOR$string$4", "symbols": [{"literal":"l"}, {"literal":"e"}, {"literal":"s"}, {"literal":"s"}, {"literal":" "}, {"literal":"t"}, {"literal":"h"}, {"literal":"a"}, {"literal":"n"}, {"literal":" "}, {"literal":"o"}, {"literal":"r"}, {"literal":" "}, {"literal":"e"}, {"literal":"q"}, {"literal":"u"}, {"literal":"a"}, {"literal":"l"}, {"literal":" "}, {"literal":"t"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "COMPARATOR", "symbols": ["COMPARATOR$string$4"]},
    {"name": "COMPARATOR$string$5", "symbols": [{"literal":"g"}, {"literal":"r"}, {"literal":"e"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}, {"literal":"r"}, {"literal":" "}, {"literal":"t"}, {"literal":"h"}, {"literal":"a"}, {"literal":"n"}, {"literal":" "}, {"literal":"o"}, {"literal":"r"}, {"literal":" "}, {"literal":"e"}, {"literal":"q"}, {"literal":"u"}, {"literal":"a"}, {"literal":"l"}, {"literal":" "}, {"literal":"t"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "COMPARATOR", "symbols": ["COMPARATOR$string$5"]},
    {"name": "BOOLEAN_EXPRESSION$string$1", "symbols": [{"literal":"i"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BOOLEAN_EXPRESSION", "symbols": ["VALUE", "_", "BOOLEAN_EXPRESSION$string$1", "_", "COMPARATOR", "_", "VALUE"]},
    {"name": "BOOLEAN$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BOOLEAN", "symbols": ["BOOLEAN$string$1"]},
    {"name": "BOOLEAN$string$2", "symbols": [{"literal":"f"}, {"literal":"a"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BOOLEAN", "symbols": ["BOOLEAN$string$2"]},
    {"name": "INT$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "INT$ebnf$1", "symbols": ["INT$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "INT", "symbols": ["INT$ebnf$1"], "postprocess": function(d) {return {v:d[0].join("")}}},
    {"name": "STRING$ebnf$1$subexpression$1$string$1", "symbols": [{"literal":"t"}, {"literal":"h"}, {"literal":"e"}, {"literal":" "}, {"literal":"s"}, {"literal":"t"}, {"literal":"r"}, {"literal":"i"}, {"literal":"n"}, {"literal":"g"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "STRING$ebnf$1$subexpression$1", "symbols": ["STRING$ebnf$1$subexpression$1$string$1"]},
    {"name": "STRING$ebnf$1", "symbols": ["STRING$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "STRING$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "STRING$ebnf$2", "symbols": [/[a-zA-z]/]},
    {"name": "STRING$ebnf$2", "symbols": ["STRING$ebnf$2", /[a-zA-z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "STRING", "symbols": ["STRING$ebnf$1", "STRING$ebnf$2"]},
    {"name": "VALUE", "symbols": ["BOOLEAN"]},
    {"name": "VALUE", "symbols": ["INT"]},
    {"name": "VALUE", "symbols": ["STRING"]},
    {"name": "VALUE", "symbols": ["VARIABLE"]},
    {"name": "_", "symbols": [{"literal":" "}]},
    {"name": "TO$string$1", "symbols": [{"literal":"t"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TO", "symbols": ["TO$string$1"]}
]
  , ParserStart: "MAIN"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();

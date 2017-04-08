MAIN -> INITIALIZE | SET | RETURN | FOR | IF | WHILE

# COMMANDS
INITIALIZE -> "initialize" _ VARIABLE _ TO _ VALUE
SET -> "set" _ VARIABLE _ TO _ VALUE
RETURN -> "return" _ (VARIABLE | VALUE)
FOR -> "create" _ "a ":? FORLOOP ((INT _ "times") | ("over" _ VARIABLE))
IF -> "if" _ BOOLEAN_EXPRESSION
WHILE -> "while" _ BOOLEAN_EXPRESSION

NAME -> [a-zA-Z]:+
VARIABLE -> "variable" _ NAME
FORLOOP -> "for loop" _ ("which" | "that") _ "iterates" _
COMPARATOR -> "less than" | "greater than" | "equal to" | "less than or equal to" | "greater than or equal to"
BOOLEAN_EXPRESSION -> VALUE _ "is" _ COMPARATOR _ VALUE



BOOLEAN -> "true" | "false"
INT -> [0-9]:+        {% function(d) {return {v:d[0].join("")}} %}
STRING -> ("the string "):? [a-zA-z]:+
VALUE -> BOOLEAN | INT | STRING | VARIABLE

_ -> " "
TO -> "to"

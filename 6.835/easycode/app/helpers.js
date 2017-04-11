
// SPEECH SYNTHESIS SETUP
var voicesReady = false;
window.speechSynthesis.onvoiceschanged = function() {
  voicesReady = true;
  // Uncomment to see a list of voices
  // console.log("Choose a voice:\n" + window.speechSynthesis.getVoices().map(function(v,i) { return i + ": " + v.name; }).join("\n"));
};

var generateSpeech = function(message, callback) {
  if (voicesReady) {
    var msg = new SpeechSynthesisUtterance();
    msg.voice = window.speechSynthesis.getVoices()[VOICEINDEX];
    msg.text = message;
    msg.rate = 0.2;
    if (typeof callback !== "undefined")
      msg.onend = callback;
    speechSynthesis.speak(msg);
  }
};

// Helper function to detect if any commands appear in a string
var userSaid = function(str, commands) {
  for (var i = 0; i < commands.length; i++) {
    if (str.indexOf(commands[i]) > -1)
      return true;
  }
  return false;
};

var updateCursor = function(cursorPosition) {
  $('#cursor').css({
    'left': cursorPosition[0],
    'top': cursorPosition[1]
  })

  var x = cursorPosition[0];
  var y = cursorPosition[1];

  if (x < 0 || x > window.innerWidth || y < 0 || y > window.innerHeight) {
    return;
  }

  var pos = editor.renderer.screenToTextCoordinates(x, y);

  LINE = pos.row;

  // highlight line
  editor.session.removeMarker(MARKER);
  var Range = ace.require('ace/range').Range;
  MARKER = editor.session.addMarker(new Range(pos.row, 0, pos.row, 1), "marker", "fullLine");

  // remove highlight after period of inactivity
  clearTimeout(TIMEOUT);
  TIMEOUT = window.setTimeout(function() {
    editor.session.removeMarker(MARKER);
  }, 100);

};

var parseInput = function(string) {
  var parser = new Parser(window.grammar.ParserRules, window.grammar.ParserStart);
  parser.feed(string);
  return parser.finish();
}

var insertLine = function(string) {
  editor.insert(string);
  editor.insert('\n');
}

var insertLineToRange = function(string, row) {
  var data = editor.session.getParentFoldRangeData(row);
  var indent;
  var r;
  if (data.range) {
    r = data.range;
  } else {
    r = data.firstRange;
  }

  indent = editor.session.getLine(r.start.row).search(/\S|$/) + 4;
  editor.session.insert(r.end, '\n' + ' '.repeat(indent) + string);
  editor.moveCursorTo(r.end.row+1, Infinity)
  if (editor.session.getLine(r.end.row+2).trim().length == 0) {
    editor.session.getDocument().removeLines(r.end.row+2, r.end.row+2);
  }
  editor.insert('\n');

}
var editor;

$(function() {

  editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/python");

});
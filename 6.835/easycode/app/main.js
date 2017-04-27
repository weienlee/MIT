// MAIN GAME LOOP
// Called every time the Leap provides a new frame of data
Leap.loop({ hand: function(hand) {
  // Use the hand data to control the cursor's screen position
  var cursorPosition = hand.screenPosition().slice(0,2);

  // offset cursor positions
  cursorPosition[0] += 0;
  cursorPosition[1] += 300;

  updateCursor(cursorPosition);
}}).use('screenPosition', {scale: LEAPSCALE});

// processSpeech(transcript)
//  Is called anytime speech is recognized by the Web Speech API
// Input:
//    transcript, a string of possibly multiple words that were recognized
// Output:
//    processed, a boolean indicating whether the system reacted to the speech or not
var processSpeech = function(transcript) {
  var transcript = transcript.toLowerCase().trim();
  var parsedInput = parseInput(transcript);

  var command = parsedInput.command;

  if (parsedInput.code) {
    var code = generateCode(parseInput(transcript));

    if (parsedInput.location) {
      // put the code at the specified line
      insertLineToRange(code, LINE);
    } else {
      // just insert code normally
      insertLine(code);
    }
  } else {
    // handle modify commands

  }


  //return true;

};
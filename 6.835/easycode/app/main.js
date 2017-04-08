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
  var processed = false;
  if (userSaid(transcript, ['restart'])) {
	  gameState = new GameState({state: 'setup'});
	  cpuBoard.resetBoard();
	  playerBoard.resetBoard();
	  numSetShips = 0;
	  setupUserInterface();
  }
  else if (gameState.get('state') == 'setup') {
    // TODO: 4.3, Starting the game with speech
    // Detect the 'start' command, and start the game if it was said
    if (userSaid(transcript, ['start'])) {
	  var finished = true;
	  playerBoard.get('ships').forEach(function(ship) {
		  if (!ship.get('isDeployed')) {
		    finished = false;
		  }
	  });
	  if (finished) {
		gameState.startGame();
	  } else {
		generateSpeech("Please deploy all your ships");
	  }
    }
  }

  else if (gameState.get('state') == 'playing') {
    if (gameState.isPlayerTurn()) {
      // TODO: 4.4, Player's turn
      // Detect the 'fire' command, and register the shot if it was said
      if (userSaid(transcript, ['fire'])) {
        registerPlayerShot();

        processed = true;
      }
    }

    else if (gameState.isCpuTurn() && gameState.waitingForPlayer()) {
      // TODO: 4.5, CPU's turn
      // Detect the player's response to the CPU's shot: hit, miss, you sunk my ..., game over
      // and register the CPU's shot if it was said
      if (userSaid(transcript, HITWORDS.concat(MISSWORDS))) {
        var response = transcript;
        registerCpuShot(response);

        processed = true;
      }
    }
  }

  return processed;
};
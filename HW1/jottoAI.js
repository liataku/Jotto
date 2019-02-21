/* Define word length for Jotto. */
var word_length = 5;

/* Store player's and computer's words. */
var player_word = "";
var cpu_word = "";

/* Store player's and computer's guesses. */
var playerGuess = "";
var cpuGuess = "";

/* Declare boolean array to track how which guesses were correct. */
var correctGuesses = [ false, false, false, false, false ];

/* Constant for storing all possible letter inputs. */
const alphabet = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
				'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];

/* Dynamic array to hold characters that haven't been eliminated. */				
var possibleChars = [];

/* Control variables to determine whether the game is ready or not. */
/* Note: PLAYING and SAVING should not both be 'true' at the same time. */
var PLAYING = false;
var SAVING = false;

/* Return codes for validInput() function. */
const VALID			= -1;
const NOTSTRING		= 0;
const SHORT			= 1;
const LONG			= 2;
const HASNUM		= 3;
const NOTWORD		= 4;

/* Constants to use for displaying messages to the player. */
const NOTICES = [
					"Please only enter letters.",
					"This game uses 5-letter words - please pick a longer word.",
					"This game uses 5-letter words - please pick a shorter word.",
					"Your word must be made entirely of letters.",
					"Please enter an actual English word."
				]

function validInput(str) {
	/* Check that player's word is actually a string. */
	if (typeof player_word != "string") {
		/* Ask the player to enter letters only. */		
		return NOTSTRING;
	}
	
	/* Check that player's word is exactly 5 characters long. */
	if (player_word.length != word_length) {
		if (player_word.length < word_length) {
			/* Player's input is not long enough. */
			return SHORT;
		} else {
			/* Player's input is too long. */			
			return LONG;
		}
	}
	
	/* Check that every character is actually a letter. */
	for (c in player_word) {
		if ((c < 'a' || c > 'z') && (c < 'A' || c > 'Z')) {
			/* One of the characters is not a letter. */
			return HASNUM;
		}
	}
	
	/* Return VALID code if input passes all checks. */
	return VALID;
}

/*
 * Called after player submits a word. Should be attached to an HTML element (submit button?).
 *
 * Checks to make sure that the player's word input is valid.
 */
function start() {
	/* Only accept input if no games are in progress. */
	if (!PLAYING && !SAVING) {
		/* Retrieve player input from front end and store in player_word. */
		// TODO
		// Get input from front end
		// player_word = "";

		/* Validate player's word. */
		var code = validInput(player_word);
		if (code == VALID) {
			/* If word is valid, run setup() to start game. */
			setup();
		} else {
			/* Display notice based on error code. */
			// var notice = NOTICES[code];
		}
	}
}

/*
 * Called after validating player's word, at start of every game.
 *
 * Sets up or resets any variables needed to run Jotto.
 */
function setup() {
	/* Reset possibleChars to contain the entire alphabet. */
	possibleChars = alphabet;
	
	/* Reset boolean array for guessing the player's word. */
	correctGuesses = [ false, false, false, false, false ];
	
	/* Generate a word for the computer. */
	// TODO
	// Find some way to generate valid English words
	
	/* Update HTML page to prompt player for input. */
	// TODO
	// Change elements in HTML page
	
	/* Enable methods for taking player guesses and making guesses. */
	PLAYING = true;
}

/* 
 * Called after player makes a guess at CPU's word.
 *
 * Should be attached to an HTML element, which disappears when guess is made.
 */
function makeGuess() {
	/* Only take input if game is ready. */
	if (PLAYING && !SAVING) {
		/* Retrieve input from front end. */
		// TODO
		// Retrieve player's guess from HTML page
		
		/*Validate player's guess. */
		if (validInput(player_guess)){
			var i = 0;
			for (i = 0; i < word_length; i++) {
				
			}
		}
	}
}
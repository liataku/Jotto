/*
 * @author Benjamin Shu
 *
 * JavaScript file for controlling the Jotto game page.
 * NOTE: All of the methods here need to be attached to HTML elements.
 *
 */

/* Object used to store records of current game. */
var recordObj = {};
const record_template =
{
	"date": "",
	"player": "",
	"player_word": "",
	"cpu_word": "",
	"guesses": []
};

/* JSON blueprint for storing records of guesses in the game record.*/
var guessObj = {};
const guess_template = 
{
	"type": "",
	"guess": "",
	"correct_int": 0,
	"correct_array": []
};

/* Type codes for storing guess objects in game record. */
const GUESS_TYPE_PLAYER = "player";
const GUESS_TYPE_CPU = "cpu";

/* Define word length for Jotto. */
var word_length = 5;

/* Store player's and computer's words. */
var player_word = "";
var cpu_word = "";

/* Store player's and computer's guesses. */
var player_guess = "";
var cpu_guess = "";

/* Declare boolean array to track how which guesses were correct. */
var cpu_correct = [ false, false, false, false, false ];
var player_correct = [ false, false, false, false, false ];

/* Constant for storing all possible letter inputs. */
/*
NOTE: When the computer eliminates characters as possibilities,
they will be set to '-' in possibleChars[].
*/
const alphabet = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
				'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];

/* Dynamic array to hold characters that haven't been eliminated. */				
var possibleChars = [];

/* Control variables to determine whether the game is ready or not. */
/*
Note: PLAYING and SAVING should not both be 'true' at the same time.
*/
var PLAYING = false;
var SAVING = false;

/* Return codes for validInput() function. */
const VALID			= -1;
const NOTSTRING		= 0;
const SHORT			= 1;
const LONG			= 2;
const HASNUM		= 3;
const NOTWORD		= 4;
const REPEAT		= 5;

/* Constants to use for displaying messages to the player. */
const NOTICES = [
					"Please only enter letters.",
					"This game uses 5-letter words - please pick a longer word.",
					"This game uses 5-letter words - please pick a shorter word.",
					"Your word must be made entirely of letters.",
					"Please enter an actual English word.",
					"Please use a word without any repeating letters."
				];

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
	
	/* Check that no characters are repeated. */
	var i = 0;
	var ch;
	player_word = player_word.toLowerCase();
	for (i = 0; i < word_length; i++) {
		ch = player_word.charAt(i);
		if (player_word.indexOf(ch, i + 1) != -1) {
			/* Some character appears more than once. */
			return REPEAT;
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
		
		// player_word = player_word.toLowerCase();

		/* Validate player's word. */
		var code = validInput(player_word);
		if (code == VALID) {
			/* If word is valid, run setup() to start game. */
			setup();
		} else {
			/* Display notice based on error code. */
			// var notice = NOTICES[code];
			return;
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
	cpuCorrect = [ false, false, false, false, false ];
	playerCorrect = [ false, false, false, false, false ];
	
	/* Initialize new record object. */
	recordObj = record_template;
	
	/* Add date and time that game is starting at. */
	var date = new Date();
	recordObj.date = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
						+ "-" + date.getHours() + ":" + date.getMinutes();
	
	/* Add player's chosen word to game record. */
	recordObj.player_word = player_word;
	
	/* Add player's username to game record. */
	// TODO
	// Figure out how to send player's username to webpage.
	
	/* Generate a word for the computer. */
	// TODO
	// Find some way to generate valid English words
	
	/* Add CPU's chosen word to the game record. */
	recordObj.cpu_word = cpu_word;
	
	/* Update HTML page to prompt player for input. */
	// TODO
	// Change elements in HTML page
	
	/* Enable methods for taking player guesses and making guesses. */
	PLAYING = true;
	SAVING = false;
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
		
		/* Validate player's guess. */
		var code = validInput(player_guess);
		if (code != VALID){
			/* Inform player of error and prompt for another guess. */
			// var notice = NOTICES[code];
			
			// TODO
			// Update HTML page to display error message and take another prompt
		} else {
			/* Hide HTML elements used to take in player's guess. */
			// TODO
			// Hide HTML elements, show that player's guess is being checked
			
			/* Check characters of player's guess and mark if correct. */
			var i = 0;
			var ch, chars_correct = 0;
			for (i = 0; i < word_length; i++) {
				/* If character at i is in cpu_word, show that in player_correct[]. */
				ch = player_guess.charAt(i);
				player_correct[i] = (cpu_word.indexOf(ch) > -1);
				chars_correct++;
			}
			
			/* Create JSON object to store record of player's guess and its results. */
			guessObj = guess_template;
			guessObj.type = GUESS_TYPE_PLAYER;
			guessObj.guess = player_guess;
			guessObj.correct_int = chars_correct;
			guessObj.correct_array = player_correct;
			
			/* Add record of guess to current game record. */
			recordObj.guesses.push(guessObj);
			
			/* If player has guessed all letters correctly, check if they've won the game. */
			if (chars_correct == word_length) {
				if (player_guess === cpu_word) {
					/* Inform player that they have won the game, then save game record. */
					// TODO
					// Display notice telling player that they have won.
					
					PLAYING = false;
					SAVING = true;
					
					saveGame();
				}
			}
			
			/* Show player which of their letters were correct using player_correct[]. */
			// TODO
			// Update HTML elements to highlight correct letters

			/* Generate a guess for the computer using remaining possible characters. */
			// TODO
			// Create an English word using some set of letters
			// cpu_guess = "";
			
			/* Check CPU's guess against the player's word. */
			chars_correct = 0;
			for (i = 0; i < word_length; i++) {
				ch = cpu_guess.charAt(i);
				if (player_word.indexOf(ch) > -1) {
					/* If character is in player's word, mark it as 'true' in cpu_correct[]. */
					cpu_correct[i] = true;
					chars_correct++;
				} else {
					/* Otherwise, mark as 'false' in cpu_correct[]. */
					cpu_correct[i] = false;
					/* Mark character with '-' in possibleChars[]. */
					possibleChars[(ch - 'a')] = '-';
				}
			}
			
			/* Save CPU's guess and results in a JSON object. */
			guessObj = guess_template;
			guessObj.type = GUESS_TYPE_CPU;
			guessObj.guess = cpu_guess;
			guessObj.correct_int = chars_correct;
			guessObj.correct_array = cpu_correct;
			
			/* Add record of CPU guess into game record. */
			recordObj.guesses.push(guessObj);
			
			/* If CPU has guessed all 5 letters correctly, check if they have won the game. */
			if (chars_correct == word_length) {
				if (cpu_guess === player_word) {
					/* If CPU has successfully guessed player's word, inform player of their loss. */
					// TODO
					// Display notice in HTML page that player has lost.
					
					PLAYING = false;
					SAVING = true;
					saveGame();
				}
			}
			
			/* Show HTML elements to prompt another guess. */
		}
	}
}

/*
 * Called after either the player or the CPU wins a game of Jotto.
 *
 */
function saveGame() {
	/* Only continue if no games in progress. */
	if (SAVING && !PLAYING) {
	}
}
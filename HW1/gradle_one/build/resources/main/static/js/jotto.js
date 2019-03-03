/*
 * @author Benjamin Shu
 *
 * JavaScript file for controlling the Jotto game page.
 * NOTE: All of the methods here need to be attached to HTML elements.
 *
 */

/* Boolean switch to track if HTML 5 Local Storage is an option. */
/*var STORAGE = false;*/

/* Check if HTML 5 Local Storage is supported. */
/*
function supportsStorage() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}
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
 * NOTE: When the computer eliminates characters as possibilities,
 * they will be set to '-' in possibleChars[].
*/
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
const REPEAT		= 4;
const NOTWORD		= 5;

/* Constants to use for displaying messages to the player. */
const NOTICES = [
					"Please only enter letters.",
					"This game uses 5-letter words - please pick a longer word.",
					"This game uses 5-letter words - please pick a shorter word.",
					"Your word must be made entirely of letters.",
					"Please use a word without any repeating letters.",
					"Please enter an actual English word.",
					"Loading...",
					"Congratulations! You've lost!",
					"Congratulations! You've won!"
				];

/* HTML ID tags for game page elements. */
const OVERLAY = "overlay";
const OVERLAY_PROMPT = "overlay_prompt";
const OVERLAY_NOTICE = "overlay_notice";
const NOTICE_TEXT = "notice_text";
const PROMPT_START = "prompt_start";
const WORD_START = "word_start";
const NOTICE_START = "notice_start";

const PLAYER_LIST = "player_list";
const CPU_LIST = "cpu_list";

const GUESS = "guess";
const WORD_GUESS = "word_guess";
const NOTICE_INGAME = "notice_ingame";

/* Set up by loading dictionary of 5-letter words with no repeating letters. */
const LETTER_FILE = "words.txt"
var WORDS =[];
var WORDS_LOADED = 0;
window.onload = function() {
	var i = 0;
	for (i = 0; i < 26; i++) {
	    var ch;
        ch = alphabet[i];
        $.get("words_" + ch + ".txt", function(words) {
             words = words.split("\n");
             WORDS[words[0].charAt(0)] = words;
             WORDS_LOADED++;
             if (WORDS_LOADED == 26) {
                 doneLoading();
             }
         }, "text");
    }
}

function doneLoading() {
    document.getElementById(OVERLAY_NOTICE).style.display = "none";
	document.getElementById(WORD_START).onkeydown = function(e) {
		var code = e.key || e.which;
		if (code == 'Enter') {
			start();
		}
	}
	document.getElementById(WORD_GUESS).onkeydown = function(e) {
        var code = e.key || e.which;
        if (code == 'Enter') {
            makeGuess();
        }
    }
}

function validInput(str) {
	/* Check that player's word is actually a string. */
	if (typeof str != "string") {
		/* Ask the player to enter letters only. */
		return NOTSTRING;
	}

	/* Check that player's word is exactly 5 characters long. */
	if (str.length != word_length) {
		if (str.length < word_length) {
			/* Player's input is not long enough. */
			return SHORT;
		} else {
			/* Player's input is too long. */
			return LONG;
		}
	}

	/* Check that every character is actually a letter. */
	var i = 0;
	var ch;
	for (i = 0; i < word_length; i++) {
		ch = str.charAt(i);
		if (ch < 'a' || ch > 'z') {
			/* One of the characters is not a letter. */
			return HASNUM;
		}
	}

	/* Check that no characters are repeated. */
	var str1, str2;
	for (i = 0; i < word_length; i++) {
		str1 = str.substring(0, i);
		str2 = str.substring(i + 1);
		ch = str.charAt(i);
		if (str1.indexOf(ch) != -1 || str2.indexOf(ch) != -1) {
			/* Some character appears more than once. */
			return REPEAT;
		}
	}

	/* Check that word is actually an English word. */
	var words = WORDS[str.charAt(0)];
	for (i = 0; i < words.length; i++) {
	    if (str.trim() === words[i].trim()) {
	        /* If string matches another word in the dictionary, return VALID. */
	        return VALID;
	    }
	}

	/* Return NOTWORD code if input not found in dictionary. */
	return NOTWORD;
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
		player_word = document.getElementById(WORD_START).value;
		player_word = player_word.toLowerCase();

		/* Validate player's word. */
		var code = validInput(player_word);
		if (code == VALID) {
			/* If word is valid, run setup() to start game. */
			console.log("Calling setup()...");
			setup();
		} else {
			/* Display notice based on error code. */
			document.getElementById(NOTICE_START).innerHTML = NOTICES[code];
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
	if (!PLAYING && !SAVING) {
		/* Reset possibleChars to contain the entire alphabet. */
		possibleChars = alphabet;

		/* Reset boolean array for guessing the player's word. */
		cpuCorrect = [ false, false, false, false, false ];
		playerCorrect = [ false, false, false, false, false ];

		/* Initialize new record and guess objects. */
		recordObj = record_template;
		guessObj = guess_template;

		/* Add date and time that game is starting at. */
		var date = new Date();
		recordObj.date = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
							+ "-" + date.getHours() + ":" + date.getMinutes();

		/* Add player's chosen word to game record. */
		recordObj.player_word = player_word;

		/* Add player's username to game record. */
		// TODO
		// Figure out how to send player's username to web page.

		/* Generate a word for the computer. */
		var i = Math.floor(Math.random() * 26);
		var j = Math.floor(Math.random() * WORDS[alphabet[i]].length);
		cpu_word = WORDS[alphabet[i]][j];

		/* Add CPU's chosen word to the game record. */
		recordObj.cpu_word = cpu_word;

		/* Update HTML page to prompt player for input. */
		var overlay = document.getElementById(OVERLAY);
		overlay.style.display = "none";
		var overlay_prompt = document.getElementById(OVERLAY_PROMPT);
		overlay_prompt.style.display = "none";

		/* Enable methods for taking player guesses and making guesses. */
		PLAYING = true;
		SAVING = false;
	}
}

/*
 * Called after player makes a guess at CPU's word.
 *
 * Should be attached to an HTML element, which disappears when guess is made.
 */
function makeGuess() {
    console.log("Calling makeGuess()...");
	/* Only take input if game is ready. */
	if (PLAYING && !SAVING) {
		/* Retrieve input from front end. */
		player_guess = document.getElementById(WORD_GUESS).value;
		console.log("CPU's word: " + cpu_word);
		console.log("Player guesses: " + player_guess);
		
		/* Validate player's guess. */
		var code = validInput(player_guess);
		if (code != VALID){
			/* Inform player of error and prompt for another guess. */
			var notice = NOTICES[code];
			document.getElementById(NOTICE_INGAME).innerHTML = notice;
		} else {
			/* Hide HTML elements used to take in player's guess. */
			document.getElementById(WORD_GUESS).style.display = "none";
			document.getElementById(NOTICE_INGAME).style.display = "none";
			document.getElementById(NOTICE_INGAME).innerHTML = "";
			
			/* Check characters of player's guess and mark if correct. */
			var i = 0;
			var ch, chars_correct = 0;
			for (i = 0; i < word_length; i++) {
				/* If character at i is in cpu_word, show that in player_correct[]. */
				ch = player_guess.charAt(i);
				player_correct[i] = (cpu_word.indexOf(ch) > -1);
				if (player_correct[i]) { chars_correct++; }
			}
			console.log(player_correct);
			console.log("chars_correct: " + chars_correct);
			
			/* Create JSON object to store record of player's guess and its results. */
			guessObj = guess_template;
			guessObj.type = GUESS_TYPE_PLAYER;
			guessObj.guess = player_guess;
			guessObj.correct_int = chars_correct;
			guessObj.correct_array = player_correct;

			console.log(guessObj);
			
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

			/* Add player's guess to the list of previous guesses. */
			var str_guess = "<p>", i = 0;
			for (i = 0; i < player_correct.length; i++) {
			    if (player_correct[i]) {
			        str_guess += "<mark style=\"background-color:#55a866\">" + player_guess.charAt(i) + "</mark>";
			    } else {
			        str_guess += "<mark style=\"background-color:#a85555\">" + player_guess.charAt(i) + "</mark>";
			    }
			}
			str_guess += " " + chars_correct + "/5</p>";
			document.getElementById(PLAYER_LIST).innerHTML += str_guess;

			/* Generate a guess for the computer using remaining possible characters. */
			ch = possibleChars[Math.floor(Math.random() * possibleChars.length)];
			var words = WORDS[ch];
			cpu_guess = words[Math.floor(Math.random() * words.length)].trim();

			console.log("Player's word: " + player_word);
            console.log(words);
            console.log("CPU guess: " + cpu_guess);

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
					/* Remove incorrect element from possibleChars[]. */
					var j = 0;
					for (j = 0; j < possibleChars.length; j++) {
					    if (possibleChars[j] == ch) {
					        possibleChars.splice(j, 1);
					        break;
					    }
					}
				}
			}
			console.log(cpu_correct);
			console.log("chars_correct: " + chars_correct);
			console.log(possibleChars);
			
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
            str_guess = "<p>";
            for (i = 0; i < cpu_correct.length; i++) {
                if (cpu_correct[i]) {
                    str_guess += "<mark style=\"background-color:#55a866\">" + cpu_guess.charAt(i) + "</mark>";
                } else {
                    str_guess += "<mark style=\"background-color:#a85555\">" + cpu_guess.charAt(i) + "</mark>";
                }
            }
            str_guess += " " + chars_correct + "/5</p>";

			/* Add CPU's guess to their list of previous guesses. */
			document.getElementById(CPU_LIST).innerHTML += str_guess;
			
			/* Show HTML elements to prompt another guess. */
			document.getElementById(WORD_GUESS).style.display = "";
			document.getElementById(NOTICE_INGAME).style.display = "";
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
		/* Make call to MongoDB database to save records of current game. */
		// TODO
		// Communicate with MongoDB to save records
		
		/* When done, tell the program that saving is complete. */
		// NOTE: This should only be done in a callback when DB query is finished.
		SAVING = false;
	}
}
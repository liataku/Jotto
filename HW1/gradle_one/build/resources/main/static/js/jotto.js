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
				];

const START_GAME = "To begin the game, enter a 5-letter word.";
const NOTICE_WIN = "Congratulations! You've won!";
const NOTICE_LOSS = "Congratulations! You've lost!";

/* HTML ID tags for game page elements. */
const USER = "user";

const OVERLAY = "overlay";
const OVERLAY_PROMPT = "overlay_prompt";
const OVERLAY_NOTICE = "overlay_notice";
const OVERLAY_QUIT = "overlay_quit";
const NOTICE_QUIT = "notice_quit";
const NOTICE_TEXT = "notice_text";
const PROMPT_START = "prompt_start";
const WORD_START = "word_start";
const NOTICE_START = "notice_start";

const PLAYER_LIST = "player_list";
const CPU_LIST = "cpu_list";

const GUESS = "guess";
const WORD_GUESS = "word_guess";
const NOTICE_INGAME = "notice_ingame";

const SHOW_STATS_BUTTON = "show_stats_button";
const EXIT_STATS_BUTTON = "exit_stats_button";
const OVERLAY_STATS = "overlay_stats";
const STATS_USER = "stats_user";
const STATS_TABLE = "stats_table";

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
    document.getElementById(SHOW_STATS_BUTTON).onclick = showStats;
    document.getElementById(EXIT_STATS_BUTTON).onclick = exitStats;

    console.log(document.getElementById(USER).innerHTML);
}

function showStats() {
    var rows = getAllGames(function (rows) {
        document.getElementById(STATS_TABLE).innerHTML += rows;
        document.getElementById(OVERLAY_STATS).style.display = "";
    });
}

function exitStats() {
    document.getElementById(OVERLAY_STATS).style.display = "none";
    document.getElementById(STATS_TABLE).innerHTML = "";
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
 * Called if player chooses to play another game.
 *
 * Resets all game display elements to prepare for a new game of Jotto.
 */
function restart() {
    if (!SAVING) {
        /* Reset game display. */
        document.getElementById(PLAYER_LIST).innerHTML = "";
        document.getElementById(CPU_LIST).innerHTML = "";

        /* Display opening overlay again to prompt the player for another word. */
        document.getElementById(OVERLAY).style.display = "block";
        document.getElementById(OVERLAY_PROMPT).style.display = "block";
        document.getElementById(PROMPT_START).innerHTML = START_GAME;
        document.getElementById(WORD_START).style.display = "";
        document.getElementById(NOTICE_START).style.display = "";
        document.getElementById(NOTICE_START).innerHTML = "";

        /* Hide game over overlay. */
        document.getElementById(OVERLAY_QUIT).style.display = "none";
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
			document.getElementById(WORD_GUESS).value = "";
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
			    var won = true;
			    for (i = 0; i < word_length; i++) {
			        if (player_guess.charAt(i) != cpu_word.charAt(i)) {
			            won = false;
			        }
			    }
				if (won) {
				    console.log("Player's guess is correct!");
					PLAYING = false;
					SAVING = true;
					saveGame(true);
					return;
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
            var words, word;
            ch = possibleChars[Math.floor(Math.random() * possibleChars.length)];
            words = WORDS[ch];
            word = words[Math.floor(Math.random() * words.length)];
			cpu_guess = word;

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
				var lost = true;
				for (i = 0; i < word_length; i++) {
				    if (cpu_guess.charAt(i) != player_word.charAt(i)) {
				        lost = false;
				    }
				}
				if (lost) {
				    console.log("CPU's guess is correct!");
					PLAYING = false;
					SAVING = true;
					saveGame(false);
					return;
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
function saveGame(player) {
	/* Only continue if no games in progress. */
	if (SAVING && !PLAYING) {
	    console.log("Calling saveGame()...");
		/* Make call to MongoDB database to save records of current game. */
		// TODO
		// Communicate with MongoDB to save records
		
		/* When done, tell the program that saving is complete. */
		// NOTE: This should only be done in a callback when DB query is finished.
		SAVING = false;

		if (player) {
            /* Inform player that they have won the game, then save game record. */
            document.getElementById(NOTICE_QUIT).innerHTML = NOTICE_WIN;
		} else {
            /* If CPU has successfully guessed player's word, inform player of their loss. */
            document.getElementById(NOTICE_QUIT).innerHTML = NOTICE_LOSS;
		}
        document.getElementById(OVERLAY_QUIT).style.display = "block";
        document.getElementById(NOTICE_QUIT).style.display = "block";
	}
}

// Returns a list of all a users guesses
function getAllUsersGuesses(id)
{
    $.get("http://localhost:8080/users/AllUserGuesses/" + id, function(data){
        console.log(data);
    })
}

function getAllGuesses()
{
    $.get("http://localhost:8080/users/AllGuesses", function(data){
        console.log(data);
    })
}

function getUserByUsername(username){

    $.get("http://localhost:8080/users/Users/" + username, function(data){
        console.log(data);
    })
}


function getUserById(id){

    $.get("http://localhost:8080/users/GetUser/" + id, function(data){
        console.log(data);
    })
}

//Gets all of a users games
function getAllUserGames(id){

    $.get("http://localhost:8080/users/AllUserGames/" + id, function(data){
        console.log(data);
    })
}

function getAllGames(callback){
    $.get("http://localhost:8080/users/AllGames", function(data){
        console.log(data);
        var i = 0, j = 0, k = 0, p_guesses = "", c_guesses = "", rows = "", entry, guesses;
        for (i = 0; i < data.length; i++) {
            entry = data[i];
            if (entry != null) {
                rows += "<tr style=\"min-height:100px;\">";
                rows += "<td><div class=\"username\">" + entry.playerName + "</div></td>";
                rows += "<td><div class=\"past_player_word\">" + entry.player_Word + "</div></td>";
                rows += "<td><div class=\"past_CPU_word\">" + entry.cpu_Word + "</div></td>";
                p_guesses = "";
                c_guesses = "";
                guesses = entry.guesses;
                for (j = 0; j < guesses.length; j++) {
                    if (guesses[j].type == "player") {
                        p_guesses += "<p>";
                        for (k = 0; k < 5; k++) {
                            if (guesses[j].correct_Array[k] == "true") {
                                p_guesses += "<mark style=\"background-color:#55a866\">" + guesses[j].guess.charAt(k) + "</mark>";
                            } else if (guesses[j].correct_Array[k] == "false") {
                                p_guesses += "<mark style=\"background-color:#a85555\">" + guesses[j].guess.charAt(k) + "</mark>";
                            }
                        }
                        p_guesses += "</p>";
                    } else if (guesses[j].type == "cpu") {
                        c_guesses += "<p>";
                        for (k = 0; k < 5; k++) {
                            if (guesses[j].correct_Array[k] == "true") {
                                c_guesses += "<mark style=\"background-color:#55a866\">" + guesses[j].guess.charAt(k) + "</mark>";
                            } else if (guesses[j].correct_Array[k] == "false") {
                                c_guesses += "<mark style=\"background-color:#a85555\">" + guesses[j].guess.charAt(k) + "</mark>";
                            }
                        }
                        c_guesses += "</p>";
                    }
                }
                rows += "<td><div class=\"pastGames\"><div class=\"past_player_guesses\">"
                    + p_guesses
                    + "</div></div></td>";
                rows += "<td><div class=\"pastGames\"><div class=\"past_CPU_guesses\">"
                    + c_guesses
                    + "</div></div></td>";
                rows += "</tr>";
            }
        }
        console.log(rows);
        callback(rows);
    })
}


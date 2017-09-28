<!-- //hide script from old browsers

var charName = " ";
var charNameArray = [];
var charNameHidden = [];
var guessArray = [];
var puzzleDisplay = " ";
var guessDisplay = " ";
var ltrGuessed = " ";
var guessCount = 10;
var winCount = 0;
var lossCount = 0;

function charNameToArray(charName) { //take the character name and convert to an array
	charNameArray = Array.from(charName);
	alert("character name array: " + charNameArray);
};

function createHiddenNameArray(charNameArray) { //take the character name array and create a new array of underscores the same length
	for (var i = 0; i < charNameArray.length; i++) {
		charNameHidden.push("_");
	}
};

function displayHiddenNameArray() { //display the array with guessed letters revealed

	var placeholders = charNameHidden.join(" ");
	return placeholders;

};


function createGuessArray(ltrGuessed) { //feed guesses into this array, do not take in duplicate guesses

	if (guessArray.indexOf(ltrGuessed) === -1) {
		guessArray.push(ltrGuessed);
	} 
	else {
		alert("You have already guessed the letter " + ltrGuessed);
	}
};

function displayGuessArray() { //display guesses in caps and with spacing

	var guesses = guessArray.join(" ");
	return guesses;
};

function matchSearch(ltrGuessed) { //cycle through charNameArray and find index of matching letters.  Cycle through entire array for dups

	var correctGuess = false;

	for (var i = 0; i < charNameArray.length; i++) {
		if (ltrGuessed === charNameArray[i]) {
			updateHiddenNameArray(i);
			correctGuess = true;
		}
		 
	}
	if (!correctGuess) {
		guessCount--;
	}
};

function updateHiddenNameArray(index) { //update charNameHidden to reveal that letter by index.

	charNameHidden[index] = ltrGuessed;
};
/*
function updateCounters() {

	document.getElementById("winCnt").innerHTML = winCount;
	document.getElementById("lossCnt").innerHTML = lossCount;
	document.getElementById("guessCnt").innerHTML = guessCount;

};
*/
function resetGame() { //reset all global variables

	charName = " ";
	charNameArray = [];
	charNameHidden = [];
	guessArray = [];
	puzzleDisplay = " ";
	guessDisplay = " ";
	ltrGuessed = " ";
	guessCount = 10;
	winCount = 0;
	lossCount = 0;

};

function newChar() { //randomly select a new charName from an array , or new charObject from an array
	charName = "CARTMAN";
	return charName; //or charobject
};

document.addEventListener('DOMContentLoaded', function() {
   var charName = newChar();
   charNameToArray(charName);
   createHiddenNameArray(charNameArray);
   puzzleDisplay = displayHiddenNameArray();
   document.getElementById("hangman").innerHTML = puzzleDisplay;
});

document.addEventListener('DOMContentLoaded', function() {
   document.getElementById("winCnt").innerHTML = winCount;
});

document.addEventListener('DOMContentLoaded', function() {
   document.getElementById("lossCnt").innerHTML = lossCount;
});

document.addEventListener('DOMContentLoaded', function() {
   document.getElementById("guessCnt").innerHTML = guessCount;
});

document.onkeyup = function(event) {

	var guess = event.key;
	ltrGuessed = guess.toUpperCase();

	createGuessArray(ltrGuessed);
	guessDisplay = displayGuessArray();
//	alert("User guesses: " + guessDisplay);
	document.getElementById("guesses").innerHTML = guessDisplay;
   	
   	matchSearch(ltrGuessed);

   	puzzleDisplay = displayHiddenNameArray();
   	document.getElementById("hangman").innerHTML = puzzleDisplay;



    };


//updateCounters();

// end hiding script from old browsers -->

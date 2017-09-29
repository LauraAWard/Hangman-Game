<!-- //hide script from old browsers


var charName = " ";
var charPicSrc = " ";
var charSoundSrc = " ";
var charHint = " ";
var charNameArray = [];
var charNameHidden = [];
var charObjArray = [];
var guessArray = [];
var puzzleDisplay = " ";
var guessDisplay = " ";
var ltrGuessed = " ";
var guessCount = 5;
var matchCount = 0;
var winCount = 0;
var lossCount = 0;
var correctGuess = false;


function gameChar(name, picSrc, soundSrc, hint) {
    this.chName = name;
    this.chPic = picSrc;
    this.chSound = soundSrc;
    this.chHint = hint;

	function getchName() {
       return this.chName;
    };

  	function getchPic() {
       return this.chPic;
    };

  	function getchSound() {
       return this.chSound;
    };
    
  	function getchHint() {
       return this.chHint;
    };
    
};

function createCharObjArray () {
	var char_1 = new gameChar("CARTMAN", "assets/images/cartman.gif", "assets/sounds/cartman.mp3", "Likes Cheesy Poofs");
	var char_2 = new gameChar("BUTTERS", "assets/images/butters.gif", "assets/sounds/butters.mp3", "Always Grounded"); 
	var char_3 = new gameChar("KENNY", "assets/images/kenny.gif", "assets/sounds/kenny.mp3", "Accident Prone"); 
	charObjArray.push(char_1, char_2, char_3);
	console.log(charObjArray[1]);
};

function charNameToArray(charName) { //take the character name and convert to an array
	charNameArray = Array.from(charName);
	console.log("character name array: " + charNameArray);
};

function createHiddenNameArray(charNameArray) { //take the character name array and create a new array of underscores the same length
	for (var i = 0; i < charNameArray.length; i++) {
		charNameHidden.push("_");
	}
};

function displayHiddenNameArray() { //display the array with placeholders and spacing (plus guessed letters revealed)

	puzzleDisplay = charNameHidden.join(" ");
	document.getElementById("hangman").innerHTML = puzzleDisplay;
};


function createGuessArray(ltrGuessed) { //feed guesses into this array, do not take in duplicate guesses

	if (guessArray.indexOf(ltrGuessed) === -1) {
		guessArray.push(ltrGuessed);
	} 
	else {
		// console.log("You have already guessed the letter " + ltrGuessed); // replace this with alert content in a div
		document.getElementById("msgAlerts").innerHTML = ("You have already guessed the letter " + ltrGuessed);
	}
	displayGuessArray();
};

function displayGuessArray() { //display guesses in caps and with spacing

	guessDisplay = guessArray.join(" ");
	document.getElementById("guesses").innerHTML = guessDisplay;
};

function matchSearch(ltrGuessed) { //cycle through charNameArray and find index of matching letters.  Cycle through entire array for dups

	correctGuess = false;
	
		for (var i = 0; i < charNameArray.length; i++) {
			if (ltrGuessed === charNameArray[i]) {
				updateHiddenNameArray(i);
				displayHiddenNameArray();
				correctGuess = true;

			}
		}

		scoreCalc(correctGuess);
};	
	
function scoreCalc(correctGuess) { //update score tallies, and start new round if won/lost

	if (correctGuess && guessArray.indexOf(ltrGuessed) === -1) {
		matchCount++;
		if (matchCount === charNameArray.length || charNameHidden.indexOf("_") === -1) {
			winCount++;
			// console.log("You won!"); // replace this with alert content in a div
			document.getElementById("msgAlerts").innerHTML = "You won!";
			newRound(); 
		}

	}

	else if (!correctGuess && guessArray.indexOf(ltrGuessed) === -1) {
		guessCount--;  
		if (guessCount === 0) {
			lossCount++;
			// console.log("You lost!"); // replace this with alert content in a div
			document.getElementById("msgAlerts").innerHTML = "You lost!";
			newRound(); 

		}
	}
	updateCounters();
};

function updateHiddenNameArray(index) { //update charNameHidden to reveal that letter by index, and update matchCount

	if (charNameHidden[index] === "_") {
		charNameHidden[index] = ltrGuessed;
	}
};

function updateCounters() {

	document.getElementById("winCnt").innerHTML = winCount;
	document.getElementById("lossCnt").innerHTML = lossCount;
	document.getElementById("guessCnt").innerHTML = guessCount;

};

function resetGame() { //reset all global variables

	winCount = 0; 
	lossCount = 0; 
	createCharObjArray();
	newRound(); 

};

function initVars() { //re-initialize variables

	charName = " ";
	charPicSrc = " ";
	charSoundSrc = " ";
	charHint = " ";
	charNameArray = [];
	charNameHidden = [];
	guessArray = [];
	puzzleDisplay = " ";
	guessDisplay = " ";
	ltrGuessed = " ";
	matchCount = 0;
	guessCount = 5;
	correctGuess = false;

};

function newRound() { //select new char, re-set display values (except for win/loss)

	initVars();
	newChar();
	charNameToArray(charName);
   	createHiddenNameArray(charNameArray);
	displayHiddenNameArray();
    displayGuessArray();

    updateCounters();

    // if (winCount > 0 || lossCount > 0) {
	// document.getElementById("msgAlerts").innerHTML = "A new round is starting...";
	// }
};

function newChar() { //randomly select a new charName from an array , or new charObject from an array

	var charIndex = (Math.floor(Math.random() * charObjArray.length));
	console.log(charIndex);
	var charObj = charObjArray[charIndex];
	console.log(charObj);
	charName = charObj.chName;
/*	charName = charObj.getchName();
	charPicSrc = charObj.getchPic();
	charSoundSrc = charObj.getchSound();
	charHint = charObj.getchHint();*/
	charHint = charObj.chHint;
	console.log(charName);

	// charName = "CARTMAN";

	return charName; //or charobject
};



document.addEventListener("DOMContentLoaded", function() {

   	resetGame();

});

window.onload = function(){

document.getElementById("btnReset").addEventListener("click", function() {
	resetGame();

});

document.getElementById("btnHint").addEventListener("click", function() {
	document.getElementById("msgAlerts").innerHTML = charHint;

});



document.onkeyup = function(event) {

	var guess = event.key;
	ltrGuessed = guess.toUpperCase();
	
	document.getElementById("msgAlerts").innerHTML = " ";

   	matchSearch(ltrGuessed);

	createGuessArray(ltrGuessed);
	
    };

 }; 

// end hiding script from old browsers -->

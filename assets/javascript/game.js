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
	var char_1 = new gameChar("CARTMAN", "assets/images/Eric-cartman.png", "assets/sounds/respect_x.wav", "Likes Cheesy Poofs");
	var char_2 = new gameChar("BUTTERS", "assets/images/ButtersStotch.png", "assets/sounds/Butters.mp4", "Always Grounded"); 
	var char_3 = new gameChar("KENNY", "assets/images/KennyMcCormick.png", "assets/sounds/Kenny.mp4", "Accident Prone"); 
	var char_4 = new gameChar("KYLE", "assets/images/Kyle-broflovski.png", "assets/sounds/holy_crap.wav", "Brother is Canadian"); 
	var char_5 = new gameChar("MRHANKEY", "assets/images/Mr._Hankey_transparent.png", "assets/sounds/Hankey.mp4", "Spirit of Christmas"); 
	var char_6 = new gameChar("TWEEK", "assets/images/Tweek_pic.png", "assets/sounds/Tweak.mp4", "Fond of Coffee"); 
	var char_7 = new gameChar("STAN", "assets/images/Stan-marsh-0.png", "assets/sounds/Stan.mp4", "Dating Wendy"); 
	charObjArray.push(char_1, char_2, char_3, char_4, char_5, char_6, char_7);

};

function charNameToArray(charName) { //take the character name and convert to an array
	charNameArray = Array.from(charName);
	// console.log("character name array: " + charNameArray);
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
			document.getElementById("msgAlerts").innerHTML = "You won! Click the button to advance to the next round.";
			revealPhoto(charPicSrc);
			playSound(charSoundSrc);
			// newRound(); // change so user has to click to get new round, otherwise photo reveal gets hidden again by reset
		}

	}

	else if (!correctGuess && guessArray.indexOf(ltrGuessed) === -1) {
		guessCount--;  
		if (guessCount === 0) {
			lossCount++;
			// console.log("You lost!"); // replace this with alert content in a div
			document.getElementById("msgAlerts").innerHTML = "You lost!  Click the button to try again in the next round.";
		//	newRound(); // change so user has to click to get new round

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

function hidePhoto() {

	document.getElementById("imgSPC").src = "assets/images/abstract-q-c-400-400-2.jpg";
};

function revealPhoto(picSrc) {

	document.getElementById("imgSPC").src = picSrc;
};

function playSound(sndSrc) {
	var audio = new Audio(sndSrc);
	audio.play();
};

function clearAlerts() {

    document.getElementById("msgHint").innerHTML = " ";
    document.getElementById("msgAlerts").innerHTML = " ";

};


function newRound() { //select new char, re-set display values (except for win/loss)

	initVars();
	hidePhoto();
	newChar();
	charNameToArray(charName);
   	createHiddenNameArray(charNameArray);
	displayHiddenNameArray();
    displayGuessArray();
    clearAlerts();
    updateCounters();

};

function newChar() { //randomly select a new charName from an array , or new charObject from an array

	var charIndex = (Math.floor(Math.random() * charObjArray.length));
	var charObj = charObjArray[charIndex];
	charName = charObj.chName;
	charSoundSrc = charObj.chSound;
	charPicSrc = charObj.chPic;
	charHint = charObj.chHint;
/*	charName = charObj.getchName();
	charPicSrc = charObj.getchPic();
	charSoundSrc = charObj.getchSound();
	charHint = charObj.getchHint();*/

};



document.addEventListener("DOMContentLoaded", function() {

   	resetGame();

});

window.onload = function(){

document.getElementById("btnReset").addEventListener("click", function() {
	resetGame();

});

document.getElementById("btnRound").addEventListener("click", function() {
	newRound();

});

document.getElementById("btnHint").addEventListener("click", function() {
	document.getElementById("msgHint").innerHTML = charHint;

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

// Object info for our games along with some equations
var game = {
	type: "",
	turn: 47,
	river: 46,
	outsfield: "",
	round: "",	
	percent: function() {
		if (this.round == "turn") {
			return (this.outsfield/this.turn * 100).toFixed(2);
		}
		else if(this.round == "river") {
			return (this.outsfield/this.river * 100).toFixed(2); 
		}
		else if(this.round == "turnriver") {
			return ((1 - (((this.turn - this.outsfield)/this.turn) * ((this.river - this.outsfield)/this.river))) * 100).toFixed(2);
		}
		else {
			return "";
		}
	},
	odds: function() {
		if (this.round == "turn" || this.round == "river" || this.round == "turnriver") {
			return ((100 / this.percent()) -1).toFixed(2);
		}
		else {
			return "";
		}
	}
};

// Constructor
function Game(type, turn, river) {
	this.type = type;
	this.turn = turn;
	this.river = river;
	Game.objects.push(this);
};

/*
http://stackoverflow.com/questions/2602800/how-to-get-all-objects-of-a-given-type-in-javascript
Game.objects.push(this.type) and Game.objects = [] are set up to store all created objects in an array so I can loop over them
*/
Game.objects = []; 

// Prototype Call to use with Constructor function
Game.prototype = game;

// Grab the values from our fields so we can use them late on
function fetchFields() {
	Game.prototype.outsfield = Number(document.getElementsByTagName('input')[0].value);
	Game.prototype.round = document.getElementById('round').options[document.getElementById('round').selectedIndex].value;

	printOuts();	
}

// Reset all
function resetFields() {
	document.getElementsByTagName('input')[0].value = "";
	document.getElementById('round').selectedIndex = 0;

	document.getElementById('oddsagainst_output').innerHTML = "";
	document.getElementById('outs_output').innerHTML = "";
}

// Create our games
var holdem = new Game("Texas Holdem", 47, 46);
var pineapple = new Game("Pineapple", 46, 45);
var omaha = new Game("Omaha", 45, 44);

// Print out our values to the screen
function printOuts() {
	var oddsText, outsText;
	if(game.round.length !== 0 && game.outsfield.length !== 0) {
		oddsText = "<p><strong>Odds Against</strong></p>";
		outsText = "<p><strong>Outs in Percent</strong></p>";
		document.getElementById('empty').innerHTML = '';
		for(var i =0; i < Game.objects.length; i++) {
			oddsText += "<p>" + Game.objects[i].type + ": " + Game.objects[i].odds() + " to 1</p>";
			outsText += "<p>" + Game.objects[i].type + ": " + Game.objects[i].percent() + "%</p>";
		}
	}
	else {
		oddsText = "";
		outsText = "";
		document.getElementById('empty').innerHTML = 'Please select an option';
	}
	document.getElementById('oddsagainst_output').innerHTML = oddsText;
	document.getElementById('outs_output').innerHTML = outsText;
}

// Load our onchange and onlick handlers
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('round').onchange = fetchFields;
	document.getElementsByTagName('input')[0].onchange = fetchFields;
	document.getElementById('submit').onclick = fetchFields;
	document.getElementById('reset').onclick = resetFields;
	
	resetFields()
}, false);

let g_APP = {};

// Each player should have properties:
//      letters : array of chars
//      name    : player name
//      points  : curr number of points
//      bid     : bid on curr round
g_APP.players = []

g_APP.numPlayers = -1;
g_APP.roundNum = -1;
g_APP.gameNum = -1;

g_APP.currLetter;

// Players should be array of players with name and
// hidden letters properties initialized.
function tournamentStartHandler() {
	console.log("Tournament start handler called.");
}

function gameStartHandler(gameNum) {
	g_APP.gameNum++;

	console.log("Game start handler called. Game \
		" + g_APP.gameNum + " is starting.");
}

function roundStartHandler(letter) {
	g_APP.roundNum++;
	g_APP.currLetter = letter;

	console.log("Round start handler called. Round \
		" + g_APP.roundNum + " is starting.");
}

function bidHandler(player, bidAmt) {
	console.log("Bid handler called.");
	g_APP.players.forEach(function (p) {
		if (p.name === player) {
			p.bid = bidAmt;
		}
	});
}

function hiddenLettersHandler(player, letterString) {
	g_APP.players.forEach(function (p) {
		if (p.name === player) {
			p.letters = letterString.split("");
		}
	});
}

function wordSubmissionHandler(player, word, points) {
	g_APP.players.forEach(function (p) {
		if (p.name === player) {
			p.letters = letterString.split("");
			p.points += points;
		}
	});
}

function userFinalScoreHandler(user, score) {
	console.log("User final score handler called.");

	g_APP.players.forEach(function (p) {
		if (p.name === player) {
			p.letters = letterString.split("");
			p.points += points;
		}
	});
}

function roundEndHandler(player, winningVal, amtPaid) {
	console.log("Round end handler called.");

	g_APP.players.forEach(function (p) {
		if (p.name === player) {
			p.points -= amtPaid;
			p.letters.push(currLetter);
		}
	});
}

function gameEndHandler() {
	console.log("Game end handler called.");
}

function tournamentEndHandler() {
	console.log("Tournament end handler called.");
}
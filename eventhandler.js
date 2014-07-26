var g_APP = {};

// Each player should have properties:
//      letters : array of chars
//      name    : player name
//      points  : curr number of points
//      bid     : bid on curr round
//      number  : player number
//		finalScore : duh
g_APP.players = [];

g_APP.roundNum = 0;
g_APP.gameNum = 0;

g_APP.currLetter;

// Players should be array of players with name and
// hidden letters properties initialized.
function tournamentStartHandler() {
	console.log("Tournament start handler called.");
}

function gameStartHandler(gameNum) {
	g_APP.gameNum = gameNum;

	$("#gameStatus").text("Game Number " + g_APP.gameNum);
	g_APP.roundNum = -1;

	console.log("Game start handler called. Game \
		" + g_APP.gameNum + " is starting.");
}

function roundStartHandler(letter) {
	g_APP.roundNum++;
	g_APP.currLetter = letter;

	$("#roundStatus").text("Round " + g_APP.roundNum);
    $("#letterOnAuction").text("Tile on Auction " + g_APP.currLetter);

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
	if (g_APP.players.length < 5) {
		g_APP.players.push({letters: letterString.split(""), name: player,
						points: 100, bid: 0, number: g_APP.players.length + 1});
		$("#player_" + (g_APP.players.length) + "_name").text(player);
		refreshLetters();
	}
	else {
		g_APP.players.forEach(function (p) {
			if (p.name === player) {
				p.letters = letterString.split("");
				refreshLetters();
			}
		});
	}
}



function wordSubmissionHandler(player, word, points) {
	g_APP.players.forEach(function (p) {
		if (p.name === player) {
			p.word = word;
			p.points += points;
		}
	});

	console.log(player + " submitted word " + word + " for " + points + " points.");
}

function userFinalScoreHandler(player, score) {
	console.log("User final score handler called.");

	g_APP.players.forEach(function (p) {
		if (p.name === player) {
			p.finalScore = score;
		}
	});
}

function roundEndHandler(player, winningVal, amtPaid) {
	console.log("Round end handler called.");

	g_APP.players.forEach(function (p) {
		if (p.name === player) {
			p.points -= amtPaid;
			p.letters.push(g_APP.currLetter);
			refreshLetters();
		}
	});
}

function gameEndHandler() {
	console.log("Game end handler called.");
	g_APP.players.forEach(function (p) {
		p.letters = [];
	});
}

function tournamentEndHandler() {
	console.log("Tournament end handler called.");
    var highestScore = 0;
    var playerWithHighestScore = -1;
    g_APP.players.forEach(function (p) {
        if(p.totalScore >= highestScore) {
            console.log("Player score: " + p.totalScore);
            highestScore = p.totalScore;
            playerWithHighestScore = p.number;
        }
    });
    console.log("Player with highest score: " + playerWithHighestScore);
    $("#player_" + (playerWithHighestScore)).addClass('animated tada');
}

function refreshLetters () {
	g_APP.players.forEach(function (p) {
		$("#player_" + (p.number) + "_letters").text(p.letters);
	});
}
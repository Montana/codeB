var g_APP = {};

// Each player should have properties:
//      letters : array of chars
//      name    : player name
//      points  : curr number of points
//      bid     : bid on curr round
//      number  : player number
//		totalScore : duh
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
	$("#gameStatus").text("Game Number " + (parseInt(g_APP.gameNum) +1));
	g_APP.roundNum = -1;

	console.log("Game start handler called. Game \
		" + g_APP.gameNum + " is starting.");
}

function roundStartHandler(letter) {
	g_APP.roundNum++;
	g_APP.currLetter = letter;

	$("#roundStatus").text("Round " + (g_APP.roundNum + 1));
    $("#curr_letter").text("Auctioning Letter " + g_APP.currLetter);

	console.log("Round start handler called. Round \
		" + g_APP.roundNum + " is starting.");
}

function bidHandler(player, bidAmt) {
	console.log("Bid handler called.");

	htmlText = $("#currAuction").html();

	$("#currAuction").text(htmlText + "\n");

	g_APP.players.forEach(function (p) {
		if (p.name === player) {
			p.bid = bidAmt;
			$("#player_" + (p.number) + "_bid").text(player + ": " + bidAmt);
		}
	});

	updateMaxBidder();
}

function hiddenLettersHandler(player, letterString) {
	if (g_APP.players.length < 5) {
		g_APP.players.push({letters: letterString.split(""), name: player,
						points: 100, bid: 0, number: g_APP.players.length + 1,
						totalScore: 100});
		$("#player_" + (g_APP.players.length) + "_name").text(player);
		$("#player_" + (g_APP.players.length) + "_bid").text(player + ": 0");

		refreshLetters();
		refreshPoints();


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
			p.points = parseInt(p.points) + parseInt(points);
			p.totalScore = parseInt(p.totalScore) + parseInt(points);
			refreshPoints();
		}
	});

	console.log(player + " submitted word " + word + " for " + points + " points.");
}

function userFinalScoreHandler(player, score) {
	console.log("User final score handler called.");

	g_APP.players.forEach(function (p) {
		if (p.name === player) {
			p.totalScore = score;
			refreshPoints();
		}
	});
}

function roundEndHandler(player, winningVal, amtPaid) {
	console.log("Round end handler called. Winner is " + player + " who paid " + amtPaid);

	g_APP.players.forEach(function (p) {
		if (p.name === player) {
			p.points = Math.max(0, parseInt(p.points) - amtPaid);
			p.totalScore = Math.max(0, parseInt(p.totalScore) - amtPaid);
			p.letters.push(g_APP.currLetter);
			refreshLetters();
			refreshPoints();
		}
	});
}

function gameEndHandler() {
	console.log("Game end handler called.");
	g_APP.players.forEach(function (p) {
		p.letters = [];
		p.points = 100;
		refreshPoints();
	});
}

function tournamentEndHandler() {
	console.log("Tournament end handler called.");
    }

function refreshLetters () {
	g_APP.players.forEach(function (p) {
		$("#player_" + (p.number) + "_letters").text(p.letters);
	});
}

function refreshPoints () {
	g_APP.players.forEach(function (p) {
		$("#player_" + (p.number) + "_gamepoints.points").text("Points this game: " + p.points);
		$("#player_" + (p.number) + "_totalpoints.points").text("Total points: " + p.totalScore);
	});	
}

function updateMaxBidder() {
	var maxBid = -1;
	var maxBidPlayer;
	var tiedFlag = false;

	g_APP.players.forEach(function (p) {

		if (p.bid > maxBid) {
			maxBidPlayer = p;
			maxBid = p.bid;
		}	
		else if (p.bid === maxBid) {
			tiedFlag = true;
			p.bidStatus = "tied";
			maxBidPlayer.bidStatus = "tied;"
		}
		});

	if (!tiedFlag) maxBidPlayer.bidStatus = "highest";
}
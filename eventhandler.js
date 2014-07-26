function bidHandler(player, bidValue) {
	console.log("Bid handler called.");
}

function roundStartHandler(letter) {
	console.log("Round start handler called.");
}

function gameStartHandler(gameNum) {
	console.log("Game start handler called.");
}

function tournamentStartHandler() {
	console.log("Tournament start handler called.");
}

function roundEndHandler(player, winningVal, amtPaid) {
	console.log("Round end handler called.");
}

function gameEndHandler(gameNum, args) {
	console.log("Game end handler called.");
}

function tournamentEndHandler() {
	console.log("Tournament end handler called.");
}
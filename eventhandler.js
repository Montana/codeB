function bidHandler(player, bidValue) {
	debug("Bid handler called.");
}

function roundStartHandler(letter) {
	debug("Round start handler called.");
}

function gameStartHandler(gameNum) {
	debug("Game start handler called.");
}

function tournamentStartHandler() {
	debug("Tournament start handler called.");
}

function roundEndHandler(player, winningVal, amtPaid) {
	debug("Round end handler called.");
}

function gameEndHandler(gameNum, args) {
	debug("Game end handler called.");
}

function tournamentEndHandler() {
	debug("Tournament end handler called.");
}
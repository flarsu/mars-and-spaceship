function initial()
{
	document.getElementById("bSide").innerHTML = '<img src="./robot.png" style="height:80%;position:absolute">';
}
function setWally(){
	console.log('hi');
	let level = document.getElementById("level").value;
	if(level == 'easy' || level == 'difficult')
		{document.getElementById("bSide").innerHTML = '<img src="./robot.png" style="height:80%;position:absolute">';
		var button = document.getElementById("hint");
		button.style.display = 'block';
		document.getElementById('name').innerHTML = "Jade";
		document.getElementById('bnt-restart').style.display = 'block';	
	}
	else{
		document.getElementById("bSide").innerHTML = '<img src="./playerB.svg" style="height:80%;position:absolute">';
		var button = document.getElementById("hint");
		button.style.display = 'none';
		document.getElementById('name').innerHTML = "PlayerB";
		document.getElementById('bnt-restart').value = 'Restart';
	}	
}


var board = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

var HUMAN = -1;
var AI = +1;

function maxDepth(board)
{	let level = document.getElementById('level').value;

	if(level == 'easy')
	  return 3;
	else if(level== 'difficult') 
		return emptyCells(board).length; 
}

function emptyCells(state) {
	var cells = [];
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
			if (state[x][y] == 0)
				cells.push([x, y]);
		}
	}

	return cells;
}

function validMove(x, y) {
	// var empties = emptyCells(board);
	try {
		if (board[x][y] == 0) {
			return true;
		}
		else {
			return false;
		}
	} catch (e) {
		return false;
	}
}

function setMove(x, y, player) {
	if (validMove(x, y)) {
		board[x][y] = player;
		return true;
	}
	else {
		return false;
	}
}


function evalute(state) {
	var score = 0;

	if (Over(state, AI)) {
		score = +1;
	}
	else if (Over(state, HUMAN)) {
		score = -1;
	} else {
		score = 0;
	}

	return score;
}
function Over(state, player) {
	var win = [
		[state[0][0], state[0][1], state[0][2]],
		[state[1][0], state[1][1], state[1][2]],
		[state[2][0], state[2][1], state[2][2]],
		[state[0][0], state[1][0], state[2][0]],
		[state[0][1], state[1][1], state[2][1]],
		[state[0][2], state[1][2], state[2][2]],
		[state[0][0], state[1][1], state[2][2]],
		[state[2][0], state[1][1], state[0][2]],
	];

	for (var i = 0; i < 8; i++) {
		var line = win[i];
		var filled = 0;
		for (var j = 0; j < 3; j++) {
			if (line[j] == player)
				filled++;
		}
		if (filled == 3)
			return true;
	}
	return false;
}


function allOver(state) {
	return Over(state, HUMAN) || Over(state, AI);
}
function shuffle(list){
	list.sort(()=>Math.random()-0.5);
	return list;
}
function bestMove(state, depth, player, alpha, beta) {
	var best;

	if (player == AI) {
		best = [-1, -1, -1000];
	}
	else {
		best = [-1, -1, +1000];
	}

	if (depth ==emptyCells(board).length-maxDepth(board) || allOver(state)) {
		var score = evalute(state);
		if (score == 1)
			return [-1,-1,score+depth]
		else if(score == -1)
			return [-1, -1, score-depth]

		return [-1, -1, score];
	}

	shuffle(emptyCells(state)).forEach(function (cell) {
		var x = cell[0];
		var y = cell[1];
		state[x][y] = player;
		var score = bestMove(state, depth - 1, -player, alpha, beta);
		state[x][y] = 0;
		score[0] = x;
		score[1] = y;

		if (player == AI) {
			if (score[2] > best[2])
				best = score;
			alpha = Math.max(best[2], alpha )
			if(beta<=alpha)
				return best;
		}
		else {
			if (score[2] < best[2])
				best = score;
			beta = Math.min(best[2],beta)
			if(beta<=alpha)
				return best;	
		}
	});

	return best;
}

function aiMove() {
	var x, y;
	var move;
	var cell;

	if (emptyCells(board).length == 9) {
		x = parseInt(Math.random() * 3);
		y = parseInt(Math.random() * 3);
	}
	else {
		move = bestMove(board, emptyCells(board).length, AI);
		x = move[0];
		y = move[1];
	}

	if (setMove(x, y, AI)) {
		cell = document.getElementById(String(x) + String(y));
		cell.innerHTML = "O";
	}
}

function clicked(cell) {
	var button = document.getElementById("bnt-restart");
	button.disabled = true;
	var conditionToContinue = allOver(board) == false && emptyCells(board).length > 0;

	if (conditionToContinue == true) {
		var x = cell.id.split("")[0];
		var y = cell.id.split("")[1];
		var move = setMove(x, y, HUMAN);
		if (move == true) {
			cell.innerHTML = "X";
			if (conditionToContinue)
				aiMove();
		}
	}
	if (Over(board, AI)) {
		var lines;
		var cell;

		if (board[0][0] == 1 && board[0][1] == 1 && board[0][2] == 1)
			lines = [[0, 0], [0, 1], [0, 2]];
		else if (board[1][0] == 1 && board[1][1] == 1 && board[1][2] == 1)
			lines = [[1, 0], [1, 1], [1, 2]];
		else if (board[2][0] == 1 && board[2][1] == 1 && board[2][2] == 1)
			lines = [[2, 0], [2, 1], [2, 2]];
		else if (board[0][0] == 1 && board[1][0] == 1 && board[2][0] == 1)
			lines = [[0, 0], [1, 0], [2, 0]];
		else if (board[0][1] == 1 && board[1][1] == 1 && board[2][1] == 1)
			lines = [[0, 1], [1, 1], [2, 1]];
		else if (board[0][2] == 1 && board[1][2] == 1 && board[2][2] == 1)
			lines = [[0, 2], [1, 2], [2, 2]];
		else if (board[0][0] == 1 && board[1][1] == 1 && board[2][2] == 1)
			lines = [[0, 0], [1, 1], [2, 2]];
		else if (board[2][0] == 1 && board[1][1] == 1 && board[0][2] == 1)
			lines = [[2, 0], [1, 1], [0, 2]];

		for (var i = 0; i < lines.length; i++) {
			cell = document.getElementById(String(lines[i][0]) + String(lines[i][1]));
			cell.style.color = "red";
		}
        swal("Jade Wins", "Try Again", "error");
    }
	if (emptyCells(board).length == 0 && !allOver(board)) {
		swal("Draw","","success");
		}
	if (allOver(board) == true || emptyCells(board).length == 0) {
		button.value = "Restart";
		button.disabled = false;
	}
}

function restartBtn(button) {
	if (button.value == "Jade-First") {
		aiMove();
		button.disabled = true;
	
	}
	else if (button.value == "Restart") {
		var htmlBoard;

		for (var x = 0; x < 3; x++) {
			for (var y = 0; y < 3; y++) {
				board[x][y] = 0;
				htmlBoard = document.getElementById(String(x) + String(y));
				htmlBoard.style.color = "#444";
				htmlBoard.innerHTML = "";
			}
		}
		let level = document.getElementById("level").value;
		if(level== 'easy'|| level=='difficult')
				button.value = "Jade-First";
		
	}
}
let hints =3;
function Hint(button){
	hints = hints-1;
	button.value= hints+"Hints";
	if(hints==0)
		button.disabled = true;

	var x, y;
	var move;

	if (emptyCells(board).length == 9) {
		x = parseInt(Math.random() * 3);
		y = parseInt(Math.random() * 3);
	}
	else {
		move = bestMove(board, emptyCells(board).length, HUMAN);
		x = move[0];
		y = move[1];
	}
	document.getElementById(String(x)+String(y)).style.background = ' #259990 ';
	setTimeout(() => {
		document.getElementById(String(x)+String(y)).style.background = '#14bdac';
	}, 3000);
}	

function MultiPlayer(cell){
	let level = document.getElementById('level').value;
	if(level == '2Player')
	{	var button = document.getElementById("bnt-restart");
		button.disabled = true;
		clickedMulti(cell);
	}else(
		clicked(cell)
	)
}

let playerA = 1;
let playerB = -1;
let chanceA = true;
let chanceB = false;

function clickedMulti(cell){
	var button = document.getElementById("bnt-restart");
	button.disabled = true;
	var conditionToContinue = allOver(board) == false && emptyCells(board).length > 0;

	if (conditionToContinue == true) {
		var x = cell.id.split("")[0];
		var y = cell.id.split("")[1];
		if(chanceA)
		{
			var move = setMove(x, y, playerA);
			if (move == true) {
				cell.innerHTML = "X";
				if (conditionToContinue)
					chanceB=true;
					chanceA=false;
			}
		}else{
			var move = setMove(x, y, playerB);
			if (move == true) {
				cell.innerHTML = "O";
				if (conditionToContinue)
					chanceB=false;
					chanceA=true;
			}
		}
		
	}
	if (Over(board, playerA)) {
		var lines;
		var cell;

		if (board[0][0] == 1 && board[0][1] == 1 && board[0][2] == 1)
			lines = [[0, 0], [0, 1], [0, 2]];
		else if (board[1][0] == 1 && board[1][1] == 1 && board[1][2] == 1)
			lines = [[1, 0], [1, 1], [1, 2]];
		else if (board[2][0] == 1 && board[2][1] == 1 && board[2][2] == 1)
			lines = [[2, 0], [2, 1], [2, 2]];
		else if (board[0][0] == 1 && board[1][0] == 1 && board[2][0] == 1)
			lines = [[0, 0], [1, 0], [2, 0]];
		else if (board[0][1] == 1 && board[1][1] == 1 && board[2][1] == 1)
			lines = [[0, 1], [1, 1], [2, 1]];
		else if (board[0][2] == 1 && board[1][2] == 1 && board[2][2] == 1)
			lines = [[0, 2], [1, 2], [2, 2]];
		else if (board[0][0] == 1 && board[1][1] == 1 && board[2][2] == 1)
			lines = [[0, 0], [1, 1], [2, 2]];
		else if (board[2][0] == 1 && board[1][1] == 1 && board[0][2] == 1)
			lines = [[2, 0], [1, 1], [0, 2]];

		for (var i = 0; i < lines.length; i++) {
			cell = document.getElementById(String(lines[i][0]) + String(lines[i][1]));
			cell.style.color = "green";
		}
        swal("PlayerA Wins", "", "success");
	}
	if(Over(board,playerB)){
		var lines;
		var cell;

		if (board[0][0] == -1 && board[0][1] == -1 && board[0][2] == -1)
			lines = [[0, 0], [0, 1], [0, 2]];
		else if (board[1][0] == -1 && board[1][1] == -1 && board[1][2] == -1)
			lines = [[1, 0], [1, 1], [1, 2]];
		else if (board[2][0] == -1 && board[2][1] == -1 && board[2][2] == -1)
			lines = [[2, 0], [2, 1], [2, 2]];
		else if (board[0][0] == -1 && board[1][0] == -1 && board[2][0] == -1)
			lines = [[0, 0], [1, 0], [2, 0]];
		else if (board[0][1] == -1 && board[1][1] == -1 && board[2][1] == -1)
			lines = [[0, 1], [1, 1], [2, 1]];
		else if (board[0][2] == -1 && board[1][2] == -1 && board[2][2] == -1)
			lines = [[0, 2], [1, 2], [2, 2]];
		else if (board[0][0] == -1 && board[1][1] == -1 && board[2][2] == -1)
			lines = [[0, 0], [1, 1], [2, 2]];
		else if (board[2][0] == -1 && board[1][1] == -1 && board[0][2] == -1)
			lines = [[2, 0], [1, 1], [0, 2]];

		for (var i = 0; i < lines.length; i++) {
			cell = document.getElementById(String(lines[i][0]) + String(lines[i][1]));
			cell.style.color = "red";
		}
		swal("PlayerB Wins", "", "success");
		}
	if (emptyCells(board).length == 0 && !allOver(board)) {
		swal("Draw", "","success")
	}
	if (allOver(board) == true || emptyCells(board).length == 0) {
		button.value = "Restart";
		button.disabled = false;
	}

}
var board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

var AI = 10;
var Human = -10;


function emptyCells(state){
    var emptyCells = [];
    for (var x=0; x<3;x++){
        for(var y=0;y<3;y++){
            if (state[x][y]==0)
                cells.push([x,y])
        }
    }
    return emptyCells;
}

function validMove(x, y){
    var emptyCells = emptyCells(board);
    try{
        if (board[x][y]==0){
            return true;
        }
        else{
            return false;
        }
    }catch (e){
        return false;
    }
}

function setMove(x, y, player){
    if(validMove(x, y)){
        board[x][y]= player;
        return true;
    }
    else{
        return false;
    }   
}

function evaluate(state){
    var score = 0;

    if (Over(state, AI)){
        score = +10;
    }
    else if (Over(state, Human)){
        score = -10;
    }
    else{
        score = 0;
    }

    return score;
}

function Over(state, player){
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

    for(var i=0;i<8;i++){
        var line = win[i];
        var filled = 0;
        for(var j=0;j<3;j++){
            if(line[j]==player)
                filled++;
        }
        if(filled==3)
            return true;
    }
    return false;
}

function allOver(state){
    return Over(state,Human)|| Over(state,AI);
}

function click(cell){
    var button = document.getElementById("btn-restart");
    button.disabled = true;
    var Continue = allOver(board)==false && emptyCells(board).length>0;

    if(Continue == true){
        var x = cell.id.split("")[0];
        var y = cell.id.split("")[1];
        var move = setMove(x, y, Human);
        if(move==true){
            cell.innerHTML ='HU';
            if(Continue)
                aiMove();
        }
    }
    if(Over(board, AI)){
        var lines; var cell;


	if (board[0][0] == 10 && board[0][1] == 10 && board[0][2] == 10)
        lines = [[0, 0], [0, 1], [0, 2]];
    else if (board[1][0] == 10 && board[1][1] == 10 && board[1][2] == 10)
        lines = [[1, 0], [1, 1], [1, 2]];
    else if (board[2][0] == 10 && board[2][1] == 10 && board[2][2] == 10)
        lines = [[2, 0], [2, 1], [2, 2]];
    else if (board[0][0] == 10 && board[1][0] == 10 && board[2][0] == 10)
        lines = [[0, 0], [1, 0], [2, 0]];
    else if (board[0][1] == 10 && board[1][1] == 10 && board[2][1] == 10)
        lines = [[0, 1], [1, 1], [2, 1]];
    else if (board[0][2] == 10 && board[1][2] == 10 && board[2][2] == 10)
        lines = [[0, 2], [1, 2], [2, 2]];
    else if (board[0][0] == 10 && board[1][1] == 10 && board[2][2] == 10)
        lines = [[0, 0], [1, 1], [2, 2]];
    else if (board[2][0] == 10 && board[1][1] == 10 && board[0][2] == 10)
        lines = [[2, 0], [1, 1], [0, 2]];
    
    	for (var i = 0; i < lines.length; i++) {
			cell = document.getElementById(String(lines[i][0]) + String(lines[i][1]));
			cell.style.color = "blue";
		}
        window.alert("You lose");
    
    }
    if(emptyCells(board).length == 0 && !allOver(board)){
        window.alert("DRAW")
    }
    if(allOver(board)==true || emptyCells(board).length==0){
        button.value = 'Restart';
        button.disabled = false;
    }




}
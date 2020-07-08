let board = [
    ['_','_','_'],
    ['_','_','_'],
    ['_','_','_']
];

let Human = 'x';
let AI = 'o';
let maxDepth = document.getElementById('maxDepth');

function emptyCells(board)
{   let cells = [];
    for(let i=0;i<3;i++)
    {
        for(let j=0;j<3;j++)
        {
            if(board[i][j]=='_')
                cells.push([i, j]);
        }
    }
    return cells;
}

function validMove(i, j)
{
    try{
        if(board[i][j]=='_')
            return true;

        else
            return false;    
    }
    catch(e){
        return false;
    }
}

function isGameOver(board)
{
        empties = emptyCells(board);
        if(empties.length()==0)
                    return true;
        if(evaluate(board)==10 || evaluate(board)==-10)
                return true;
}

function evaluate()
{
    for(let i=0;i<3;i++)
    {
        if(board[i][0]==board[i][1] && board[i][1]==board[i][2])
        {
            if(board[i][0]== Human)
                return 10;
            else if (board[i][0]==AI) 
                return -10;   
        }
    }

    for(let i=0;i<3;i++)
    {
        if(board[0][i]==board[1][i] && board[1][i]==board[2][i])
        {
            if(board[0][i]== Human)
                return 10;
            else if (board[0][i]==AI) 
                return -10;   
        }
    }

    if(board[1][1]==board[0][0] && board[0][0]==board[2][2])
    {
        if(board[0][0]==Human)
            return 10;
        else if(board[0][0]==AI)
            return -10;    
    }
    if(board[0][2]==board[1][1] && board[1][1]==board[2][0])
    {
        if(board[0][2]==Human)
            return 10;
        else if(board[0][2]==AI)
            return -10;    
    }

    return 0;
}

function minimax(board, depth, isMax, maxDepth)
{
    if(depth==maxDepth || isGameOver(board))
    {
        if(evaluate(board) == Human)
            return 10 - depth;
        else if(evaluate(board)==-10)
            return -10+depth;
        
        return 0;    
    }
}

function clicked(cell)
{

}

function bestMoveAI(board)
{

}
function bestMoveHuman(board)
{

}

function aiMove()
{

}

function level()
{

}

function restartButton()
{
    
}
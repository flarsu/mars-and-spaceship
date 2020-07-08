var board = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
];
let maxDepth = 9;
var Human = 'X';
var AI = 'o';

function isMovesLeft(board){
        for(let i=0;i<3;i++)
            for(let i=0;i<3;i++)
                    if(board==0)
                        return true;
        return false;                
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

function minimax(board, depth, isMax)
{
    let score = evaluate(board);

    if(score == 10)
        return score;
    
    if(score==-10)
        return score;
        
    if(isMovesLeft(board)==flase)
        return 0;
       
    if (isMax)
    {
        let best = -1000;

        for(let i=0;i<3;i++)
        {
            for(let j=0;j<3;j++)
            {
                if(board[i][j]==0)
                {
                    board[i][j] = Human;
                }
            }
        }
    }    
        
}

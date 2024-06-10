let a=[[0,0,0],[0,0,0],[0,0,0]];  //COPY OF GRID IN THIS FILE

//CHECK IF MOVES LEFT
function isMovesLeft(arr) 
{
    for(let i=0;i<3;i++) 
    {
        for(let j=0;j<3;j++) 
        {
            if(arr[i][j]===0)return true;
        }
    }
    return false;
}

let colorgrid=function(){
    //ROW CHECK
    for(let i=0;i<3;i++)
    {
        if(a[i][0]==a[i][1] && a[i][1]==a[i][2])
        {
            if(a[i][0]!=0)
            {
                document.getElementById(`${i}0`).style.backgroundColor='yellow';
                document.getElementById(`${i}1`).style.backgroundColor='yellow';
                document.getElementById(`${i}2`).style.backgroundColor='yellow';
                document.getElementById(`${i}0`).style.color='black';
                document.getElementById(`${i}1`).style.color='black';
                document.getElementById(`${i}2`).style.color='black';
            }
            if(a[i][0]=='X')return 1;
            if(a[i][0]=='O')return -1;
            
        }
    }
    //COLUMN CHECK
    for(let i=0;i<3;i++)
    {
        if(a[0][i]==a[1][i] && a[1][i]==a[2][i])
        {
            if(a[0][i]!=0)
            {
                document.getElementById(`0${i}`).style.backgroundColor='yellow';
                document.getElementById(`1${i}`).style.backgroundColor='yellow';
                document.getElementById(`2${i}`).style.backgroundColor='yellow';
                document.getElementById(`0${i}`).style.color='black';
                document.getElementById(`1${i}`).style.color='black';
                document.getElementById(`2${i}`).style.color='black';
            }
            if(a[0][i]=='X')return 1;
            if(a[0][i]=='O')return -1;
        }
    }    
    //DIAGONAL CHECK
    if(a[0][0]==a[1][1] && a[1][1]==a[2][2] && a[0][0]!=0)
    {
        document.getElementById('00').style.backgroundColor='yellow';
        document.getElementById('11').style.backgroundColor='yellow';
        document.getElementById('22').style.backgroundColor='yellow';
        document.getElementById('00').style.color='black';
        document.getElementById('11').style.color='black';
        document.getElementById('22').style.color='black';
        if(a[0][0]=='X')return 1;
        if(a[0][0]=='O')return -1;
        
    }
    if(a[2][0]==a[1][1] && a[1][1]==a[0][2] && a[1][1]!=0)
    {
        document.getElementById('20').style.backgroundColor='yellow';
        document.getElementById('11').style.backgroundColor='yellow';
        document.getElementById('02').style.backgroundColor='yellow';
        document.getElementById('20').style.color='black';
        document.getElementById('11').style.color='black';
        document.getElementById('02').style.color='black';
        if(a[2][0]=='X')return 1;
        if(a[2][0]=='O')return -1;
    }
    return 0;
}



//FUNCTION TO CHECK IF DRAW/ PLAYER1 WIN /PLAYER2 WIN
let checker=function(){
    //ROW CHECK
    for(let i=0;i<3;i++)
    {
        if(a[i][0]==a[i][1] && a[i][1]==a[i][2])
        {
            if(a[i][0]=='X')return 10;
            if(a[i][0]=='O')return -10;
        }
    }
    //COLUMN CHECK
    for(let i=0;i<3;i++)
    {
        if(a[0][i]==a[1][i] && a[1][i]==a[2][i])
        {
            if(a[0][i]=='X')return 10;
            if(a[0][i]=='O')return -10;
        }
    }    
    //DIAGONAL CHECK
    if(a[0][0]==a[1][1] && a[1][1]==a[2][2])
    {
        if(a[0][0]=='X')return 10;
        if(a[0][0]=='O')return -10;
    }
    if(a[2][0]==a[1][1] && a[1][1]==a[0][2])
    {
        if(a[2][0]=='X')return 10;
        if(a[2][0]=='O')return -10;
    }
    return 0;
}

// MINIMAX FUNCTION MINI=PLAYER MAX->AI
function minimax(arr,depth,isMax)
{
    let score=checker(arr);
    if(score==10)return score-depth;
    if(score==-10)return score+depth;
    if(!isMovesLeft(arr))return 0;
    if(isMax) 
    {
        let best=-Infinity;
        for(let i=0;i<3;i++) 
        {
            for(let j=0;j<3;j++) 
            {
                if(arr[i][j]==0) 
                {
                    arr[i][j]='X';
                    best=Math.max(best,minimax(arr,depth+1,!isMax));
                    arr[i][j]=0;
                }
            }
        }
        return best;
    } 
    else 
    {
        let best=Infinity;
        for(let i=0;i<3;i++) 
        {
            for(let j=0;j<3;j++) 
            {
                if(arr[i][j]==0) 
                {
                    arr[i][j]='O';
                    best=Math.min(best,minimax(arr,depth+1,!isMax));
                    arr[i][j]=0;
                }
            }
        }
        return best;
    }
}

// FIND THE BEST MOVE FOR AI
function findBestMove(arr) 
{
    let bestVal=-Infinity;
    let bestMove=[-1,-1];
    for(let i=0;i<3;i++) 
    {
        for(let j=0;j<3;j++) 
        {
            if(arr[i][j]===0) 
            {
                arr[i][j]='X';
                let moveVal=minimax(arr,0,false);
                arr[i][j]=0;
                if(moveVal>bestVal) 
                {
                    bestMove[0]=i;
                    bestMove[1]=j;
                    bestVal=moveVal;
                }
            }
        }
    }
    return bestMove;
}
let move1=document.querySelector('#move1');
let player1=document.querySelector('#p1');
let resultaudio=new Audio('/AUDIO/result.wav');
let player1audio=new Audio('/AUDIO/playertap.mp3');
let player2audio=new Audio('/AUDIO/aitap.wav');
let erroraudio=new Audio('/AUDIO/erroraudio.mp3');
let buttonaudio=new Audio('/AUDIO/button.wav');
let audioarray=[resultaudio,player1audio,player2audio,erroraudio,buttonaudio];

let evalresult=function()
{
    if(checker(a)==-10) 
    {
        //PLAYER WIN
        player1.style.backgroundColor='green';
        move1.textContent="YOU ARE WINNER";
        move1.style.backgroundColor='green';
        return true; 
    } 
    else if(checker(a)==10) 
    {
        //AI WIN
        player1.style.backgroundColor='red';
        move1.style.backgroundColor='red';
        move1.textContent="YOU LOST";
        return true;
    } 
    else if(isMovesLeft(a)==false)
    {
        //DRAW
        player1.style.backgroundColor='grey';
        move1.style.backgroundColor='grey';
        move1.textContent="DRAW";
        return true;
    }
    return false;
}

let canclick=1;
// MAKE AI MOVE
function makeAIMove() 
{
    setTimeout(function() 
    {
        player2audio.play();
        move1.textContent="YOUR MOVE";
        move1.style.backgroundColor='gold';
        let bestMove=findBestMove(a);
        let i=bestMove[0];
        let j=bestMove[1];
        a[i][j]='X';
        let str=i.toString()+j.toString();
        document.getElementById(str).appendChild(document.createTextNode("X"));
        let bb=evalresult();
        if(bb==true)
        {
            colorgrid();
            resultaudio.play();
            return;
        }
        canclick=1;
    }, 1200);
    
}


// HANDLE CLICK EVENT FOR PLAYER MOVE
function handleClick(event) 
{
    if(canclick==0)
    {
        erroraudio.play();
        return;
    }
    let target=event.target;
    if (target.textContent=="") 
    {
        canclick=0;
        player1audio.play();
        let id=target.id;
        let i=Number(id[0]);
        let j=Number(id[1]);
        a[i][j]='O';
        target.appendChild(document.createTextNode("O"));
        let bb=evalresult();
        if(bb==true)
        {
            colorgrid();
            resultaudio.play();
            return;
        }
        move1.style.backgroundColor='black';
        move1.textContent="";
        turn=1;
        makeAIMove();
    }
    else
    {
        erroraudio.play();
    }
}

// ADD CLICK EVENT LISTENER TO ALL GRID ITEMS
document.querySelectorAll('.grid-item').forEach(item=>{
    item.addEventListener('click',handleClick);
});

//ADD AUDIO TO BUTTONS
document.querySelectorAll('a').forEach(function(x){
    x.addEventListener('click',function(){
        buttonaudio.play();
    });
});

let volume=true;
let voloptions=document.querySelector('#volumeoptions')
voloptions.addEventListener('click',function(){
    if(volume==false)
    {
        //TURN on volume
        volume=true;
        voloptions.innerHTML='<i class="fa-solid fa-volume-high fa-beat"></i>';
        audioarray.forEach(function(x){
            x.volume=1.0;
        });
    }
    else
    {
        //TURN off volume
        volume=false;
        voloptions.innerHTML='<i class="fa-solid fa-volume-xmark fa-beat"></i>';
        audioarray.forEach(function(x){
            x.volume=0.0;
        });
    }
});
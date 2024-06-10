let p1 = 1;                      //TURN if p1==1 player 1 turn else player 2 turn
let a=[[0,0,0],[0,0,0],[0,0,0]]; //COPY OF GRID IN THIS FILE

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

//FUNCTION TO CHECK IF DRAW/ PLAYER1 WIN /PLAYER2 WIN
let checker=function(){
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

let move1=document.querySelector('#move1');
let move2=document.querySelector('#move2');
let player1=document.querySelector('#p1');
let player2=document.querySelector('#p2');
let resultaudio=new Audio('/AUDIO/result.wav');
let player1audio=new Audio('/AUDIO/playertap.mp3');
let player2audio=new Audio('/AUDIO/aitap.wav');
let erroraudio=new Audio('/AUDIO/erroraudio.mp3');
let buttonaudio=new Audio('/AUDIO/button.wav');
let audioarray=[resultaudio,player1audio,player2audio,erroraudio,buttonaudio];


let evalresult=function(){
    if(checker()==1)
    {
        //PLAYER 1 WIN
        player1.style.backgroundColor = 'green';
        player2.style.backgroundColor = 'red';
        move1.textContent="YOU ARE WINNER";
        move1.style.backgroundColor='green';
        move2.style.backgroundColor='red';
        move2.textContent="YOU LOST";
        return true;
    }
    else if(checker()==-1)
    {   
        //PLAYER 2 WIN
        player1.style.backgroundColor = 'red';
        player2.style.backgroundColor = 'green';
        move2.textContent="YOU ARE WINNER";
        move2.style.backgroundColor='green';
        move1.style.backgroundColor='red';
        move1.textContent="YOU LOST";
        return true;
    }
    else if(isMovesLeft(a)===false)
    {
        //DRAW
        player1.style.backgroundColor = 'grey';
        player2.style.backgroundColor = 'grey';
        move2.textContent="DRAW";
        move2.style.backgroundColor='grey';
        move1.style.backgroundColor='grey';
        move1.textContent="DRAW";
        return true;
    }    
    return false;
}

let bb=false;
function handleClick(event) 
{
    if(bb===false)
    {
        let target = event.target;
        let id = target.id;
        let i=Number(id[0]);
        let j=Number(id[1]);
        if (target.textContent === "") 
        {
            if (p1 == 1) 
            {
                player1audio.play();
                p1 = 0;
                a[i][j]='X';
                target.appendChild(document.createTextNode("X"));
            } 
            else 
            {
                player2audio.play();
                p1 = 1;
                a[i][j]='O';
                target.appendChild(document.createTextNode("O"));
            }
        
            
            if(p1==1)
            {
                move1.textContent="YOUR MOVE";
                move1.style.backgroundColor='gold';
                move2.style.backgroundColor='black';
                move2.textContent="";
            }
            else
            {
                move2.textContent="YOUR MOVE";
                move2.style.backgroundColor='gold';
                move1.style.backgroundColor='black';
                move1.textContent="";
            }    
            bb=evalresult();
            if(bb==true)
            {
                resultaudio.play();
                return;
            }
        }
        else
        {
            erroraudio.play();
        }
    }
}

// Add event listeners to all grid items
document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('click', handleClick);
});

document.querySelector('#RESTART').addEventListener('click',function(){
    buttonaudio.play();
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

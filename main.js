'use strict';

// Selecting elements
const player0El = document.querySelector('#player--0');
const player1El = document.querySelector('#player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');


const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');                                   //hide the dice

let currentScore = 0;      
let activePlayer = 0; 
const scores = [0, 0];  
let playing = true;                           

btnRoll.addEventListener('click',function(){
   if(playing){
        diceEl.classList.remove('hidden');                            //display the dice

        const dice = Math.trunc(Math.random() * 6) + 1;               //random dice roll

        diceEl.src = `dice-${dice}.png`;

        if (dice === 1){
        //switch the player
        document.querySelector(`#current--${activePlayer}`).textContent = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        currentScore = 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
        }
        else{
        //add dice number to current score
        currentScore = currentScore + dice;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        }
    }
});

btnHold.addEventListener('click',function(){
    if(playing){
        scores[activePlayer] = scores[activePlayer] + currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        if(scores[activePlayer] >= 30){
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else{
            document.querySelector(`#current--${activePlayer}`).textContent = 0;
            activePlayer = activePlayer === 0 ? 1 : 0;
            currentScore = 0;
            player0El.classList.toggle('player--active');
            player1El.classList.toggle('player--active');       
        }  
    } 
});

btnNew.addEventListener('click',function(){
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    currentScore = 0;
    scores[0] = 0;
    scores[1] = 0;
    document.querySelector('#score--0').textContent = scores[activePlayer];
    document.querySelector('#score--1').textContent = scores[activePlayer];
    playing = true;
});
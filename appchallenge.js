/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousRoll;
init();

//addeventlistener is a callback function. this is a function that calls another function
//anonymous function that does not have a name so it can't be reused. it only existing with the call function
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        //1. Random Number
        var dice = Math.floor(Math.random() * 6) +1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        
        //3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            //add score of dice together log to Variable
            roundScore += dice;
            previousRoll = dice;
            //update the score box with result
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            console.log(previousRoll);
        } else if (dice = 6 && previousRoll = 6) {

        } else {
            nextPlayer();
        }
    }


});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
            //1. add CURRENT score to GLOBAL score. activePlayer = 1 || 0 thus accessing array location 
            scores[activePlayer] += roundScore;

            //2. update the UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            //3.Check if player won the game
            if (scores[activePlayer] >= 100) {
                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                document.querySelector('.dice').style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                gamePlaying = false;
            } else {
                nextPlayer();
            }
}
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //reset Variable to 0
    roundScore = 0;

    //reset score box to zero
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
};

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    //This turns off the dice image at the starting position prior to rolling
    document.querySelector('.dice').style.display = 'none';
    //Set text for scores to zero
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //reset names
    document.querySelector('#name-1').textContent = 'player 2';
    document.querySelector('#name-0').textContent = 'player 1';
    //removes classes styling active and winner
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    //set player one to active styling
    document.querySelector('.player-0-panel').classList.add('active');

};

function reset() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    //Set text for scores to zero
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
};

//textContent only allows string manipulation not html
//SETTER function sets a value
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'

//GETTER function gets a value
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

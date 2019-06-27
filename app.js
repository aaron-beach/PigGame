/*
challenge
1. A player loses their entire score when he rolls two 6s in a row. After that, 
it's the next player's turn. (Always save the previous dice roll in a separate variable)  

2. add an input field to the html where players cab set the winning score, so 
that they can change the predefined score of 100. (hint you can read that value 
    with the .value property in Javascript. This is a good oportunity to use 
    google to figure this out)

3. Add another dice to the gamePlaying, so that there are two dice now. 
The player loses his current score when one of them is a 1. (hint: you 
    will need CSS to position the second dice, so take a look at the 
    CSS code for the first dice.)
*/

var scores, roundScore, activePlayer, gamePlaying;
init();
var lastDice;
//addeventlistener is a callback function. this is a function that calls another function
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        //1. Random Number
        var dice = Math.floor(Math.random() * 6) +1;
        console.log(dice);
        var dice2 = Math.floor(Math.random() * 6) +1;
        console.log(dice2);
        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        //second dice
        var dice2Dom = document.querySelector('.dice2');
        dice2Dom.style.display = 'block';
        dice2Dom.src = 'dice-' + dice2 + '.png';

        if(dice === 6 && dice2 === 6 && lastDice === 12) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        } else if (dice !== 1 && dice2 !== 1) {
            //add score of dice together log to Variable
            roundScore += (dice + dice2);
            //update the score box with result
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
            nextPlayer();
            } 

            lastDice = dice + dice2;
            
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
            //1. add CURRENT score to GLOBAL score. activePlayer = 1 || 0 thus accessing array location 
            scores[activePlayer] += roundScore;

            //2. update the UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            //3.Check if player won the game
            if (scores[activePlayer] >= document.querySelector('#total').value) {
                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                document.querySelector('.dice').style.display = 'none';
                document.querySelector('.dice2').style.display = 'none';
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
    document.querySelector('.dice2').style.display = 'none';
};

function init() {

    gamePlaying = true;
    //This turns off the dice image at the starting position prior to rolling
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    reset();
    scores = [0,0];
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
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
};


/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

// make a variable array that has both Players' scores
scores = [0, 0];

// make a variable for each round score
roundScore = 0;

// make a varibale that stores the active player
activePlayer = 0;


// select the dice value in the html using the id
//document.querySelector('#current-' + activePlayer).textContent = dice;
//
// Hide dice
document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

//select the roll dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
    // 1. random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice +  '.png';
    
        
    // 3. Update the round score IF the rolled number was NOT 1
    if (dice !== 1) {
        //Add Score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        //Next Player
        activePlayer === 0 ? activePlayer = 1 : avtivePlayer = 0;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        
        
        document.querySelector('.dice').style.display = 'none';
//        document.querySelector('.player-0-panel').classList.remove('active');
//        document.querySelector('.player-1-panel').classList.add('active');
//        
    }
    
});


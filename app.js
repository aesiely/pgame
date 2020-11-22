/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


// variables
var scores, roundScore, activePlayer, gamePlaying;

// start and initialize the game by calling the init func
//resets scores and UI 
init();

// Add an event listener on the ROLL DICE button with a 'click event type
// Once clicked, then roll the dice 
// use an anonymous function instead of a callback function since we don't need this function to be called anywhere else 
document.querySelector('.btn-roll').addEventListener('click', function() {
    // while the game is still on then game playing is true
    if (gamePlaying) {
    
    // 1. random number
    
    // randomize the number for the dice rolling
    // Math.random gives random number between 0 and 1
    // we multiply by 6 to get a random number between 1 and 6
    // since this function gives us a decimal result
    // we use Math.floor to truncate the decimal and get an integer as a result
    var dice = Math.floor(Math.random() * 6) + 1;
    
    // 2. Display the resultant Dice
    
    // Create variable that works as a selector
    var diceDOM = document.querySelector('.dice');
    // Display the dice as a block
    diceDOM.style.display = 'block';
    
    // Set the right Dice Image with the correct number corresponding to the dice randomized number
    diceDOM.src = 'dice-' + dice + '.png';
    
    
    // 3. Update the round score only IF the rolled number is NOT one
    if (dice !== 1) {
        // accumulate the Round score
        roundScore += dice;
        // Display the updated score
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else {
        // Next Player
        nextPlayer();
    }
    }
}); 


document.querySelector('.btn-hold').addEventListener('click', function() {
    
        // while the game is still on then game playing is true
        if (gamePlaying) {
            
        // accumulate the global score for activeplayer
        scores[activePlayer] += roundScore;
        
        // display the score in the UI for active player
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]; 
        
        // Check if player won
        if (scores[activePlayer] >= 100) {
            // change the name of the player to Winner
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            
            // Hide the dice
            document.querySelector('.dice').style.display = 'none';
            
            // add the winner class from CSS to the winning player
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            
            // Remove active class from the UI
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            
            // set the gameplaying to false when there's a winner
            gamePlaying = false;
            
        } 
        // If no winner yet
        else {
        // Next Player
        nextPlayer();         
        }
        }   
});


// function to take care of next player operation
function nextPlayer() {
        // Create variable that works as a selector
        var diceDOM = document.querySelector('.dice');
    
        //Next Player
        // ternary operator
        // if active player is 0 then switch to 1 and vice versa
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

        //reset the roundScore for the next player
        roundScore = 0;
                
        // reset roundScore to 0 for the previous player in interface
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        // Hide the dice when the player gets a 1
        diceDOM.style.display = 'none';
        
        // Switch the active player on the interface to the current player playing
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    }


// New game button functionality calls init function when clicked
document.querySelector('.btn-new').addEventListener('click', init);

// Things to do at the begining of a new game
function init() {
    // Set state variable to true
    gamePlaying = true;
    
    // Global scores for each player will be stored in an array starting at 0
    scores = [0,0]

    // roundScore for each player will be stored in one variable as it will be reset each round
    // so no need to create two. It will also start at 0
    roundScore = 0;

    // activePlayer will tell us which player has turn player 0 or player 1
    activePlayer = 0;

    // At the begining of the Game!
    // 1. Change the css of the dice image to hide it when we first start the game
    // we use the '.' selector when working with class
    // and '#' when working with id
    document.querySelector('.dice').style.display = 'none';

    // 2. Set global scores and round scores to 0 at the start of the game
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Reset player names to player1 and player2 on the start of a game
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    // Set the active player to player 1 at the start of the game
    // By first removing the active class so we don't have duplicates
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    // Remove the winner class from players
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
}



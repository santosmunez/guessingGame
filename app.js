/*
 GAME FUNCTION:
  - player must guess a number between a min and max
  - player gets a certain amount of guess
  - notify player of guesses remaining
  - notify the player of the correct answer if loose
  - let player choose to play again
*/ 

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message'); 

// assign minNum and maxNum
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener

game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload()
    }
})

// listen for guess
guessBtn.addEventListener('click', function() {
    // validate
    let guess = parseInt(guessInput.value)

    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please Enter the number between ${min} and ${max}`,'red');
        
    }

   // check if won
   if(guess === winningNum) {
    
    gameOver(true,`${winningNum} is Correct , You win!`,);

  
   } else {
     
     // wrong number
     guessesLeft -= 1;
     if(guessesLeft === 0 ) {

         gameOver(false,`Game Over, the correct number was ${winningNum}`,)
         
     } else {
         // wrong guesses - game continues
         
         // make border red
         guessInput.style.borderColor = 'red'

         // clear the input
         guessInput.value = ''

         // set message
         setMessage(`${guess} is not correct number, ${guessesLeft} guesses left`, 'red')

     }
     }
   } 
)

function gameOver(won, msg) {
   let color;
   won === true ? color = 'green' : color = 'red';
  
   //  input disabled
   guessInput.disabled = true;

   // make border green
   guessInput.style.borderColor = color

   // make text color
   message.style.color = color

   // set message if it is true
     setMessage(msg)
   
   // Play again
   guessBtn.value = 'Play Again';

   guessBtn.className += 'play-again'


}

function getRandomNum(min,max) {
   return  (Math.floor(Math.random() * (max - min + 1) + min))
}

function setMessage(msg,color){
    message.style.color = color
    message.textContent = msg
}


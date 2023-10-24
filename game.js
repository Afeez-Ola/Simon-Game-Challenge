// let gamePattern = []
// let userClickedPattern = []
// let buttonColours  = ["red", "blue", "green", "yellow"]
// let level = 0;


// function nextSequence() {
//     $('#level-title').text(`Level ${level + 1}`);
//     randomNumber = Math.floor(Math.random() * 4);

//     randomChosenColour = buttonColours[randomNumber];

//     gamePattern.push(randomChosenColour);
//     if ($(`#${randomChosenColour}`)) {
//         playSound(randomChosenColour);
//         animatePress(randomChosenColour)
//     }
//     level++;
// }

// $('html').keypress(() => {
//     nextSequence();
//     $('#level-title').text(`Level ${level}`);
//     console.log(level);
// });


// function playSound(name) {
//  let audio = new Audio(`/sounds/${name}.mp3`);
//  return audio.play();
// }

// function userClick(){
//     $('.btn').click(function () {
//      let userChosenColour = $(this).attr('id');
//      userClickedPattern.push(userChosenColour);
//      playSound(userChosenColour);
//      animatePress(userChosenColour)
//      checkAnswer(userClickedPattern.length -1)
//     });
// }
// userClick();

// function animatePress(currentColour) {
//     $(`#${currentColour}`).addClass("pressed")
//     setTimeout(() => {
//         $(`#${currentColour}`).removeClass('pressed');
//     }, 100);
// }

// function checkAnswer(currentLevel) {
//     if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
//         console.log("Success")
//         if (gamePattern.length === userClickedPattern.length) {
//             setTimeout(() => {
//             nextSequence();
//             userClickedPattern = []
//             }, 1000);
//         }
//     } else{
//         console.log("Wrong")
//         gameOver()
//         startOver();
//     }
// }

// function gameOver(){
//     $('h1').text('Game Over, Press Any Key to Restart');
//     $("body").addClass("game-over")
//     setTimeout(() => {
//         $('body').removeClass('game-over');
//     }, 200);
// }

// function startOver(){
//     level =0
//     gamePattern = []
//     userClickedPattern = []
// }


// Define constants
const buttonColours = ["red", "blue", "green", "yellow"];
const MAX_LEVEL = 20; // Define a maximum level

// Initialize variables
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

// Cache DOM elements
const $levelTitle = $('#level-title');

// Function to start the game
function startGame() {
  $(document).keypress(() => {
    nextSequence();
  });
}

// Function to generate the next sequence
function nextSequence() {
  level++;
  $levelTitle.text(`Level ${level}`);
  userClickedPattern = [];

  if (level <= MAX_LEVEL) {
    const randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
  } else {
    gameOver();
    startOver();
  }
}

// Event listener for button clicks
$('.btn').click(function () {
  const userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Function to play a sound
function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

// Function to handle user click animations
function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColour}`).removeClass('pressed');
  }, 100);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    gameOver();
    startOver();
  }
}

// Function to handle game over
function gameOver() {
  $levelTitle.text('Game Over, Press Any Key to Restart');
  $('body').addClass("game-over");
  setTimeout(() => {
    $('body').removeClass('game-over');
  }, 200);
}

// Function to start the game over
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

// Start the game
startGame();

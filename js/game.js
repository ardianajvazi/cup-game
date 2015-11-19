var spotOne = document.getElementById('spotOne');
var spotTwo = document.getElementById('spotTwo');
var spotThree = document.getElementById('spotThree');
var feedback = document.getElementById('feedback');
var popup = document.getElementById('popup');
var funcArray = [animateFirstToThird, animateSecondToOne, animateSecondToThird];
var options = [];
var guessing = false;
var speed;
var speedFactor;
var classTime;
var shuffles;
var score = 0;
var highScores;

function init() {
  if (localStorage.scores){
    highScores = JSON.parse(localStorage.scores);
  } else {
    highScores = [{n:'AAA',s: 1000}, {n: 'ABB', s: 1200}, {n: 'BBB', s: 1400}, {n: 'CCC', s: 1600}, {n: 'DDD', s: 1800}];
  }
  console.log(highScores);
}

function getOptions() {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0; i<vars.length; i++) {
    var pair = vars[i].split("=");
    options[i] = pair[1]
  }
}

function parseOptions(options) {
  if (options[1] === "Slow") {
    speed = 450;
    speedFactor = 500;
  } else if (options[1] === "Medium") {
    speed = 350;
    speedFactor = 1000;
  } else {
    speed = 250;
    speedFactor = 2000;
  };
  classTime = speed - 20;
  shuffles = parseInt(options[0]);
  console.log('sp=' + speed + '; classTime=' + classTime + '; sh=' + shuffles);
  return speed, speedFactor, shuffles;
}


function animateFirstToThird(childOfSpotOne, childOfSpotThree) {
  childOfSpotThree.style.animation = 'threeToOnes ' + speed + 'ms';
  childOfSpotOne.style.animation = 'oneToThrees ' + speed + 'ms';
  setTimeout(function(){
    childOfSpotOne.style.animation = null;
    childOfSpotThree.style.animation = null;
    spotOne.children[0].appendChild(childOfSpotThree);
    spotThree.children[0].appendChild(childOfSpotOne);
  }, classTime)
}

function animateSecondToOne(childOfSpotOne, childOfSpotTwo) {
  childOfSpotTwo.style.animation = 'twoToOnes ' + speed + 'ms';
  childOfSpotOne.style.animation = 'oneToTwos ' + speed + 'ms';
  setTimeout(function(){
    childOfSpotTwo.style.animation = null;
    childOfSpotOne.style.animation = null;
    spotOne.children[0].appendChild(childOfSpotTwo);
    spotTwo.children[0].appendChild(childOfSpotOne);
  }, classTime)
}

function animateSecondToThird(childOfSpotTwo, childOfSpotThree) {
  childOfSpotTwo.style.animation = 'twoToThrees ' + speed + 'ms';
  childOfSpotThree.style.animation = 'threeToTwos ' + speed + 'ms';
  setTimeout(function(){
    childOfSpotTwo.style.animation = null;
    childOfSpotThree.style.animation = null;
    spotTwo.children[0].appendChild(childOfSpotThree);
    spotThree.children[0].appendChild(childOfSpotTwo);
  }, classTime)
}

function pickRandomShuffle() {
  var randomNumber = Math.floor(Math.random()*funcArray.length);
  if (randomNumber === 0) {
    funcArray[0](spotOne.children[0].children[0], spotThree.children[0].children[0]);
  } else if (randomNumber === 1) {
    funcArray[1](spotOne.children[0].children[0], spotTwo.children[0].children[0]);
  } else if (randomNumber === 2) {
    funcArray[2](spotTwo.children[0].children[0], spotThree.children[0].children[0]);
  }
}

function shuffle (s, i) {
   setTimeout(function () {
      console.log(i);
      pickRandomShuffle();
      if (--i) {
        shuffle(speed, i);
      } else {
        guessing = true;
      }
   }, s)
};

function assignRightAnswer() {
  var randomNumber = Math.floor(Math.random()*3);
  if (randomNumber === 0 ){
    spotOne.children[0].children[0].setAttribute('id', 'winner');
    spotOne.children[0].children[0].children[0].src = 'images/slash/owlslash250.png';
    setTimeout(function(){
    spotOne.children[0].children[0].children[0].src = 'images/slash/slash250.png'
    },1000);
  }else if(randomNumber === 1){
    spotTwo.children[0].children[0].setAttribute('id', 'winner');
    spotTwo.children[0].children[0].children[0].src = 'images/slash/owlslash250.png'
    setTimeout(function(){
    spotTwo.children[0].children[0].children[0].src = 'images/slash/slash250.png'
    },1000);
  }else if(randomNumber === 2){
    spotThree.children[0].children[0].setAttribute('id', 'winner');
    spotThree.children[0].children[0].children[0].src = 'images/slash/owlslash250.png'
    setTimeout(function(){
    spotThree.children[0].children[0].children[0].src = 'images/slash/slash250.png'
    },1000);
  }
}
function reveal() {
  winnerReveal = document.getElementById('winner');
  winnerReveal.children[0].src = 'images/slash/owlslash250.png';
}

function runGame() {
  getOptions();
  parseOptions(options);
  assignRightAnswer();
  setTimeout(function() {
    shuffle(speed, shuffles)}, 1000); //Argument is however many times you want to shuffle
}

function spotOneClick () {
  if(guessing) {
    reveal();
    if(spotOne.children[0].children[0].id === 'winner'){
      score = speedFactor * shuffles;
      if (isHighScore(score)) {
        popup.setAttribute('class', 'popup');
        feedback.innerHTML = '<p class="win">New High Score! <br />Your score is ' + score + '.<br />Whooo are you?.</p> <br /><form id="form"><input id="username" type="text" name="player" placeholder="---" maxlength="3"> <br /> <input id="submitun" type ="submit" value="submit"></form>';
        formListen();
      } else {
        popup.setAttribute('class', 'popup');
        feedback.innerHTML = '<a href="scores.html" class="win">You win! <br />Your score is ' + score + '.<br />Click to see high scores.</a>';
      }
    } else {
      popup.setAttribute('class', 'popup');
      feedback.innerHTML = '<a href="scores.html" class="lose">You lose! <br />Your score is ' + score + '.<br />Click to see high scores.</a>';
    } //produce feedback
  }
  guessing = false;
  return score;
}

function spotTwoClick () {
  if(guessing) {
    reveal();
    if(spotTwo.children[0].children[0].id === 'winner'){
      score = speedFactor * shuffles;
      if (isHighScore(score)) {
        popup.setAttribute('class', 'popup');
        feedback.innerHTML = '<p class="win">New High Score! <br />Your score is ' + score + '.<br />Whooo are you?.</p> <br /><form id="form"><input id="username" type="text" name="player" placeholder="---" maxlength="3"> <br /> <input id="submitun" type ="submit" value="submit"></form>';
        formListen();
      } else {
        popup.setAttribute('class', 'popup');
        feedback.innerHTML = '<a href="scores.html" class="win">You win! <br />Your score is ' + score + '.<br />Click to see high scores.</a>';
      }
    } else {
      popup.setAttribute('class', 'popup');
      feedback.innerHTML = '<a href="scores.html" class="lose">You lose! <br />Your score is ' + score + '.<br />Click to see high scores.</a>';
    } //produce feedback
  }
  guessing = false;
  return score;
}

function spotThreeClick () {
  if(guessing) {
    reveal();
    if(spotThree.children[0].children[0].id === 'winner'){
      score = speedFactor * shuffles;
      if (isHighScore(score)) {
        popup.setAttribute('class', 'popup');
        feedback.innerHTML = '<p class="win">New High Score! <br />Your score is ' + score + '.<br />Whooo are you?.</p> <br /><form id="form"><input id="username" type="text" name="player" placeholder="---" maxlength="3"> <br /> <input id="submitun" type ="submit" value="submit"></form>';
        formListen();
      } else {
        popup.setAttribute('class', 'popup');
        feedback.innerHTML = '<a href="scores.html" class="win">You win! <br />Your score is ' + score + '.<br />Click to see high scores.</a>';
      }
    } else {
      popup.setAttribute('class', 'popup');
      feedback.innerHTML = '<a href="scores.html" class="lose">You lose! <br />Your score is ' + score + '.<br />Click to see high scores.</a>';
    } //produce feedback
  }
  guessing = false;
  return score;
}

function isHighScore (score) {
  var curScore = {n: '', s: score};
  highScores.push(curScore);
  highScores = highScores.sort(function(a, b) {
    return a.s-b.s;
  });

  while (highScores.length > 10) {
    highScores.shift();
  }

  if (highScores.indexOf(curScore) > -1) {
    console.log(highScores);
    return true;
  } else {
    console.log(highScores);
    return false;
  }
}

spotOne.addEventListener('click', spotOneClick);
spotTwo.addEventListener('click', spotTwoClick);
spotThree.addEventListener('click', spotThreeClick);

function formListen () {
  var form = document.getElementById('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    var n= event.target.username.value;
    console.log(n);
    for (var i=0; i < highScores.length; i++) {
      if (highScores[i].n === '') {
        highScores[i].n = n.toUpperCase();
      }
      localStorage.setItem('scores', JSON.stringify(highScores));
      window.location = 'scores.html';
    }
  });
}

init();
setTimeout(function(){
  runGame();
}, 500);


var header = document.querySelector(".header");
var score = document.getElementById("score");
var submitButton = document.getElementById("submitButton");

var quizQuestionHeader = document.getElementById("quizQuestionHeader");
var choice1 = document.getElementById("one");
var choice2 = document.getElementById("two");
var choice3 = document.getElementById("three");
var choice4 = document.getElementById("four");
var correct = document.getElementById("correct");
var answerResponse = document.getElementById("answerResponse");

var finalScoreIs = document.getElementById("finalScoreIs");
var quizQuestionsPage = document.getElementById("quizQuestionsPage");
var questionButton = document.querySelector(".questionButton");

var quizChallengePage = document.getElementById("quizChallengePage");
var finalScorePage = document.getElementById("finalScorePage");
var highScoreButtons = document.getElementById("highScoreButtons");

var initialButton = document.getElementById("initialButton"); 
var initials = document.getElementById("initials"); 
var initialInput = document.getElementById("initialInput"); 

var allDone = document.getElementById("allDone");
var allDoneButtons = document.getElementById("form-inline");

var timer = document.getElementById("timer");

var quizQuestions = [
    {
    "quizQuestionHeader" : "Commonly used Data Types do NOT Include:", 
    "one" : "1. strings",
    "two" : "2. booleans",
    "three" : "3. alerts",
    "four" : "4. numbers",
    "correct" : "3. alerts",
    },{
    "quizQuestionHeader" : "The condition in an if / else statement is enclosed within ________.",
    "one" : "1. quotes",
    "two" : "2. curly brackets",
    "three" : "3. parenthesis",
    "four" : "4. square brackets",
    "correct" : "3. parenthesis",
    },{
    "quizQuestionHeader" : "Program used to give styling to a page is:",
    "one" : "1. Javascript",
    "two" : "2. HTML",
    "three" : "3. Stack Overflow",
    "four" : "4. CSS",
    "correct" : "4. CSS",
    },{
     "quizQuestionHeader" : "Sign used to define variables:",
     "one" : "1. commas",
     "two" : "2. Semi colon",
     "three" : "3. Colon",
     "four" : "4. parenthesis",
     "correct" : "3. Colon",
    },{
     "quizQuestionHeader" : "Do you enjoy coding?",
     "one" : "1. Yes",
     "two" : "2. Yes",
     "three" : "3. yes",
     "four" : "4. Yes",
     "correct" : "4. Yes",
    },
  ]
  
  var startScore = 0; 
  var questionIndex = 0;

  function codeQuizChallenge() {
    quizChallengePage.style.display = "block";
    header.style.display = "block";
    quizQuestionsPage.style.display = "none";
    finalScorePage.style.display = "none"; 

    var startScore = 0;
    timer.textContent = "Time: " + startScore;
  }
  function resetVariables() {
    startScore = 0; 
    questionIndex = 0;
  }
  function startQuiz() { 
    quizChallengePage.style.display = "none";
    quizQuestionsPage.style.display = "block";
    secondsLeft = 80;

    var timerInterval = setInterval(function() { 
        secondsLeft--;
        timer.textContent = "Time: " + secondsLeft;
        if (secondsLeft === 0 || quizQuestions.length === questionIndex) {
          clearInterval(timerInterval);
          showFinalScore();
        }
      }, 1000);
    }

    function showQuestions() {
        var q = quizQuestions[questionIndex];
      
        quizQuestionHeader.innerHTML = q.quizQuestionHeader;
        choice1.innerHTML = q.one;
        choice1.setAttribute("data-answer", q.one);
        choice2.innerHTML = q.two;
        choice2.setAttribute("data-answer", q.two);
        choice3.innerHTML = q.three;
        choice3.setAttribute("data-answer", q.three);
        choice4.innerHTML = q.four;
        choice4.setAttribute("data-answer", q.four);
      }
      showQuestions();
choice1.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice2.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice3.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice4.addEventListener("click", function (event) {
  checkAnswer(event);
})

 
function checkAnswer(event) {
  event.preventDefault();

  var answer = event.currentTarget.dataset.answer;
  var correctAnswer = null;

  if (quizQuestions[questionIndex].correct === answer) {
      correctAnswer = answer;
  }
  if (answer === correctAnswer) {
  answerResponse.textContent = "Correct!"; 
  } else {
  answerResponse.textContent = "Wrong!"; 
      secondsLeft -= 10
      if (secondsLeft < 0) {
          secondsLeft = 0;
      }
  }
  if (quizQuestions.length === questionIndex+1) {
    showFinalScore(); 
    return; 
  }
  questionIndex++;
  showQuestions();
}


function showFinalScore() {  
  quizQuestionsPage.style.display = "none"; 
  highScoreButtons.style.display = "none"; 
  finalScorePage.style.display = "block";  
  finalScoreIs.style.display = "block" 
  initials.style.display = "block" 
  initialButton.style.display = "block" 
  initialInput.style.display = "block" 

    finalScoreIs.textContent = "Your final score is " + secondsLeft;
    initialButton.textContent = "Submit"; 
    initials.textContent = "Enter Your Initials: "; 
} 

var highScoreArray = [] 

 
function showHighScores() {
  header.style.display = "none";  
  allDone.style.display = "none"; 
  finalScoreIs.style.display = "none" 
  initials.style.display = "none" 
  initialButton.style.display = "none" 
  initialInput.style.display = "none" 
  highScoreButtons.style.display = "block";  
  
  var getInitials = document.getElementById("initialInput").value;  

  var highScoreArray = JSON.parse(localStorage.getItem("highScore")) || [];
  
  var localStorageArray = { score: secondsLeft, initials: getInitials };
  highScoreArray.push(localStorageArray)
  localStorage.setItem("highScore", JSON.stringify(highScoreArray)); 

  var highScores = getInitials + ": " + secondsLeft; 

  $("#highScoreList").append(highScores) 
}




submitButton.addEventListener("click", function() { 
  startQuiz()
  console.log("start")
})


score.addEventListener("click", function() {
  showHighScores();
  console.log("view high scores")
})


initialButton.addEventListener("click", function() { 
  showHighScores();
  console.log("initial button")
}) 


clearHighScore.addEventListener("click", function() {
  localStorage.clear();
})


goBack.addEventListener("click", function() { 
  $("#highScoreList").empty() 
  $("#initialInput").val("")  
  resetVariables()
  codeQuizChallenge();
  console.log("restart quiz")
})


codeQuizChallenge(); 

// DOMS ELEMENTS  ---------------------------------------------------------
const dom_quiz = document.querySelector("#quiz");
const dom_question = document.querySelector("#question");
const dom_choices = document.querySelector("#choices"); // I created this to reference all choices for upcomming use
const dom_choiceA = document.querySelector("#A");
const dom_choiceB = document.querySelector("#B");
const dom_choiceC = document.querySelector("#C");
const dom_choiceD = document.querySelector("#D");
const dom_score = document.querySelector("#scoreContainer"); // I change this line fronm "#score" to "#scoreContainer" since it's mismatch the HTML file
const dom_start = document.querySelector("#start");

dom_start.addEventListener("click", onStart);

// DATA  ---------------------------------------------------------

// function JSON.parse(localStorage.getItem("quizData")) is to look for questions from localStorage to use, if none exist, use default questions

let questions = JSON.parse(localStorage.getItem("quizData")) || [
  {
    title: "What does HTML stand for?",
    choiceA: "Hi Thierry More Laught",
    choiceB: "How To move Left",
    choiceC: "Ho Theary Missed the Laundry !",
    choiceD: "Hypertext Markup Language",
    correct: "D",
  },
  {
    title: "What does CSS stand for?",
    choiceA: "Cisco and Super Start",
    choiceB: "Ci So Sa",
    choiceC: "Cascading Style Sheets ",
    choiceD: "I don't know !",
    correct: "C",
  },
  {
    title: "What does JS stand for?",
    choiceA: "Junior stars",
    choiceB: "Justing Star",
    choiceC: "Javascript",
    choiceD: "RonanScript",
    correct: "C",
  },
];

let runningQuestionIndex = 0;
let score = 0;

if (questions.length === 0) {
    alert("No questions found. Add some in the Edit page.");
}

// FUNCTIONS ---------------------------------------------------------

// Hide a given element
function hide(element) {
  element.style.display = "none";
  
}

function show(element) {
  element.style.display = "block";
}

function onStart() {
  // Render the current question
  // Display the quiz view,

  hide(dom_start);
  show(dom_quiz);

  // begin the first question
  renderQuestion();
}

function renderQuestion() {
  // Render the current question on the quiz view
  let q = questions[runningQuestionIndex];

  dom_question.textContent = q.title;

  dom_choiceA.textContent = q.choiceA;
  dom_choiceB.textContent = q.choiceB;
  dom_choiceC.textContent = q.choiceC;
  dom_choiceD.textContent = q.choiceD;

}

// run everytime user clicks on the choice answer 
// in here I change function name from onPlayerSubmit(answer) to checkAnswer(answer) (match the html) to prevent confusion or any possible errors

function checkAnswer(answer) {
  // Update the score, display the next question or the score view
  
  if(answer === questions[runningQuestionIndex].correct){
    score++;
  }
  runningQuestionIndex++;

  // check if there are more questions or run out of questions
  if(runningQuestionIndex < questions.length){
    renderQuestion();
  }
  else{
    renderSCore(); // if run out of qurestions, display score
  }
}

function renderSCore() {
  // calculate the amount of question percent answered by the user
  // choose the image based on the scorePerCent

  hide(dom_question);
  hide(dom_choices);

  //change style to met the result requirement

  dom_quiz.style.backgroundColor = "transparent";
  dom_quiz.style.width = "100%";

  show(dom_score);

  //calculate the score percentage

  let scorePercentage = Math.round((100 * score) / questions.length);

  let imgPath = ""; // declare imgPath variable
  let comment = "";


  if(scorePercentage >= 80){
    imgPath = "../../img/score_result/excellent.svg";
    comment = "Excellent!";
  }
  else if(scorePercentage >= 60){
    imgPath = "../../img/score_result/good.svg";
    comment = "Good!";
  }
  else if(scorePercentage >= 40){
    imgPath = "../../img/score_result/ok.svg";
    comment = "It's ok!";
  }
  else if(scorePercentage >= 20){
    imgPath = "../../img/score_result/bad.svg";
    comment = "NOOOO!";
  }
  else {
    imgPath = "../../img/score_result/fail.svg";
    comment = "HUMMM!";
  }

  dom_score.innerHTML = `
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">
    <img src="${imgPath}" alt="Result Emoji" style="width: 150px; height: auto;">
    <p>${comment} : ${scorePercentage}%</p>
  </div>
`;

}

// FUNCTIONS ---------------------------------------------------------
show(dom_start);
hide(dom_quiz);
hide(dom_score);


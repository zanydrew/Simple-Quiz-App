
const add_question_btn = document.querySelector("#add-question-btn");
const questions_list = document.querySelector(".question-list");
const create_question_box = document.querySelector(".modal-overlay");
const cancel_btn = document.querySelector("#cancel-btn");
const create_btn = document.querySelector("#create-btn");

add_question_btn.addEventListener("click", () => show(create_question_box));
cancel_btn.addEventListener("click", () => hide(create_question_box));
create_btn.addEventListener("click", createQuestion);

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

// FUNCTIONS ---------------------------------------------------------

//function for saved the edited or new questions when added on the edit page

function saveQuestions() {
  localStorage.setItem("quizData", JSON.stringify(questions));
}

// Hide a given element
function show(element) {
  element.classList.add("active");
}

function hide(element) {
  element.classList.remove("active");
}


function createQuestion() {
  const titleInput = create_question_box.querySelector(".title-input input").value;
  const choiceA = create_question_box.querySelectorAll(".answer-input input")[0].value;
  const choiceB = create_question_box.querySelectorAll(".answer-input input")[1].value;
  const choiceC = create_question_box.querySelectorAll(".answer-input input")[2].value;
  const choiceD = create_question_box.querySelectorAll(".answer-input input")[3].value;

  const correct = prompt("Enter correct answer: ").toUpperCase();

  if(titleInput && choiceA && choiceB && choiceC && choiceD && ["A","B","C","D"].includes(correct)){
      const newQ = { title: titleInput, choiceA, choiceB, choiceC, choiceD, correct };
      
      questions.push(newQ);
      saveQuestions(); 
      hide(create_question_box);
      renderQuestionsList();
  }
  
}

function renderQuestionsList(){
  questions_list.innerHTML = "";
  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question-item";

    div.innerHTML = `
      <span>${index + 1}. ${q.title}</span>
      <div class="actions">
        <button class="edit-btn"><i class="fa-solid fa-pen-to-square" style="color: purple;"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash" style="color: purple;"></i></button>
      </div>
    `;

    // edit question
    div.querySelector(".edit-btn").addEventListener("click", () => editQuestion(index));
    // Delete question
    div.querySelector(".delete-btn").addEventListener("click", () => deleteQuestion(index));

    questions_list.appendChild(div);

  });
}

function editQuestion(index){
  const q = questions[index];
  const newTitle = prompt("Edit question title:", q.title);
  const newA = prompt("Answer A:", q.choiceA);
  const newB = prompt("Answer B:", q.choiceB);
  const newC = prompt("Answer C:", q.choiceC);
  const newD = prompt("Answer D:", q.choiceD);
  const newCorrect = prompt("Correct answer (A/B/C/D):", q.correct).toUpperCase();

  if(newTitle && newA && newB && newC && newD && ["A","B","C","D"].includes(newCorrect)){
      questions[index] = { title: newTitle, choiceA: newA, choiceB: newB, choiceC: newC, choiceD: newD, correct: newCorrect };
      saveQuestions();
      renderQuestionsList();
  }
}

function deleteQuestion(index){
  questions.splice(index, 1);
  saveQuestions();
  renderQuestionsList();
}

renderQuestionsList();
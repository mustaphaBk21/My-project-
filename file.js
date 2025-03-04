
const quizData = [
  {
    question: 'Which is the largest animal in the world?',
    answers: [
      { text: 'Shark', correct: false },
      { text: 'Elephant', correct: false },
      { text: 'Blue whale', correct: true },
      { text: 'Giraffe', correct: false }
    ]
  },
  {
    question: 'Which is the smallest continent in the world?',
    answers: [
      { text: 'Asia', correct: false },
      { text: 'Africa', correct: false },
      { text: 'Europe', correct: false },
      { text: 'Australia', correct: true }
    ]
  },
  {
    question: 'Which is the largest island in the world?',
    answers: [
      { text: 'Malta', correct: false },
      { text: 'Australia', correct: false },
      { text: 'Greenland', correct: true },
      { text: 'Borneo', correct: false }
    ]
  },
  {
    question: 'What type of animal is a penguin?',
    answers: [
      { text: 'Mammal', correct: false },
      { text: 'Bird', correct: true },
      { text: 'Reptile', correct: false },
      { text: 'Amphibian', correct: false }
    ]
  },
  {
    question: 'Where do kangaroos originate from?',
    answers: [
      { text: 'North America', correct: false },
      { text: 'Africa', correct: false },
      { text: 'Australia', correct: true },
      { text: 'Asia', correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

// 
function loadQuestion() {
  var currentQuestion = quizData[currentQuestionIndex];
  document.getElementById("question").textContent = currentQuestion.question;
  var answersContainer = document.getElementById("answers");
  answersContainer.innerHTML = "";
  each(currentQuestion.answers,function(answer,index){
    var btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.setAttribute("data-index", index);
    btn.classList.add("answer-btn");
    answersContainer.appendChild(btn);
  })
}


  // 
  document.getElementById("next").style.display = "none";
  const answerBtns = document.querySelectorAll(".answer-btn");
  each(answerBtns,function(btn){
    btn.disabled = false; 
  })

// 
function handleAnswerClick(selectedBtn) {
  var currentQuestion = quizData[currentQuestionIndex];
  var selectedAnswerIndex = selectedBtn.getAttribute("data-index");

  // 
  var isCorrect = currentQuestion.answers[selectedAnswerIndex].correct;
  
  if (isCorrect) {
    score++;
    selectedBtn.classList.add("correct");
  } else {
    selectedBtn.classList.add("incorrect");
  }

  // 
  var answerBtns = document.querySelectorAll(".answer-btn");
  each(answerBtns,function(btn){
    btn.disabled = true;
  })

  // 
  document.getElementById("next").style.display = "block";
}

// 
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

// 
function showScore() {
  var quizContainer = document.getElementById("container");
  quizContainer.innerHTML = `<h2>Quiz Finished!</h2>
                             <p>Your score is: ${score} / ${quizData.length}</p>`;
  
}

// 
function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
  document.getElementById("next").style.display = "none";
  var answerBtns = document.querySelectorAll(".answer-btn");
  each(answerBtns,function(btn){
    btn.disabled = false;
    btn.classList.remove("correct", "incorrect");
  })

// 
document.addEventListener("DOMContentLoaded", function () {
  loadQuestion();

  // 
  document.getElementById("answers").addEventListener("click", function (event) {
    if (event.target && event.target.matches(".answer-btn")) {
      handleAnswerClick(event.target);
    }
  });

  // 
  document.getElementById("next").addEventListener("click", nextQuestion);
});
}
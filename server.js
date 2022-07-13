const myQuestions = [
  {
    question: "Em que ano nasceu José Saramago?",
    answers: {
      a: "1931",
      b: "1922",
      c: "1927",
    },
    correctAnswer: "b",
  },
  {
    question: "Qual a formação do autor Valter Hugo Mãe?",
    answers: {
      a: "Jornalismo",
      b: "Línguas",
      c: "Direito",
    },
    correctAnswer: "c",
  },
];

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

function showQuestions(questions, quizContainer) {
  // we'll need a place to store the output and the answer choices
  let output = [];
  let answers;

  // for each question...
  for (let i = 0; i < questions.length; i++) {
    // first reset the list of answers
    answers = [];

    // for each available answer to this question...
    for (letter in questions[i].answers) {
      // ...add an html radio button
      answers.push(
        "<label>" +
          '<input type="radio" name="question' +
          i +
          '" value="' +
          letter +
          '">' +
          letter +
          ": " +
          questions[i].answers[letter] +
          "</label>"
      );
    }

    // add this question and its answers to the output
    output.push(
      '<div class="question">' +
        questions[i].question +
        "</div>" +
        '<div class="answers">' +
        answers.join("") +
        "</div>"
    );
  }

  // finally combine our output list into one string of html and put it on the page
  quizContainer.innerHTML = output.join("");
}

function showResults(questions, quizContainer, resultsContainer) {
  // gather answer containers from our quiz
  let answerContainers = quizContainer.querySelectorAll(".answers");

  // keep track of user's answers
  let userAnswer = "";
  let numCorrect = 0;

  // for each question...
  for (let i = 0; i < questions.length; i++) {
    // find selected answer
    userAnswer = (
      answerContainers[i].querySelector(
        "input[name=question" + i + "]:checked"
      ) || {}
    ).value;

    // if answer is correct
    if (userAnswer === questions[i].correctAnswer) {
      // add to the number of correct answers
      numCorrect++;

      answerContainers[i].style.color = "green";
    }
    // if answer is wrong or blank
    else {
      answerContainers[i].style.color = "red";
    }
  }

  // show number of correct answers out of total
  resultsContainer.innerHTML = numCorrect + " out of " + questions.length;
}

function generateQuiz(
  questions,
  quizContainer,
  resultsContainer,
  submitButton
) {
  // show the questions
  showQuestions(questions, quizContainer);

  // when user clicks submit, show results
  submitButton.onclick = () => {
    showResults(questions, quizContainer, resultsContainer);
  };
}

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

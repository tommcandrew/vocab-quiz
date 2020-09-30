import { router } from "../utils/router.js";
import { questions } from "../assets/questions.js";
import Question from "./Question.js";

let currentQuestionIndex = 0;
let selectedLevel;
let currentQuestionObj = null;
let results = {};

const Quiz = {
  render: (data) => {
    if (data) {
      selectedLevel = data.selectedLevel;
      currentQuestionObj = questions[data.selectedLevel];
    }
    return `
    <h1>Vocabulary Quiz</h1>
    <h2>(${selectedLevel})</h2>
    <p>Press the record button and name what you see in the picture.</p>
    ${Question.render(currentQuestionObj[currentQuestionIndex])}
    <div class="quiz__buttons">
    <button class="quiz__record">Record</button>
    <button class="quiz__next">Next</button>
    </div>`;
  },
  postRender: () => {
    const recognition = new webkitSpeechRecognition();
    recognition.onresult = (e) => {
      recordButton.classList.remove("recording");
      if (
        e.results[0][0].transcript ===
        currentQuestionObj[currentQuestionIndex].answer
      ) {
        alert(
          `"${currentQuestionObj[currentQuestionIndex].answer}" is correct!`
        );
        results[currentQuestionIndex] = true;
      } else {
        alert(
          `"${e.results[0][0].transcript}" is wrong! The correct answer was "${currentQuestionObj[currentQuestionIndex].answer}"`
        );
        results[currentQuestionIndex] = false;
      }
    };
    recognition.onerror = (e) => {
      console.log("Error");
      console.log(e);
      recordButton.classList.remove("recording");
    };
    recognition.onnomatch = (e) => {
      console.log("No match");
      console.log(e);
      recordButton.classList.remove("recording");
    };
    const recordButton = document.querySelector(".quiz__record");
    recordButton.addEventListener("click", () => {
      recognition.start();
      recordButton.classList.add("recording");
    });
    const nextButton = document.querySelector(".quiz__next");
    nextButton.addEventListener("click", () => {
      if (results[currentQuestionIndex] === undefined) {
        alert("Please provide an answer");
        return;
      }
      if (currentQuestionIndex === currentQuestionObj.length - 1) {
        const score = Object.values(results).reduce((acc, val) => acc + val, 0);
        alert(`Quiz finished! Score: ${score}`);
      } else {
        currentQuestionIndex++;
        Quiz.render();
        router({ pathname: "/quiz" });
      }
    });
  },
};

export default Quiz;

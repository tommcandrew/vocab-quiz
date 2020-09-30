import { router } from "../utils/router.js";

const Results = {
  render: (data) =>
    `<div class="results__wrapper">
        <h3>Your score:</h3>
            <span class="results__score">${data.score}/3</span>
            <button class="results__back">Back</button>
    </div>`,
  postRender: () => {
    const backButton = document.querySelector(".results__back");
    backButton.addEventListener("click", () => {
      router({ pathname: "/" });
    });
  },
};

export default Results;

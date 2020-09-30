import LevelSelect from "../components/LevelSelect.js";
import Quiz from "../components/Quiz.js";
import NotFound from "../components/NotFound.js";
import Results from "../components/Results.js";

const root = document.getElementById("root");
root.innerHTML = `<div class="app_wrapper"></div>`;

let currentComponent = LevelSelect;

const views = {
  "/#/": LevelSelect,
  "/#/quiz": Quiz,
  "/#/results": Results,
};

export const router = (location, data) => {
  let newPath;
  if (!location.hash) {
    newPath = `/#${location.pathname}`;
  } else {
    newPath = `/${location.hash}`;
  }
  if (views[newPath]) {
    currentComponent = views[newPath];
  } else {
    currentComponent = NotFound;
  }
  root.innerHTML = currentComponent.render(data);
  currentComponent.postRender();
  history.pushState(null, null, newPath);
};

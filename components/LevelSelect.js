import { router } from "../utils/router.js";

const Home = {
  render: () => `
  <h1>Vocab Quiz</h1>
  <h2>Choose your level:</h2>
  <form class="levelSelect__form"><div class="levelSelect__levels">
  <div class="levelSelect__field">
  <label for="beginner">Beginner</label><br>
  <input type="radio" id="beginner" name="level" value="beginner">
  </div>
  <div class="levelSelect__field">
  <label for="intermediate">Intermediate</label><br>
  <input type="radio" id="intermediate" name="level" value="intermediate">
  </div>
  <div class="levelSelect__field">
  <label for="advanced">Advanced</label><br>
  <input type="radio" id="advanced" name="level" value="advanced">
  </div>
  </div>
  <button type="submit">Start</button>
  </form>
  `,
  postRender: () => {
    const form = document.querySelector(".levelSelect__form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!e.target.level.value) {
        alert("Please select a level");
        return;
      }
      const selectedLevel = e.target.level.value;
      router({ pathname: "/quiz" }, { selectedLevel });
    });
  },
};

export default Home;

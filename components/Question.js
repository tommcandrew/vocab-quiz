const Question = {
  render: (questionObj) => {
    return `<div class="question__wrapper"><img src=${questionObj.img} alt=""></div>`;
  },
  postRender: () => {},
};

export default Question;

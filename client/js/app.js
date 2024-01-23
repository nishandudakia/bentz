// state
let state = {
  score: "",
  currentQuestion: 0,
  correctAnswer: null,
};

// destructed object
let { currentQuestion, correctAnswer, score } = state;

const testObj = [
  [
    { flag: "https://flagcdn.com/fr.svg", name: "France" },
    { flag: "https://flagcdn.com/de.svg", name: "Germany" },
    { flag: "https://flagcdn.com/es.svg", name: "Spain" },
    { flag: "https://flagcdn.com/it.svg", name: "Italy" },
  ],
  [
    { flag: "https://flagcdn.com/us.svg", name: "United States" },
    { flag: "https://flagcdn.com/ca.svg", name: "Canada" },
    { flag: "https://flagcdn.com/gb.svg", name: "United Kingdom" },
    { flag: "https://flagcdn.com/au.svg", name: "Australia" },
  ],
  [
    { flag: "https://flagcdn.com/jp.svg", name: "Japan" },
    { flag: "https://flagcdn.com/cn.svg", name: "China" },
    { flag: "https://flagcdn.com/in.svg", name: "India" },
    { flag: "https://flagcdn.com/br.svg", name: "Brazil" },
  ],
  [
    { flag: "https://flagcdn.com/ru.svg", name: "Russia" },
    { flag: "https://flagcdn.com/za.svg", name: "South Africa" },
    { flag: "https://flagcdn.com/ar.svg", name: "Argentina" },
    { flag: "https://flagcdn.com/mx.svg", name: "Mexico" },
  ],
  [
    { flag: "https://flagcdn.com/nl.svg", name: "Netherlands" },
    { flag: "https://flagcdn.com/se.svg", name: "Sweden" },
    { flag: "https://flagcdn.com/no.svg", name: "Norway" },
    { flag: "https://flagcdn.com/dk.svg", name: "Denmark" },
  ],
  [
    { flag: "https://flagcdn.com/kr.svg", name: "South Korea" },
    { flag: "https://flagcdn.com/th.svg", name: "Thailand" },
    { flag: "https://flagcdn.com/id.svg", name: "Indonesia" },
    { flag: "https://flagcdn.com/vn.svg", name: "Vietnam" },
  ],
  [
    { flag: "https://flagcdn.com/gr.svg", name: "Greece" },
    { flag: "https://flagcdn.com/eg.svg", name: "Egypt" },
    { flag: "https://flagcdn.com/ke.svg", name: "Kenya" },
    { flag: "https://flagcdn.com/za.svg", name: "South Africa" },
  ],
  [
    { flag: "https://flagcdn.com/tr.svg", name: "Turkey" },
    { flag: "https://flagcdn.com/sa.svg", name: "Saudi Arabia" },
    { flag: "https://flagcdn.com/ae.svg", name: "United Arab Emirates" },
    { flag: "https://flagcdn.com/qa.svg", name: "Qatar" },
  ],
  [
    { flag: "https://flagcdn.com/pl.svg", name: "Poland" },
    { flag: "https://flagcdn.com/hu.svg", name: "Hungary" },
    { flag: "https://flagcdn.com/cz.svg", name: "Czech Republic" },
    { flag: "https://flagcdn.com/sk.svg", name: "Slovakia" },
  ],
  [
    { flag: "https://flagcdn.com/fi.svg", name: "Finland" },
    { flag: "https://flagcdn.com/no.svg", name: "Norway" },
    { flag: "https://flagcdn.com/dk.svg", name: "Denmark" },
    { flag: "https://flagcdn.com/is.svg", name: "Iceland" },
  ],
];

// selectors
const wrapper = document.querySelector(".wrapper");

async function startGame() {
  const currentQuestionData = testObj[currentQuestion];

  const randomCountry = pickRandomCountry(testObj[currentQuestion]);

  correctAnswer = randomCountry.name;

  wrapper.innerHTML = `
  <nav class="container d-flex justify-content-between align-items-center mt-3">
    <img src="./assets/logo.png" alt="logo of a flag with text saying name that flag" class="logo" />
    <p class="custom-primary fs-5 mt-3">${currentQuestion + 1} of ${
    testObj.length
  }</p>
  </nav>

  <section class="mt-5 container d-flex flex-column justify-content-center align-items-center">
    <img src=${randomCountry.flag} class="rounded custom-img" />
    <div class="mt-5 row">
      ${currentQuestionData
        .map(
          (data) => `
        <div class="col-md-6">
          <button class="custom-btn">${data.name}</button>
        </div>`
        )
        .join("")}
    </div>
  </section>`;

  const buttons = document.querySelectorAll(".custom-btn");

  //   add event listener to all buttons
  buttons.forEach((button) => {
    button.addEventListener("click", () => checkCorrectAnswer(button, buttons));
  });
}

// Function to pick a random country
function pickRandomCountry(countries) {
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
}

// function to check if button clicked is the correct answer
function checkCorrectAnswer(button, buttons) {
  if (button.textContent === correctAnswer) {
    button.classList.add("custom-bg-green");
    score++;
  } else {
    button.classList.add("custom-bg-red");
    // show current answer
    buttons.forEach((btn) => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("custom-bg-green");
      }
    });
  }

  async function endGame() {
    wrapper.innerHTML = `
    <nav class="container d-flex justify-content-between align-items-center mt-3">
      <img src="./assets/logo.png" alt="logo of a flag with text saying name that flag" class="logo" />
    </nav>
  
    <section class="mt-5 container d-flex flex-column align-items-center position-relative">

    <img src= 'assets/Star.png' style="width: 625px;" />

    <div class=" d-flex flex-row justify-content-evenly mt-4 w-100">
    <div class="col-4">
      <button class="custom-btn">Play Again</button>
    </div>
    <div class="col-4">
      <button class="custom-btn">Main Menu</button>
    </div>
    </div>
 



    </section>`;

    const buttons = document.querySelectorAll(".custom-btn");

    //   add event listener to all buttons
    buttons.forEach((button) => {
      button.addEventListener("click", () =>
        checkCorrectAnswer(button, buttons)
      );
    });
  }

  //   clear state
  correctAnswer = null;

  //   question delay
  const nextQuestionDelay = 1000;

  //   go to next question after 2 seconds
  setTimeout(() => {
    if (currentQuestion < 9) {
      currentQuestion++;
      startGame(); // call startGame to display the next question
    } else {
      endGame();
    }
  }, nextQuestionDelay);
}

const startButton = document.querySelector(".start");
startButton.addEventListener("click", startGame);

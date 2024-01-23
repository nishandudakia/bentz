// state
let state = {
  score: "",
  currentQuestion: 0,
  correctAnswer: null,
  countries: null,
};

// destructed object
let { currentQuestion, correctAnswer, score, countries } = state;

// requests
function getCountries() {
  const apiUrl = "http://localhost:8080/gamedata";

  // Using the fetch function to make a GET request
  fetch(apiUrl)
    .then((response) => {
      // Check if the request was successful (status code 200 OK)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response as JSON
      return response.json();
    })
    .then((data) => {
      // Handle the data
      countries = data;
    })
    .catch((error) => {
      // Handle errors
      console.error("Fetch error:", error);
    });
}
// selectors
const wrapper = document.querySelector(".wrapper");

async function startGame() {
  const currentQuestionData = countries[currentQuestion];

  const randomCountry = pickRandomCountry(countries[currentQuestion]);

  correctAnswer = randomCountry.name;

  wrapper.innerHTML = `
  <nav class="container d-flex justify-content-between align-items-center mt-3">
    <img src="./assets/logo.png" alt="logo of a flag with text saying name that flag" class="logo" />
    <p class="custom-primary fs-5 mt-3">${currentQuestion + 1} of ${
    countries.length
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
document.addEventListener("DOMContentLoaded", getCountries);
startButton.addEventListener("click", startGame);

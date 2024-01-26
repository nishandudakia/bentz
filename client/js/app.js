// state
let state = {
  score: 0,
  currentQuestion: 0,
  correctAnswer: null,
  countdown: 10,
  isSound: true,
  countries: null,
};

// destructed object
let { currentQuestion, correctAnswer, score, countdown, isSound, countries } =
  state;

let volumeButton; // Declare volumeButton as a global variable

// selectors
const wrapper = document.querySelector(".wrapper");

function getCountries() {
  // make request

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

  // load welcome page
  wrapper.innerHTML = `<nav
  class="container pt-3"
>
    <img
      src="./assets/logo.png"
      alt="logo of a flag with text saying name that flag"
      class="logo logo-welcome mt-3"
    />
   
    </nav>
    <div class="container d-flex justify-content-center">
      <div
      class="background-image-container mt-5 d-flex justify-content-center align-items-center"
      >
        <div
          class="text-box d-flex flex-column justify-content-center pt-5 pb-5 px-5 m-5">           
            <h1 class ="welcome-title">Name That Flag!</h1>
              <button class="start">Start</button>
              <p class="question-count pt-3">10 questions</p>
          </div>
        </div>
      </div>
    </div>`;

  const startButton = document.querySelector(".start");
  startButton.addEventListener("click", startGame);
}

async function startGame() {
  const currentQuestionData = countries[currentQuestion];

  const randomCountry = pickRandomCountry(countries[currentQuestion]);

  correctAnswer = randomCountry.name;

  wrapper.innerHTML = `
  <nav class="container d-flex justify-content-between align-items-center mt-3">
    <img src="./assets/logo.png" alt="logo of a flag with text saying name that flag" class="logo" />

     
    <div class="d-flex items-center justify-content-evenly" style = "width: 250px">
    <i class="fa-solid volume ${
      isSound ? "fa-volume-high" : "fa-volume-xmark"
    }"></i>

    <p class="custom-primary fs-5 mt-1">${currentQuestion + 1} of ${
    countries.length
  }
  </p>
  </div>
   
  </nav>

  <section class="mt-5 container d-flex flex-column justify-content-center align-items-center fade-in">
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

  volumeButton = document.querySelector(".volume");
  volumeButton.addEventListener("click", () => toggleVolume());
}

const toggleVolume = () => {
  isSound = !isSound;

  if (volumeButton.classList.contains("fa-volume-high")) {
    volumeButton.classList.remove("fa-volume-high");
    volumeButton.classList.add("fa-volume-xmark");
  } else {
    volumeButton.classList.remove("fa-volume-xmark");
    volumeButton.classList.add("fa-volume-high");
  }
};

// Function to pick a random country
function pickRandomCountry(countries) {
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
}

// function to check if button clicked is the correct answer
function checkCorrectAnswer(button, buttons) {
  if (button.textContent === correctAnswer) {
    if (isSound) {
      let audio = new Audio("./assets/correct.mp3");
      audio.play();
    }
    button.classList.add("custom-bg-green");
    score++;
  } else {
    if (isSound) {
      let wrongaudio = new Audio("./assets/wronganswer.mp3");
      wrongaudio.play();
    }
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

    <img src='assets/Star.png' style="width: 625px;" />

    <!-- Add text overlay with inline styles -->
    <div class="custom-primary" style="position: absolute; top: 42%; left: 50%; transform: translate(-50%, -50%); font-size: 128px; text-align: center;">
      ${score}/10
    </div>
      <button class="play-again-btn">Play Again</button> 
    </section>`;

    if (isSound) {
      let endAudio = new Audio("./assets/tada.mp3");
      endAudio.play();
    }

    const playAgainButton = document.querySelector(".play-again-btn");

    //   add event listener to all buttons
    playAgainButton.addEventListener("click", () => {
      currentQuestion = 0;
      score = 0;
      correctAnswer = null;
      getCountries();
      startGame();
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

document.addEventListener("DOMContentLoaded", getCountries);

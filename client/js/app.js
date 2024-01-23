// state
const state = {
  score: "",
};

// selectors
const wrapper = document.querySelector(".wrapper");

function startGame() {
  wrapper.innerHTML = `<nav
  class="container d-flex justify-content-between align-items-center mt-3"
>
  <img
    src="./assets/logo.png"
    alt="logo of a flag with text saying name that flag"
    class="logo"
  />
  <p class="custom-primary fs-5 mt-3">1 of 10</p>
</nav>

<section
  class="mt-5 container d-flex flex-column justify-content-center align-items-center"
>
  <!-- <h1 class="text-center custom-primary">Name That Flag!</h1> -->
  <img src="https://flagcdn.com/ml.svg" class="rounded custom-img" />
  <div class="mt-5 row">
    <div class="col-md-6">
      <button class="custom-btn">Nigeria</button>
    </div>
    <div class="col-md-6">
      <button class="custom-btn">Andorra</button>
    </div>
    <div class="col-md-6">
      <button class="custom-btn">Mexico</button>
    </div>
    <div class="col-md-6">
      <button class="custom-btn">Spain</button>
    </div>
  </div>
</section>`;
}

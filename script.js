const linkBtn = document.getElementById("shortenBtn");
const linksWrap = document.querySelector(".inputed_wrap");
const userInput = document.getElementById("input");
const error = document.querySelector(".input_error");
const getStarted = document.querySelectorAll(".btn");
const menuBtn = document.getElementById("menu");
const menu = document.querySelector(".mobile_menu-wrap");

menuBtn.addEventListener("click", function () {
  menu.classList.toggle("mobile_menu--active");
});

getStarted.forEach((btn) =>
  btn.addEventListener("click", () => {
    document
      .getElementById("section--2")
      .scrollIntoView({ behavior: "smooth" });
  })
);

const createLink = function () {
  url = userInput.value;
  fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
    .then((data) => data.json())
    .then((data) => {
      let newLink = data.result.full_short_link;

      let html = `
        <div class="inputed_inner">
        <span class="link" id="link">${url}</span>
        <div class="result">
          <span class="link" id="linkShort">${newLink}</span>
          <button class="copyLink" id="copyLink">Copy</button>
        </div>
        </div>
        </div>`;

      linksWrap.insertAdjacentHTML("afterbegin", html);

      const btn = linksWrap.querySelector("button");

      btn.addEventListener("click", function () {
        this.classList.toggle("copied");
        if (this.classList.contains("copied")) {
          navigator.clipboard.writeText(newLink);
          this.textContent = "Copied!";
        } else {
          this.textContent = "Copy";
          navigator.clipboard.writeText("");
        }
      });

      userInput.classList.remove("error_border");
      error.classList.remove("input_error--avtive");
      userInput.value = "";
    })
    .catch((err) => {
      userInput.classList.add("error_border");
      error.classList.add("input_error--avtive");
    });
};

linkBtn.addEventListener("click", createLink);
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") createLink();
});

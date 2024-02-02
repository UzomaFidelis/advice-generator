const generateBtn = document.querySelector(".advice__button");
const adviceText = document.querySelector(".advice__text");
const adviceId = document.querySelector(".advice__id");
const feedback = document.querySelector(".feedback");

const apiUrl = "https://api.adviceslip.com/advice";

async function getAdvice() {
  try {
    const response = await fetch(apiUrl, { method: "GET" });
    const data = await response.json();

    if (data) {
      const advice = data.slip;
      adviceText.textContent = advice.advice;
      adviceId.textContent = advice.id;
    }
  } catch (error) {
    feedback.textContent = "Network Error. Try again";
    feedback.style.top = "10px";
    feedback.style.opacity = "1";
    setTimeout(() => {
      feedback.style.top = "-100px";
      feedback.style.opacity = "0";
    }, 2000);
  }
}

generateBtn.addEventListener("click", (e) => {
  const buttonImg = e.target.children[0];
  buttonImg.src = "./images/double-ring-spinner.svg";
  e.target.disabled = true;

  getAdvice();

  setTimeout(() => {
    buttonImg.src = "./images/icon-dice.svg";
    e.target.disabled = false;
  }, 1500);
});

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
    feedback.setAttribute("aria-hidden", "false");
    feedback.style.top = "10px";
    feedback.style.opacity = "1";

    setTimeout(() => {
      feedback.style.top = "-100px";
      feedback.style.opacity = "0";
      feedback.setAttribute("aria-hidden", "true");
    }, 2000);
  }
}

generateBtn.addEventListener("click", (e) => {
  const buttonImg = e.target.children[1];
  const loaderImg = e.target.children[2];

  console.log(e.target.children);

  buttonImg.style.opacity = "0";
  loaderImg.style.opacity = "1";

  e.target.disabled = true;

  getAdvice();

  setTimeout(() => {
    buttonImg.style.opacity = "1";
    loaderImg.style.opacity = "0";
    e.target.disabled = false;
  }, 1500);
});

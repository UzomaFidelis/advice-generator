const generateBtn = document.querySelector(".advice__button");
const adviceText = document.querySelector(".advice__text");
const adviceId = document.querySelector(".advice__id");
const feedback = document.querySelector(".feedback");

const apiUrl = "https://api.adviceslip.com/advice";


async function retryGetAdvice(retries = 3, retryDelay = 2, err = null){
  if (!retries) {
    return Promise.reject(err);
  }

  return fetch(apiUrl, {method: "GET"}).catch(async (error) => {
    if (retryDelay) {
      await new Promise((resolve) => setTimeout(resolve, retryDelay * 1000));
    }

    return retryGetAdvice(retries - 1, retryDelay, error);
  });
}

generateBtn.addEventListener("click", async (e) => {
  const buttonImg = e.target.children[1];
  const loaderImg = e.target.children[2];

  // Show button loader svg
  buttonImg.style.opacity = "0";
  buttonImg.setAttribute("aria-hidden", "true");
  loaderImg.style.opacity = "1";
  loaderImg.setAttribute("aria-hidden", "false");
  e.target.disabled = true;

  try {
    const response = await retryGetAdvice();
    const data = await response.json();
    
    if (data) {
      const advice = data.slip;
      adviceText.textContent = advice.advice;
      adviceId.textContent = advice.id;
    }

  }catch(error) {
    feedback.setAttribute("aria-hidden", "false");
    feedback.style.top = "10px";
    feedback.style.opacity = "1";

    setTimeout(() => {
      feedback.style.top = "-100px";
      feedback.style.opacity = "0";
      feedback.setAttribute("aria-hidden", "true");
    }, 2000);
  } finally {
    // Remove button loader svg
    buttonImg.style.opacity = "1";
    buttonImg.setAttribute("aria-hidden", "false");
    loaderImg.style.opacity = "0";
    loaderImg.setAttribute("aria-hidden", "true");
    e.target.disabled = false;
  }
});

const generateBtn = document.querySelector(".advice__button");
const adviceText = document.querySelector(".advice__text");
const adviceId = document.querySelector(".advice__id");

const apiUrl = "https://api.adviceslip.com/advice";

function getAdvice() {
  fetch(apiUrl, {method: "GET" })

    .then((response) => {
      if (response.ok) {
        console.log("Fetch OK");
        return response.json();
      } else {
        console.log("Fetch Failed");
        throw new Error("An Error occured");
      }
    })

    .then((data) => {
      console.log(data.slip);
      adviceText.textContent = data.slip.advice;
      adviceId.textContent = data.slip.id;
    })

    .catch((error) => {
      console.error(error);
    });
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

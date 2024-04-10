const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const RESULT = document.getElementById("result");
const SOUND = document.getElementById("sound");
const BTN = document.getElementById("search-btn");

BTN.addEventListener("click", () => {
  let inputWord = document.getElementById("input-word").value;
  fetch(`${URL}${inputWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      RESULT.innerHTML = `
      <div class="word">
          <h3>${inputWord}</h3>
          <button onclick="playSound()">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
        <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>${data[0].phonetic || data[0].phonetics[1].text}</p>
        </div>
        <p class="word-meaning">
          ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
        ${data[0].meanings[0].definitions[0].example || ""}
        </p>`;
      SOUND.setAttribute("src",`${data[0].phonetics[0].audio}` || `${data[0].phonetics[1].audio}`);
    })
    
    .catch(() => {
        RESULT.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    });
});
function playSound() {
  SOUND.play();
}

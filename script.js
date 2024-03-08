const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inputWord = document.getElementById("input-word").value;
    fetch(`${url}${inputWord}`)
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
                data.forEach((entry, index) => {
                    if (index === 0) { // Display only the first entry
                        showResult(entry, inputWord);
                    }
                });
            } else {
                result.innerHTML = `<h3>Couldn't Find The Word</h3>`;
            }
        })
});

function showResult(data, inputWord) {
    result.innerHTML = `
        <div class="word">
            <h3>${inputWord}</h3>
            <button onclick="playSound('${data.phonetics[0].audio}')">
                <i class="fa-solid fa-volume-high"></i>
            </button>
        </div>
        <div class="details">
            <p>${data.meanings[0].partOfSpeech}</p>
            <p>/${data.phonetic}/</p>
        </div>
        <p class="word-meaning">
            ${data.meanings[0].definitions[0].definition}
        </p>
        <p class="word-example"> 
            ${data.meanings[0].definitions[0].example || ""} 
        </p>`;
}

function playSound(audioSrc) {
    sound.setAttribute("src", audioSrc);
    sound.play();
}
const moviesObject = {
    "✏️📓👩‍❤️‍👨": "The Notebook",
    "🦁 + 🤴": "The Lion King",
    "🤵🍸🔫": "James Bond",
    "👸👹🌹": "Beauty And The Beast",
    "🧙👓⚡": "Harry Potter",
    "👩‍❤️‍👨🚢🥶": "Titanic",
    "👻👻🔫": "Ghostbusters",
    "🐜👨 ": "Antman",
    "🐀👨‍🍳 ": "Ratatouille",
    "🖊️📓👩‍❤️‍👨": "The notebook",
    "😈👗👠": "Devil Wears Prada",
    "📱🍎 ": "Jobs",
    "🎉🍺🎊❎": "This Is the End",
    "🔍🐟 ": "Finding Nemo",
    "👸📔 ": "Princess Diaries",
    "🐔🏃 ": "Chicken Run",
    "👸 + 🐸": "The Princess and the Frog",
    "🦇🃏": "Batman",
    "🌎🦍🦧": "Planet of the Apes",
    " 🏝🗺❌🏴‍☠️💰": "Treasure Island",
    "⚡️🧔‍♂️🔨": "Thor",
    "👩🧛🐺": "Twilight",
    "🐍🐅📖": "The Jungle Book",
    "👑👴 + 💍💍": "The Lord of the Rings",
    "🌃🏫👱‍♂️🔦": "Night at the Museum",
    "👩🐇🍄🎩🐛": "Alice in Wonderland",
    "🪁": "Kites",
    "🤼👧👧": "Dangal",
    "🏍💨": "Dhoom",
    "🤫👌⭐": "Secret Superstar",
    "👅🏑🇮🇳": "Chak De India ",
    "👌3️⃣0️⃣": "Super 30",
    "📃1️⃣5️⃣": "Article 15",
    "🛸👽🦸‍♂️": "Koi Mil Gaya",
    "🤴🇮🇳": "Raja Hindustani",
    "🧑‍🌾🏏🇮🇳🏴󠁧󠁢󠁥󠁮󠁧󠁿": "Lagaan: Once Upon a Time in India",
    "🥊👩🏅": "Mary Kom",
    "🏆 🚴‍♂️ 🚴‍♂️🏅": "Jo Jeeta Wohi Sikandar",
    "🚗🕛📞🚗🕛": "Karthik Calling Karthik",
    "🎹 😎": "Andhadhun",
    "🔊➡🏙": "Shor In The City",
    "👳‍♂️↔🤴": "Singh Is King",
    "🚀👨👧": "Mission Mangal",
    "👵🤰👶": "Badhai Ho",
    "👨‍🦱➡👨‍🦲": "Bala",
    "👮🦁": "Singham",
    "❤🟰🥴": "Dil To Pagal Hai",
    "🎖👩‍✈️🚁": "Gunjan Saxena: The Kargil Girl"
};

const container = document.querySelector(".container");
const controls = document.querySelector(".controls-container");

const startButton = document.getElementById("start");
const letterContainer = document.getElementById("letter_container");
const userInputSection = document.getElementById("userInputSection");
const resultText = document.getElementById("result");

const hints = Object.keys(moviesObject);

let randomHint="" , randomWord="";
let winCount=0 , lossCount=5;

const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

//Blocker
const blocker = ()=>{
    let letterButtons = document.querySelectorAll(".letters");
    letterButtons.forEach((button)=>{
        button.disabled = true;
    });
    stopGame();
};

//Start Game
startButton.addEventListener("click",()=>{
    //Controls and buttons visibility
    controls.classList.add("hide");
    init();
});

//Stop game
const stopGame = () => {
    controls.classList.remove("hide");
};

// Generate word
const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";
    randomHint = hints[generateRandomValue(hints)];
    randomWord = moviesObject[randomHint];
    container.innerHTML = `<div id="movieHint">${randomHint}</div>`;
    let displayItem = "";
    randomWord.split("").forEach((value) => {
        if(value == " "){
            winCount += 1;
            displayItem += `<span class="inputSpace">&nbsp;</span>`;
        }
        else{
            displayItem += `<span class="inputSpace">_</span>`; 
        }
    });
    userInputSection.innerHTML = displayItem;
};

//Initial Function
const init = () => {
    winCount = 0;
    lossCount = 5;
    document.getElementById("chanceCount").innerHTML = `<span>Tries Left:</span>${lossCount}`;
    randomHint=null;
    randomWord="";
    userInputSection.innerHTML="";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML="";
    generateWord();
    
    for(let i=65;i<91;i++){
        let button = document.createElement("button");
        button.classList.add("letters");
        //No to ASCII[A-Z]
        button.innerText = String.fromCharCode(i);
        //Character button Click
        button.addEventListener("click",()=>{
            let charArray = randomWord.toUpperCase().split("");
            let inputSpace = document.getElementsByClassName("inputSpace")
            if(charArray.includes(button.innerText)){
                charArray.forEach((char,index)=>{
                    if(char===button.innerText){
                        button.classList.add("used");
                        inputSpace[index].innerText = char;
                        winCount += 1;
                        if(winCount == charArray.length){
                            resultText.innerHTML = "You Won!!"
                            blocker();
                        }
                    }
                });
            }
            else{
                lossCount -= 1;
                document.getElementById("chanceCount").innerHTML = `<span>Tries Left:</span>${lossCount}`;
                button.classList.add("used");
                if(lossCount==0){
                    resultText.innerHTML = "Game Over";
                    blocker();
                }
            }
            button.disabled = true;
        });
        letterContainer.appendChild(button);
    }
};

window.onload = ()=>{
    init();
};


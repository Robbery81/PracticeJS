let $start = document.getElementById("start"),
    $game = document.getElementById("game"),
    $gameTime = document.getElementById("game-time"),
    $time = document.getElementById("time"),
    $timeHeader = document.getElementById("time-header"),
    $resultHeader = document.getElementById("result-header"),
    $resultHeaderScore = document.getElementById("result");

let score = 0;
let isGameStarted = false;

$start.addEventListener("click", startGame);
$game.addEventListener("click", handleBoxClick);
$gameTime.addEventListener("input", setGameTime);

function handleBoxClick(e) {
    if (!isGameStarted) {
        return;
    }
    if (e.target.dataset.box) {
        score++;
        renderBox();
    }
}

function setGameTime() {
    $time.textContent = (+$gameTime.value).toFixed(1);

    hideElement($resultHeader);
    showElement($timeHeader);
}

function startGame() {
    score = 0;
    setGameTime();
    isGameStarted = true;
    $gameTime.setAttribute("disabled", "true");

    $game.style.backgroundColor = "#fff";
    hideElement($start);

    var interval = setInterval(function () {
        let time = parseFloat($time.textContent);
        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);

    renderBox();
}

function endGame() {
    isGameStarted = false;
    showElement($start);
    $game.style.backgroundColor = "#ccc";
    $game.innerHTML = "";

    hideElement($timeHeader);
    showElement($resultHeader);
    $resultHeaderScore.textContent = score;

    $gameTime.removeAttribute("disabled");
}

function showElement($el) {
    $el.classList.remove("hide");
}

function hideElement($el) {
    $el.classList.add("hide");
}

function renderBox() {
    $game.innerHTML = "";
    let box = document.createElement("div");
    let boxSize = getRandom(30, 100);
    let gameSize = $game.getBoundingClientRect();
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;
    let boxColor = getRandomColor();


    box.style.top = getRandom(0, maxTop) + "px";
    box.style.left = getRandom(0, maxLeft) + "px";
    box.style.height = box.style.width = `${boxSize}px`;

    box.style.position = "absolute";
    box.style.backgroundColor = boxColor;

    box.style.cursor = "pointer";
    box.setAttribute("data-box", true);

    $game.insertAdjacentElement("afterbegin", box);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
    return `rgb(
    ${getRandom(0, 255)}, 
    ${getRandom(0, 255)}, 
    ${getRandom(0, 255)})`;
}
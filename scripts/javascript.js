
const gScreen = document.querySelector("#screen");

const gridSize = document.querySelector("#gridSize");

let gridNumber = 8;

createGrid();
const squares = document.querySelectorAll(".test");
squares.forEach(changeBackgroundOnHover());

gridSize.addEventListener("input", newGrid()) //creates a new grid if the input changes



function newGrid() {
    return () => {
        gScreen.innerHTML = "";
        gridNumber = gridSize.value;
        gScreen.style.setProperty("--gridValue", gridNumber);
        createGrid();
        const squares = document.querySelectorAll(".test");
        squares.forEach(changeBackgroundOnHover());

    };
}
function changeBackgroundOnHover() {
    return square => {
        square.addEventListener("mouseover", e => { //generates and applies a random generated background
            const color = `hsl(${randomNumberHSL()},100%,${90 - (e.target.value * 10)}%)`;
            e.target.style.backgroundColor = color;
            e.target.value++;
        });
    };
}
function createGrid() {
    for (let i = 0; i < gridNumber ** 2; i++) {
        const block = document.createElement("div");
        block.classList.add("test");
        block.value = "0";
        gScreen.appendChild(block);
    }
}
function randomNumberHSL() {
    return Math.floor(Math.random() * 360);
}
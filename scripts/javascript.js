
const gScreen = document.querySelector("#screen");

const gridSize = document.querySelector("#gridSize");

let gridNumber = 4;

createGrid();

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
            const color = `rgb(${randomNumberRGB()},${randomNumberRGB()},${randomNumberRGB()})`;
            e.target.style.backgroundColor = color;
        });
    };
}
function createGrid() {
    for (let i = 0; i < gridNumber ** 2; i++) {
        const block = document.createElement("div");
        block.classList.add("test");
        gScreen.appendChild(block);
    }
}
function randomNumberRGB() {
    return Math.floor(Math.random() * 256);
}
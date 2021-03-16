
const gScreen = document.querySelector("#screen");

const gridSize = document.querySelector("#gridSize");

let gridNumber = 8;

createGrid();
const squares = document.querySelectorAll(".test");
squares.forEach(changeBackgroundOnHover());
gridSize.addEventListener("input", newGrid()) //creates a new grid if the input changes


let saturation = 100;
const bColor = document.querySelector("#bColor");
bColor.addEventListener("click", () => {
    saturation == 100 ? saturation = 0 : saturation = 100;
})

const bGrid = document.querySelector("#bGrid");
bGrid.addEventListener("click", () => {
    const squares = document.querySelectorAll(".test");
    squares.forEach((square) => {
        square.classList.toggle("grid")
    })
})
const bTransition = document.querySelector("#bTransition");
bTransition.addEventListener("click", () => {
    const squares = document.querySelectorAll(".test");
    squares.forEach((square) => {
        square.classList.toggle("transition");
    })
})
const bBackground = document.querySelector("#bBackground");
bBackground.addEventListener("click", () => {
    gScreen.classList.toggle("background");
})

const bReset = document.querySelector("#bReset");

bReset.addEventListener("click", () => {
    bReset.classList.toggle("resetBtnAnim")
    const squares = document.querySelectorAll(".test");
    squares.forEach((square) => {
         square.value=0;
        square.style.backgroundColor=null;
        square.classList.add("transition"); 
});});
bReset.addEventListener("animationend", () => {
    bReset.classList.remove("resetBtnAnim");
    squares.forEach((square) => {
    square.classList.remove("transition"); 
    });
})



function newGrid() {                    //think about how to avoid multiple calls if value is
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
            const color = `hsl(${randomNumberHSL()},${saturation}%,${90 - (e.target.value * 10)}%)`;
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
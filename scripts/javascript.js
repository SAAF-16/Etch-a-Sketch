let gridNumber = 30; //inizial grid size (if changed, change also  --gridValue on CSS)
let timeout;
let saturation = 100;
let color = false;
let squares;
let lastTouch;
let currentTouch;
let drawing = true;
let grid = false; //if grid is active
let transition = false;


const gScreen = document.querySelector("#screen");

const gridSize = document.querySelector("#gridSize");
gridSize.addEventListener("input", delayedNewGrid()); //create a new grid on input change(delayed to avoid useless operations)

/////////// settings buttons listeners //////////////////////////
const bColor = document.querySelector("#bColor");
bColor.addEventListener("click", toggleSaturation());

const bChoseColor = document.querySelector("#bChoseColor");
bChoseColor.addEventListener("click", activateSingleColorMode());

const bGrid = document.querySelector("#bGrid");
bGrid.addEventListener("click", toggleGrid());

const bTransition = document.querySelector("#bTransition");
bTransition.addEventListener("click", toggleTransition())

const bBackground = document.querySelector("#bBackground");
bBackground.addEventListener("click", toggleBackground());

const bReset = document.querySelector("#bReset");
bReset.addEventListener("click", resetGrid());
bReset.addEventListener("animationend", endAnimation())

const bDraw = document.querySelector("#bDraw");
bDraw.addEventListener("click", toggleMouseDrawing());
const notDrawing = () => {
    drawing = false;
}
const isDrawing = () => {
    drawing = true;
}
/////////////////////////////////////////////////////////////////////
createGrid();
////////////////////////  MOBILE SUPPORT   //////////////////////////

gScreen.addEventListener("touchmove", touchChangeBackgroundColor());
gScreen.addEventListener("touchstart", noScrollOnTouch());

////////////////////////////////////////////////////////////////////

///////////////// FUNCTIONS ///////////////////////////////////////////
function delayedNewGrid() {
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(newGrid(), 100);
    };
}

function endAnimation() {
    return () => {
        bReset.classList.remove("resetBtnAnim");
        squares.forEach((square) => {
            if (!transition) square.classList.remove("transition");
        });
    };
}

function resetGrid() {
    return () => {
        bReset.classList.toggle("resetBtnAnim");
        squares.forEach((square) => {
            square.value = 0;
            square.style.backgroundColor = null;
            square.classList.add("transition");
        });
    };
}

function toggleTransition() {
    return (e) => {

        squares.forEach((square) => {
            square.classList.toggle("transition");
        });
        e.target.classList.toggle("clicked");
        transition = !transition;
    };
}

function toggleGrid() {

    return (e) => {
        grid = !grid;
        squares.forEach((square) => {
            square.classList.toggle("grid");
        });
        e.target.classList.toggle("clicked");
    };
}

function activateSingleColorMode() {
    return () => {
        color = true;
    };
}

function toggleSaturation() {
    return (e) => {
        color = false;
        saturation == 100 ? saturation = 0 : saturation = 100;
        e.target.classList.toggle("clicked");
    };
}

function toggleMouseDrawing() {
    return (e) => {
        e.preventDefault()
        if (drawing) { //true
            drawing = !drawing;  //false
            squares.forEach((square) => {
                window.addEventListener("mousedown", isDrawing);
                window.addEventListener("mouseup", notDrawing);
            });
        } else if (!drawing) {//false
            squares.forEach((square) => {
                window.removeEventListener("mousedown", isDrawing);
                window.removeEventListener("mouseup", notDrawing);
            });
            drawing = !drawing;
        }
        e.target.classList.toggle("clicked");
    };
}

function newGrid() {
    return () => {
        gScreen.innerHTML = "";
        gridNumber = gridSize.value;
        gScreen.style.setProperty("--gridValue", gridNumber);
        createGrid();
    };
}

function createGrid() {
    for (let i = 0; i < gridNumber ** 2; i++) {
        let block = document.createElement("div");
        block.classList.add("tiles");
        block.value = "0";
        block.dataset.cellId = i;                       //gives an unique cell Id (touch support)
        if (grid) block.classList.add("grid");  //if grid is active add grid
        if (transition) block.classList.add("transition");    //if transition is acrive add transition
        if (!drawing) {                                 //if draw is active adds listeners to the new grid
            block.addEventListener("mousedown", isDrawing);
            block.addEventListener("mouseup", notDrawing);
        }
        block.addEventListener("mouseover", changeBackgroundColor(block));
        gScreen.appendChild(block);
    }
    squares = document.querySelectorAll(".tiles");
}

function noScrollOnTouch() {
    return function (e) {
        if (e.touches.length == 1) {
            e.preventDefault();
        }
    };
}

function touchChangeBackgroundColor() {
    return (e) => {

        let touch = e.touches[0];
        let focus = document.elementFromPoint(touch.clientX, touch.clientY);

        if (!(focus.classList.contains("tiles")))
            return false; //if we're not touching a tile doesn't go on
        lastTouch = focus.dataset.cellId;
        if (lastTouch != currentTouch) { //the color is changed only if a different cell is touched
            changeBackgroundColor(focus)();
            currentTouch = lastTouch;
        }
    };
}

function toggleBackground() {
    return (e) => {
        gScreen.classList.toggle("background");
        e.target.classList.toggle("clicked");
    };
}

function changeBackgroundColor(block) {
    return () => {
        if (!drawing) return;//false
        if (!color) {
            colors = `hsl(${randomNumberHSL()},${saturation}%,${90 - (block.value * 10)}%)`;
        } else { colors = bChoseColor.value; }
        block.style.backgroundColor = colors;
        block.value++;
    };
}

function randomNumberHSL() {
    return Math.floor(Math.random() * 360);
}
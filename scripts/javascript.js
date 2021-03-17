let gridNumber = 8; //inizial grid size (if changed, change also  --gridValue on CSS)
let timeout;
let saturation = 100;
let color = false;
let squares;
let lastTouch;
let currentTouch;
let drawing=true;
let grid=false; //if grid is active

const notDrawing = () => {
    drawing = false; //false
}

const isDrawing = ()=> {
    drawing = true; //true
}

const gScreen = document.querySelector("#screen");



const gridSize = document.querySelector("#gridSize");
gridSize.addEventListener("input", delayedNewGrid()); //creates a new grid if the input changes, ( adding a delay to avoid useless operations while changing value)

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

const bDraw= document.querySelector("#bDraw");
bDraw.addEventListener("click",toggleMouseDrawing());
/////////////////////////////////////////////////////////////////////
createGrid();
////////////////////////  MOBILE SUPPORT   //////////////////////////

gScreen.addEventListener("touchmove", touchChangeBackgroundColor());
gScreen.addEventListener("touchstart", noScrollOnTouch());



/////
/////couldn't remove event listeners after added.. why ? implementing throug class
/////



function toggleMouseDrawing() {
    return (e) => {
        if (drawing) { //true
            drawing = !drawing;  //false
            squares.forEach((square) => {
                square.addEventListener("mousedown",isDrawing); 
                square.addEventListener("mouseup", notDrawing);
            });
        } else if (!drawing) {//false
            squares.forEach((square) => {
                square.removeEventListener("mousedown", isDrawing);
                square.removeEventListener("mouseup", notDrawing);
            });
            drawing = !drawing;
        }
        e.target.classList.toggle("clicked");
    };
}



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
            square.classList.remove("transition");
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
    };
}

function toggleGrid() {
    
    return (e) => {
        grid= !grid;
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
        block.dataset.cellId = i;                   //gives an unique cell Id (touch support)
        if(grid==true)block.classList.add("grid");  //if grid is active add grid
        if(!drawing){                               //if draw is active adds listeners to the new grid
            block.addEventListener("mousedown", isDrawing);
            block.addEventListener("mouseup", notDrawing);
        }
        block.addEventListener("mouseover", changeBackgroundColor(block));
        gScreen.appendChild(block);
    }
    bTransition.classList.remove("clicked");
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
        if(!drawing)return;//false
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
let gridNumber = 8; //inizial grid size
let timeout;
let saturation = 100;
let color = false;
let squares;
let lastTouch;
let currentTouch;

const gScreen = document.querySelector("#screen");

createGrid();

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
/////////////////////////////////////////////////////////////////////

////////////////////////  MOBILE SUPPORT   //////////////////////////



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
        /*     const squares = document.querySelectorAll(".tiles");*/
        squares.forEach((square) => {
            square.value = 0;
            square.style.backgroundColor = null;
            square.classList.add("transition");
        });
    };
}

function toggleTransition() {
    return () => {

        squares.forEach((square) => {
            square.classList.toggle("transition");
        });
    };
}

function toggleGrid() {
    return () => {

        squares.forEach((square) => {
            square.classList.toggle("grid");
        });
    };
}

function activateSingleColorMode() {
    return () => {
        color = true;
    };
}

function toggleSaturation() {
    return () => {
        color = false;
        saturation == 100 ? saturation = 0 : saturation = 100;
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
    for (let i = 0; i < gridNumber** 2; i++) {
        const block = document.createElement("div");
        block.classList.add("tiles");
        block.value = "0";
        block.dataset.cellId=i; //gives an unique cell Id (touch support)
        block.addEventListener("mouseover", changeBackgroundColor(block));

        gScreen.appendChild(block);  
    }
    gScreen.addEventListener("touchmove" , (e)=>{

        let touch = e.touches[0];
        let focus = document.elementFromPoint(touch.clientX, touch.clientY);
        
        if(focus.className!="tiles")return false;   //if we're not touching a tile doesn't go on
        lastTouch=focus.dataset.cellId
        if(lastTouch!=currentTouch){        //the color is changed only if a different cell is touched
            changeBackgroundColor(focus)();
            currentTouch=lastTouch;
        }
        });
        
        gScreen.addEventListener("touchstart", function(e) {
        if (e.touches.length == 1) {
            e.preventDefault();
        }
      });





    squares = document.querySelectorAll(".tiles");
}

function toggleBackground() {
    return () => {
        gScreen.classList.toggle("background");
    };
}

function changeBackgroundColor(block) {
    return () => {
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
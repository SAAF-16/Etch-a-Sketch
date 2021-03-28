i'd like to understand more the refractored "argument" functions like:
function activateSingleColorMode() {
    return () => {
        color = true;
    };
}

to understand better how they work and when i can remove "return()=>{".
also now i know wthat i can use this functions as normal functions adding
another parenthesis at the end in this way: activateSingleColorMode()()
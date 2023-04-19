const gridState = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

let isCurrentlyNought = true;
let isWin = false

function testForWin() {
    // process the gridState and see if there's a row of three
    // return null for no win or "X" or "O" if there's a win
    // check horizontal rows
    for (let i = 0; i < gridState.length; i++) {
        const row = gridState[i];
        if(row[0] === row[1] && row[0] === row[2] && row[0] !== null) {
            isWin = true;
            return row[0]
        }
    }
    // check the vertical columns
    for (let i = 0; i < 3; i++) {
        if(gridState[0][i] === gridState[1][i] && gridState[0][i] === gridState[2][i] && gridState[0][i] !== null){
            isWin = true;
            return gridState[0][i];
        }
    }
    // check the diagonals
    if (gridState[0][0] === gridState[1][1] && gridState[0][0] === gridState[2][2] && gridState[0][0] !== null){
        isWin = true;
        return gridState[0][0];
    }
    if (gridState[2][0] === gridState[1][1] && gridState[0][2] === gridState[1][1] && gridState[1][1] !== null){
        isWin = true;
        return gridState[1][1];
    }
}

function handleClick (event) {
    if (isWin === true) {return;}
    const gridCoords = getGridCoords(event.x, event.y);
    if (gridState[gridCoords.yGrid - 1][gridCoords.xGrid - 1] !== null){
        return;
    }

    gridState[gridCoords.yGrid - 1][gridCoords.xGrid - 1] = (isCurrentlyNought === true) ? "O" : "X";

    if (isCurrentlyNought === true) {
        isCurrentlyNought = false;
    } else {
        isCurrentlyNought = true
    }
    const winningSymbol = testForWin();
    if (winningSymbol !== undefined) {
        // show message that the game is over and who won
        document.getElementsByClassName("WonSign")[0].innerHTML = winningSymbol + " Won";
        console.log(winningSymbol + ' won')
    }

    clearCanvas();
    render();
}

function clearCanvas() {
    const myCanvas = document.getElementById("myCanvas")
    const context = myCanvas.getContext('2d');
    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
}

function render() {
    drawGrid();
    for (let y = 0; y < gridState.length; y++) {
        for (let x = 0; x < gridState[y].length; x++) {
            if(gridState[y][x] === null) {
                continue;
            }
            if(gridState[y][x] === "X"){
                drawCross(x, y);
            } else {
                drawNought(x, y);
            }
        }
    }
}

function getGridCoords (x, y) {
    const myCanvas = document.getElementById("myCanvas")
    const rectangle = myCanvas.getBoundingClientRect()
    const Xreal = x - rectangle.left
    const Yreal = y - rectangle.top
    const xGrid = Math.ceil(Xreal/166.666)
    const yGrid = Math.ceil(Yreal/166.666)
    return {
        xGrid: xGrid,
        yGrid: yGrid
    }; // {xGrid: 2, yGrid: 1}
}

function drawGrid() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(166.666,0);
    ctx.lineTo(166.666,500);
    ctx.moveTo(333.333,0);
    ctx.lineTo(333.333,500);
    ctx.moveTo(0,166.666);
    ctx.lineTo(500,166.666);
    ctx.moveTo(0,333.333);
    ctx.lineTo(500,333.333);
    ctx.stroke();

}

function drawNought(x, y) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(x * 166 + 83, y * 166 + 83  ,50,0,2 * Math.PI);
    ctx.stroke();
}

function drawCross(x, y ) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    const Xpos = 166 * x + 83;
    const Ypos = 166 * y + 83;
    ctx.moveTo(Xpos - 50, Ypos - 50);
    ctx.lineTo(Xpos + 50,  Ypos + 50);
    ctx.moveTo(Xpos + 50, Ypos - 50);
    ctx.lineTo(Xpos - 50, Ypos + 50);
    ctx.stroke();
}

function showCoords(event) {
    let x = event.clientX;
    let y = event.clientY;
    let text = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("demo").innerHTML = text;
}

render();


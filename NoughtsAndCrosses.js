const gridState = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

let isCurrentlyNought = true;

function testForWin() {
    // process the gridState and see if there's a row of three
    // return null for no win or "X" or "O" if there's a win
}

function handleClick (event) {
    const gridCoords = getGridCoords(event.x, event.y);
    console.log(gridCoords);
    if (gridState[gridCoords.yGrid - 1][gridCoords.xGrid - 1] !== null){
        return;
    }

    gridState[gridCoords.yGrid - 1][gridCoords.xGrid - 1] = (isCurrentlyNought === true) ? "O" : "X";

    if (isCurrentlyNought === true) {
        isCurrentlyNought = false;
    } else {
        isCurrentlyNought = true
    }

    if (testForWin()) {
        // show message that the game is over and who won
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
    console.log(gridState)
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
    console.log(myCanvas.getBoundingClientRect())
    const xGrid = Math.ceil(Xreal/166.666)
    const yGrid = Math.ceil(Yreal/166.666)
    console.log(xGrid, yGrid);
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


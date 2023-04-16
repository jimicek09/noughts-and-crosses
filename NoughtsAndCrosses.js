const usedCells = [];
const Positions = {
    1: [83, 83],
    2: [249, 83],
    3: [418, 83],
    4: [83, 249],
    5: [249, 249],
    6: [418, 249],
    7: [83, 418],
    8: [249, 418],
    9: [418, 418]
};
const state = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

let isCurrentlyNought = true;

function handleClick (event) {
    console.log(event)
    const positionIndex = convertCoordsToPosition(event.x, event.y);
    if (usedCells.includes(positionIndex)){
        return;
    }
    usedCells.push(positionIndex);
    if (isCurrentlyNought == true) {
        drawNought(positionIndex);
        isCurrentlyNought = false;
    } else {
        drawCross(positionIndex);
        isCurrentlyNought = true
    }
}

function mapCoordsToPositionIndex(Xcellindex, Ycellindex){
    const mapPosition = Xcellindex + 3 * Ycellindex - 3;
    return mapPosition;
}

function convertCoordsToPosition (x, y) {
    const myCanvas = document.getElementById("myCanvas")
    const rectangle = myCanvas.getBoundingClientRect()
    const Xreal = x - rectangle.left
    const Yreal = y - rectangle.top
    console.log(myCanvas.getBoundingClientRect())
    const Xcellindex = Math.ceil(Xreal/166.666)
    const Ycellindex = Math.ceil(Yreal/166.666)
    console.log(Xcellindex,Ycellindex);
    return mapCoordsToPositionIndex(Xcellindex,Ycellindex);
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

function drawNought(positionIndex) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    const Xpos = Positions[positionIndex][0];
    const Ypos = Positions[positionIndex][1];
    // ctx.arc(Xpos, Ypos,50,0,2*Math.PI);

    console.log("Xpos" + Xpos)
    console.log("Ypos" + Ypos)

    ctx.arc(Xpos, Ypos,50,0,2*Math.PI);
    ctx.stroke();
}

function drawCross(positionIndex) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    const Xpos = Positions[positionIndex][0];
    const Ypos = Positions[positionIndex][1];
    ctx.moveTo(Xpos - 50, Ypos - 50);
    ctx.lineTo(Xpos + 50,  Ypos + 50);
    ctx.moveTo(Xpos + 50, Ypos - 50);
    ctx.lineTo(Xpos - 50, Ypos + 50);
    ctx.stroke();
}

function enterIntoGrid(type, Xpos, Ypos) {

}

function showCoords(event) {
    let x = event.clientX;
    let y = event.clientY;
    let text = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("demo").innerHTML = text;
}

drawGrid()

// e.g paint a cross in the top right of the grid
enterIntoGrid("cross")


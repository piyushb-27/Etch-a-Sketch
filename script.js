let container = document.querySelector(".container")
let grid = document.createElement("div")
grid.classList.add("grid")
createGrid(16) // create 16x16 grid by default

// Create (num)x(num) divs by default
function createGrid(num) {
    for (let i=0; i<num; i++) {
        let divRow = document.createElement("div")
        divRow.classList.add("grid-row")

        for (let j=0; j<num; j++) {
            let div = document.createElement("div")
            div.classList.add("square-div")
            div.style["border"] = "0.2px solid black"
            divRow.appendChild(div)
        }
        grid.appendChild(divRow)
    }
    container.appendChild(grid)
}

//color options
// 1. rainbow option

let isMultiColorStatus = false
let multiColorBtn = document.querySelector(".multi-colours-btn")

const colors = [
  "red", "blue", "green", "yellow", "orange",
  "purple", "pink", "cyan", "magenta", "lime",
  "teal", "indigo", "violet", "brown", "maroon",
  "navy", "olive", "gold", "silver", "coral",
  "#FF5733", "#33FF57", "#3357FF", "#F0F", "#0FF",
  "#FFD700", "#DC143C", "#8A2BE2", "#00CED1", "#FF69B4"
]

function pickOneColor() {
    return colors[Math.floor(Math.random()*colors.length)]
}

multiColorBtn.addEventListener("click",function (e){
    isMultiColorStatus= true
    container.style.border = "2px solid";
    container.style.borderImage = "linear-gradient(to right, red, orange, yellow, green, cyan, blue, indigo, violet) 1";
}   
)



// 2. static colour
let color = "blue"
let staticBtn = document.querySelector(".static-btn")

container.style["border"] = `2px solid ${color}` 
container.style["box-shadow"] = `0 4px 12px ${color}`

staticColors = [
  "red", "blue", "green", "yellow", "orange",
  "purple", "pink", "cyan", "magenta", "lime",
  "teal", "indigo", "violet", "brown", "maroon",
  "navy", "olive", "gold", "silver", "coral",
  "#FF5733", "#33FF57", "#3357FF", "#F0F", "#0FF",
  "#FFD700", "#DC143C", "#8A2BE2", "#00CED1", "#FF69B4"
]



staticBtn.addEventListener("click", function (){
    color = staticColors[Math.floor(Math.random()*staticColors.length)]
    container.style["border"] = `2px solid ${color}` 
    container.style["box-shadow"] = `0 4px 12px ${color}`
    isMultiColorStatus = false
})

// coloring logic

let isMouseDown = false;
// Track mouse state
grid.addEventListener("mousedown", function(event) {
    if (event.target.className === "square-div") {
        isMouseDown = true;
        if (isMultiColorStatus) {
            let randomColor = pickOneColor()
            event.target.style["background-color"] = randomColor
            container.style["border"] = `2px solid ${randomColor}`;
            container.style["box-shadow"] = `0 4px 12px ${randomColor}`

        } 
        else event.target.style["background-color"] = color
    }
    
});

document.addEventListener("mouseup", function() {
    isMouseDown = false;
});

// Color divs when dragging over them
grid.addEventListener("mouseover", function(event) {
    if (!isMouseDown) return;
    if (event.target.className === "square-div") {
    if (isMultiColorStatus) {
        let randomColor = pickOneColor()
        event.target.style["background-color"] = randomColor
        container.style["border"] = `2px solid ${randomColor}`;
        container.style["box-shadow"] = `0 4px 12px ${randomColor}`
    } 
    else event.target.style["background-color"] = color
}
});

// Prevent text selection while dragging
container.addEventListener("selectstart", function(event) {
    event.preventDefault();
});

// Now, for custom no of grids

let modifyBtn = document.querySelector(".modify-btn")

modifyBtn.addEventListener("click", modifyGrid)

function modifyGrid(e) {
    let noOfSquares = parseInt(prompt("Enter the no of squares per side for new grid (1-100)"))
    if (noOfSquares > 100 || noOfSquares <1) {
        alert("Please enter the no in range of 1-100 only.")
    } else {
        grid.innerHTML=""
        createGrid(noOfSquares)
    }
    

}

// logic for erasing

eraseBtn = document.querySelector(".erase-all")
eraseBtn.addEventListener("click",function (){
    const allCells = document.querySelectorAll(".grid-row div")
    allCells.forEach(cell => {
        cell.style.background = "white"
    })
})
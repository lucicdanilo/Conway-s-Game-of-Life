let grid;
let cols;
let rows;
let resolution = 10;
let backgroundColor = "#FFFFFF";	
let fillColor = "#000000";
let heightCanvas = 400;
let widthCanvas = 600;



function creatingMatrix(cols, rows) {
    let array = new Array(cols);
    for (let i = 0; i < array.length; i++) {
      array[i] = new Array(rows);
    }
    return array;
  }

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += grid[col][row];
      }
    }
    sum -= grid[x][y];
    return sum;
}
  
function setup() {
    createCanvas(widthCanvas, heightCanvas);

    cols = width / resolution;
    rows = height / resolution;
  
    grid = creatingMatrix(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = floor(random(2));
      }
    }
  }
  
function draw() {
    background(backgroundColor);
  
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] == 1) {
          fill(fillColor);
          rect(x, y, resolution, resolution);
        }
      }
    }
  
    let nextFrame = creatingMatrix(cols, rows);
  
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
    
        let sum = 0;
        let neighbors = countNeighbors(grid, i, j);
  
        if (state == 0 && neighbors == 3) {
          nextFrame[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          nextFrame[i][j] = 0;
        } else {
          nextFrame[i][j] = state;
        }
  
      }
    }
  
    grid = nextFrame;
}
  
  

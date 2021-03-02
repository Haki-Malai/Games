window.addEventListener('load', ()=>{
    let sudoku = document.querySelector('#sudoku')
    var blocks = [], grid = []
    let fixLeft = 0
    for (let i = 0; i<9; i++){
        //Init the 9x9 arrays
        grid[i] = []
        blocks[i] = []
        for (let j =0; j<9; j++){
            //Add border to bot and right side
            if (((j==8)&&(i==8))){
                sudoku.innerHTML += "<div id = \'block[" + i + "][" + j + "]\'class=\'block bottomBlock sideBlock\'></div>"
            }else if (j == 8){
                sudoku.innerHTML += "<div id = \'block[" + i + "][" + j + "]\'class=\'block bottomBlock\'></div>"
            }else if (i== 8){
                sudoku.innerHTML += "<div id = \'block[" + i + "][" + j + "]\'class=\'block sideBlock\'></div>"
            }//Add element
            else{
                sudoku.innerHTML += "<div id = \'block[" + i + "][" + j + "]\'class=\'block\'></div>"
            }
            blocks[i][j] = document.getElementById('block['+i+']['+j+']')
            grid[i][j] = 0
            blocks[i][j].style.position = 'absolute'
            blocks[i][j].style.left = fixLeft*4+'em'
            blocks[i][j].style.top = j*4+'em'
            //Add input
            blocks[i][j].innerHTML += "<input class =\"input\" value=\"\" size =\"1\" maxlenght=\"1\">"
            //Make border fatter where it's needed
            if (j % 3 == 0){
                blocks[i][j].style.height = '3.7em'
                blocks[i][j].style.borderTopWidth = '0.3em'
            }else{
                blocks[i][j].style.borderTopWidth = '0.15em'
            }
            if (i % 3 == 0){
                blocks[i][j].style.width = '3.7em'
                blocks[i][j].style.borderLeftWidth = '0.3em'
            }else{
                blocks[i][j].style.borderLeftWidth = '0.15em'
            }
        }
        fixLeft = fixLeft + 1
    }
})
function sample(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}
function solve(grid){
    solveHelper(grid)
    if (checkFilled(grid)){
        return grid
    }else{
        return false
    }
}
function canAssign(grid, row, col, value){
    for(let i=0; i<9; i++){
        if ((grid[row][i] == value) || (grid[i][col] == value) || valueInBox(grid, row, col, value) || valueInHyperBox(grid, row, col, value)){
            return false
        }
    }
    return true
}
function solveHelper(grid){
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            if(grid[i][j] == 0){
                for(let n=1; n<10; n++){
                    if (canAssign(grid, i, j, n)){
                        grid[i][j] = n
                        if(solveHelper(grid)){
                            return grid
                            continue
                        }else{
                            grid[i][j] = 0
                        }
                    }
                }
                return false
            }
        }
    }
    return true
}
function solutions(grid){
    solutions = 0
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            if(grid[i][j] == 0){
                for(let n=1; n<10; n++){
                    if (canAssign(grid, i, j, n)){
                        grid[i][j] = n
                        if(solveHelper(grid)){
                            solutions += 1
                            grid[i][j] = 0
                            continue
                        }else{
                            grid[i][j] = 0
                        }
                    }
                }
                return false
            }
        }
    }
    return true
}
function valueInBox(grid, row, col, value){
    box_row = row - (row % 3)
    box_col = col - (col % 3)

    for (let i = box_row; i<box_row+3; i++){
        for (let j = box_col; j<box_col+3; j++){
            if (grid[i][j] == value){
                return true
            }
        }
    }
    return false
}
function valueInHyperBox(grid, row, col, value){
    result = false
    if ((0 < row < 4) && (0 < col < 4)){
        for (let i = 0; i<4; i++){
            for (let j = 0; j<4; j++){
                if (grid[i][j] == value){
                    return true
                }
            }
        }
    }else if ((4 < row < 8) && (0 < col < 4)){
        for (let i = 5; i<8; i++){
            for (let j = 1; j<4; j++){
                if (grid[i][j] == value){
                    return true
                }
            }
        }
    }else if ((0 < row < 4) && (4 < col < 8)){
        for (let i = 1; i<4; i++){
            for (let j = 5; j<8; j++){
                if (grid[i][j] == value){
                    return true
                }
            }
        }
    }else if ((4 < row < 8) && (4 < col < 8)){
        for (let i = 5; i<8; i++){
            for (let j = 5; j<8; j++){
                if (grid[i][j] == value){
                    return true
                }
            }
        }
    }
}
function checkFilled(grid){
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            if(grid[i][j] == 0){
                return false
            }
        }
    }
    return true
}
var grid = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
]
solve(grid)
console.log(grid)
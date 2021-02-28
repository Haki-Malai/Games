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
class HyperSudoku{
    constructor(){
        this.randomNumbers = sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 9)
    }
    solve(grid){
        //check if the grid is solvable
        if((this.checkSolvable(grid)) == true){
            console.log(grid)
            return grid
        }else{
            return false
        }
        //solve helper to fill in the grid
        this.solveHelper(grid)
    }
    printGrid(grid){
        console.log(grid)
    }
    solveHelper(grid){
        //Traverse through the cells of the sudoku
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                //if the current cell is unassigned
                if(grid[i][j] == 0){
                    //We check if we can assign a random number if not we try another
                    for(let n = 0; n < 10; n++){
                        //if the current random number can be assigned we assign it to the current cell
                        if(this.canAssign(grid, i, j, n) == true){
                            grid[i][j] == this.randomNumbers[n]
                            //if the sudoku puzzle is solved we return true
                            if(this.solveHelper(grid) == true){
                                return true
                            }else{
                                //else we reset the current cell as unassigned
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
    checkSolvable(grid){
        //Traverse through all the cells and if there is a single 0 in the grid puzzle was unsolvable
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                if(grid[i][j] == 0){
                    return false
                }
            }
        }
        return true
    }
    canAssign(grid, row, col, num){
        //Returns true if we can assign the num given
        result = (this.numInRow(grid, row, num) || this.numInCol(grid, col, num) || this.numInBox(grid, row, col, num))
        //If currently in the hyper box we need to check if we can assign
        if ((0 < row < 4) && (0 < col < 4) || (4 < row < 8) && (0 < col < 4) || (0 < row < 4) && (4 < col < 8) || (4 < row < 8) && (4 < col < 8)){
            result = result || this.numInHyperBox(grid, row, col, num)
        }
        return (!result)
    }
    numInRow(grid, row, num){
        result = false
        for(let i = 0; i < 10; i++){
            if(grid[row][i] == num){
                result = true
            }    
        }
        return result
    }
    numInCol(grid, row, num){
        result = false
        for(let i = 0; i < 10; i++){
            if(grid[i][row] == num){
                result = true
            }    
        }
        return result
    }
    numInBox(grid, row, col, num){
        result = false
        box_row = row - (row % 3)
        box_col = col - (col % 3)
        for(let i = box_row; i< box_row+4; i++){
            for(let j = box_row; j< box_row+4; j++){
                if(grid[i][j] == num){
                    result = true
                }
            }
        }
        return result
    }
    numInHyperBox(grid, row, col, num){
        //return true if given num is not assigned in the 3x3 box that contains the given row of the sudoku grid, else returd false
        result = false
        if ((0 < row < 4) && (0 < col < 4)){
            for(let i = 1; i<5; i++){
                for(let i = 1; i<5; i++){
                    if(grid[i][j] == num){
                        result = true
                    }
                }    
            }
        }else if ((4 < row < 8) && (0 < col < 4)){
            for(let i = 5; i<9; i++){
                for(let j = 1; j<5; j++){
                    if(grid[i][j] == num){
                        result = true
                    }
                }    
            }
        }else if ((0 < row < 4) && (4 < col < 8)){
            for(let i = 1; i<5; i++){
                for(let j = 5; j<9; j++){
                    if(grid[i][j] == num){
                        result = true
                    }
                }    
            }
        }else if ((4 < row < 8) && (4 < col < 8)){
            for(let i = 5; i<9; i++){
                for(let j = 5; j<9; j++){
                    if(grid[i][j] == num){
                        result = true
                    }
                }    
            }
        }
        return result 
    }
}
//initialise empty 9 by 9 grid
var grid = [
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
]
let hyper = new HyperSudoku()
hyper.solve(grid)
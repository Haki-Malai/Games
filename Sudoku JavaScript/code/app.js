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
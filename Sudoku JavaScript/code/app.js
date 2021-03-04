window.addEventListener('load', ()=>{
    let sudoku = {
        id : document.querySelector('#sudoku'),
        difficulty : 'medium',
        blocks : [],
        inputs : [],
        makeElements : ()=>{
            fixLeft = 0
            for (let i = 0; i<9; i++){
                //Init the 9x9 arrays
                grid[i] = []
                sudoku.blocks[i] = []
                sudoku.inputs[i] = []
                for (let j =0; j<9; j++){
                    //Add border to bot and right side
                    if (((j==8)&&(i==8))){
                        sudoku.id.innerHTML += "<div id = \'block[" + i + "][" + j + "]\'class=\'block bottomBlock sideBlock\'></div>"
                    }else if (j == 8){
                        sudoku.id.innerHTML += "<div id = \'block[" + i + "][" + j + "]\'class=\'block bottomBlock\'></div>"
                    }else if (i== 8){
                        sudoku.id.innerHTML += "<div id = \'block[" + i + "][" + j + "]\'class=\'block sideBlock\'></div>"
                    }//Add element
                    else{
                        sudoku.id.innerHTML += "<div id = \'block[" + i + "][" + j + "]\'class=\'block\'></div>"
                    }
                    sudoku.blocks[i][j] = document.getElementById('block['+i+']['+j+']')
                    grid[i][j] = 0
                    sudoku.blocks[i][j].style.position = 'absolute'
                    sudoku.blocks[i][j].style.left = fixLeft*4+'em'
                    sudoku.blocks[i][j].style.top = j*4+'em'
                    //Add input
                    sudoku.blocks[i][j].innerHTML += "<input id = \'input["+i+']['+j+"]\' class =\"input\" value=\"\" size =\"1\" maxlength=\"1\">"
                    sudoku.inputs[i][j] = 'input['+i+']['+j+']'
                    //Make border fatter where it's needed
                    if (j % 3 == 0){
                        sudoku.blocks[i][j].style.height = '3.7em'
                        sudoku.blocks[i][j].style.borderTopWidth = '0.3em'
                    }else{
                        sudoku.blocks[i][j].style.borderTopWidth = '0.15em'
                    }
                    if (i % 3 == 0){
                        sudoku.blocks[i][j].style.width = '3.7em'
                        sudoku.blocks[i][j].style.borderLeftWidth = '0.3em'
                    }else{
                        sudoku.blocks[i][j].style.borderLeftWidth = '0.15em'
                    }
                }
                fixLeft = fixLeft + 1
            }
        },
        showPuzzle : ()=>{
            for (let i=0; i<9; i++){
                for (let j=0; j<9; j++){
                    if (hard[1][0][i][j] != 0){
                        document.getElementById(sudoku.inputs[i][j]).setAttribute('readonly', hard[1][0][i][j])
                        document.getElementById(sudoku.inputs[i][j]).value = hard[1][0][i][j]
                    }
                }
            }
        }
    }
    sudoku.makeElements()
    sudoku.showPuzzle()
    let menu = {
        id : document.querySelector('#menu'),
        restart : document.querySelector('#restart'),
        check : document.querySelector('#check'),
        easy : document.querySelector('#easy'),
        medium : document.querySelector('#medium'),
        hard : document.querySelector('#hard'),
        solution : document.querySelector('#solution'),
        newgame : document.querySelector('#newgame'),
        addEventListeners : ()=>{
            easy.addEventListener('click',()=> sudoku.difficulty = 'easy')
            medium.addEventListener('click',()=> sudoku.difficulty = 'medium')
            hard.addEventListener('click',()=> sudoku.difficulty = 'hard')
            restart.addEventListener('click',()=> sudoku.restart())
            check.addEventListener('click', ()=> sudoku.check())
            solution.addEventListener('click', ()=> sudoku.solution())
        }
    }
})
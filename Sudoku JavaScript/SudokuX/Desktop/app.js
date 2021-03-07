window.addEventListener('load', ()=>{
    let sudoku = {
        id : document.querySelector('#sudoku'),
        puzzle : medium[(Math.floor(Math.random() * 2000))],
        difficulty : 2,
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
                    if (((j==8)&&(i==8))){//Add border to bot and right side
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
                    //color x boxes
                    if ((i == j) || (i + j == 8)){
                        sudoku.blocks[i][j].style.backgroundColor = 'rgb(224, 144, 134)'
                        sudoku.blocks[i][j].innerHTML += "<input id = \'input["+i+']['+j+"]\' class =\"input hyper\" value=\"\" size =\"1\" maxlength=\"1\">"
                    }else {
                        sudoku.blocks[i][j].innerHTML += "<input id = \'input["+i+']['+j+"]\' class =\"input\" value=\"\" size =\"1\" maxlength=\"1\">"
                    }
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
                    if (sudoku.puzzle[0][i][j] != 0){
                        document.getElementById(sudoku.inputs[i][j]).setAttribute('readonly', sudoku.puzzle[0][i][j])
                        document.getElementById(sudoku.inputs[i][j]).value = sudoku.puzzle[0][i][j]
                    }else{
                        document.getElementById(sudoku.inputs[i][j]).value = ''
                    }
                }
            }
        },
        restart : ()=>{
            for (let i=0; i<9; i++){
                for (let j=0; j<9; j++){
                    if (sudoku.puzzle[0][i][j] == 0){
                        document.getElementById(sudoku.inputs[i][j]).value = ''
                    }
                }
            }
        },
        showSolution : ()=>{
            for (let i=0; i<9; i++){
                for (let j=0; j<9; j++){
                    document.getElementById(sudoku.inputs[i][j]).value = sudoku.puzzle[1][i][j]
                }
            }
        },
        check : ()=>{
            for (let i=0; i<9; i++){
                for (let j=0; j<9; j++){
                    if ((sudoku.puzzle[0][i][j] == 0)&&(document.getElementById(sudoku.inputs[i][j]).value != sudoku.puzzle[1][i][j])){
                        document.getElementById(sudoku.inputs[i][j]).style.color='red'
                    }else if ((sudoku.puzzle[0][i][j] == 0)&&(document.getElementById(sudoku.inputs[i][j]).value == sudoku.puzzle[1][i][j])){
                        document.getElementById(sudoku.inputs[i][j]).style.color='green'
                    }
                }
            }
            setTimeout(()=>{
                for (let i=0; i<9; i++){
                    for (let j=0; j<9; j++){
                        document.getElementById(sudoku.inputs[i][j]).style.color = 'black'
                    }
                }
            }, 1000)
        },
        newGame : ()=>{
            if (sudoku.difficulty == 1){
                console.log('selected easy')
                sudoku.puzzle = easy[(Math.floor(Math.random() * 2000))]
            }else if (sudoku.difficulty == 2){
                console.log('selected medium')
                sudoku.puzzle = medium[(Math.floor(Math.random() * 2000))]
            }else if (sudoku.difficulty == 3){
                console.log('selected hard')
                sudoku.puzzle = hard[(Math.floor(Math.random() * 2000))]
            }
            sudoku.showPuzzle()
        }
    }
    sudoku.makeElements()
    sudoku.showPuzzle()
    let menu = {
        id : document.querySelector('#menu'),
        restart : document.querySelector('#restart'),
        check : document.querySelector('#check'),
        selector : document.querySelector('#selector'),
        solution : document.querySelector('#solution'),
        newgame : document.querySelector('#newgame'),
        addEventListeners : ()=>{
            menu.selector.addEventListener('change', ()=>sudoku.difficulty=event.target.value)
            menu.restart.addEventListener('click', sudoku.restart)
            menu.check.addEventListener('click', sudoku.check)
            menu.solution.addEventListener('click', sudoku.showSolution)
            menu.newgame.addEventListener('click', sudoku.newGame)
        }
    }
    menu.addEventListeners()
})
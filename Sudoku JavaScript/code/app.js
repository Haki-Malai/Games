window.addEventListener('load', ()=>{
    let sudoku = document.querySelector('#sudoku')
    var blocks = []
    let fixLeft = 0
    for(let i = 0; i<9; i++){
        for(let j =0; j<9; j++){
            if(((j==8)&&(i==8))){
                sudoku.innerHTML += "<div id = \'block[" + i + "," + j + "]\'class=\'block bottomBlock sideBlock\'></div>"
            }else if(j == 8){
                sudoku.innerHTML += "<div id = \'block[" + i + "," + j + "]\'class=\'block bottomBlock\'></div>"
            }else if(i== 8){
                sudoku.innerHTML += "<div id = \'block[" + i + "," + j + "]\'class=\'block sideBlock\'></div>"
            }
            else{
                sudoku.innerHTML += "<div id = \'block[" + i + "," + j + "]\'class=\'block\'></div>"
            }
            blocks[i,j,0] = 0
            blocks[i,j,1] = document.getElementById('block['+i+','+j+']')
            blocks[i,j,1].style.position = 'absolute'
            blocks[i,j,1].style.left = fixLeft*4+'em'
            blocks[i,j,1].style.top = j*4+'em'
            if(j % 3 == 0){
                blocks[i,j,1].style.borderTopWidth = '0.3em'
            }else{
                blocks[i,j,1].style.borderTopWidth = '0.15em'
            }
            if(i % 3 == 0){
                blocks[i,j,1].style.borderLeftWidth = '0.3em'
            }else{
                blocks[i,j,1].style.borderLeftWidth = '0.15em'
            }
        }
        fixLeft = fixLeft + 1
    }
})
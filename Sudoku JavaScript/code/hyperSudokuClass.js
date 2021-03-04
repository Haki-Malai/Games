const clone = [...grid]

function sample(arr, size){
    var shuffled = arr.slice(0), i = arr.length, temp, index
    while (i--){
        index = Math.floor((i + 1) * Math.random())
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
    }
    return shuffled.slice(0, size)
}
Math.floor(Math.random() * 10)     // returns a random integer from 0 to 9

class HyperSudoku{
    constructor(){}
    solve(grid){
        values = HyperSudoku.create_vertex(grid)
        graph = values[0]
        boxes = values[1]
        head = values[2]

        HyperSudoku.create_edge(graph, boxes)

        boo = HyperSudoku.solvev(head)
        if (boo){
            cur = head
            while (cur != false){
                (i, j) = cur.xy
                value = cur.value
                grid[i][j] = value
                cur = cur.next
            }
            return grid
        } else{
            return false
        }
    }
    create_vertex(grid){
        boxes = []
        for(let i = 0; i < 13; i++){
            boxes.push([])
        }

        graph = []
        for(let i = 0; i < 13; i++){
            graph.push([])
            for(let j = 0; j < 9; j++){
                graph[i].push(false)
            }
        }
        //initiate linked list
        head = false
        cur = false

        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                //create a vertex
                value = grid[i][j]
                vertex = HyperSudoku.Vertex(value)
                vertex.xy = (i, j)
                graph[i][j] = vertex

                //link the unassigned vertex
                if(value == 0){
                    if(!(head)){
                        head = vertex
                        cur = vertex
                    }else{
                        cur.nextv = vertex
                        cur = vertex
                    }
                }
                // put the vertex in one of the regular boxes
                box_num = -1
                if(0 <= i <= 2){
                    if(0 <= j <= 2){
                        box_num = 0
                    }else if(3 <= j <= 5){
                        box_num = 1
                    }else{
                        box_num = 2
                    }
                }else if(3 <= i <= 5){
                    if(0 <= j <= 2){
                        box_num = 3
                    }else if(3 <= j <= 5){
                        box_num = 4
                    }else{
                        box_num = 5
                    }
                }else{
                    if(0 <= j <= 2){
                        box_num = 6
                    }else if(3 <= j <= 5){
                        box_num = 7
                    }else{
                        box_num = 8
                    }
                }
                boxes[box_num].push(vertex)
                vertex.box_nums.add(box_num)
            }
        }
    }

}
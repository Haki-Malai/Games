const clone=[...grid]

function sample(arr, size){
    var shuffled=arr.slice(0), i=arr.length, temp, index
    while (i--){
        index=Math.floor((i + 1) * Math.random())
        temp=shuffled[index]
        shuffled[index]=shuffled[i]
        shuffled[i]=temp
    }
    return shuffled.slice(0, size)
}
Math.floor(Math.random() * 10)     // returns a random integer from 0 to 9

class HyperSudoku{
    constructor(){}
    solve(grid){
        values=HyperSudoku.create_vertex(grid)
        graph=values[0]
        boxes=values[1]
        head=values[2]

        HyperSudoku.create_edge(graph, boxes)

        boo=HyperSudoku.solvev(head)
        if(boo){
            cur=head
            while (cur != false){
                (i, j)=cur.xy
                value=cur.value
                grid[i][j]=value
                cur=cur.next
            }
            return grid
        } else{
            return false
        }
    }
    create_vertex(grid){
        boxes=[]
        for(let i=0; i < 13; i++){
            boxes.push([])
        }

        graph=[]
        for(let i=0; i < 13; i++){
            graph.push([])
            for(let j=0; j < 9; j++){
                graph[i].push(false)
            }
        }
        //initiate linked list
        head=false
        cur=false

        for(let i=0; i < 9; i++){
            for(let j=0; j < 9; j++){
                //create a vertex
                value=grid[i][j]
                vertex=HyperSudoku.Vertex(value)
                vertex.xy=(i, j)
                graph[i][j]=vertex

                //link the unassigned vertex
                if(value == 0){
                    if(!(head)){
                        head=vertex
                        cur=vertex
                    }else{
                        cur.nextv=vertex
                        cur=vertex
                    }
                }
                // put the vertex in one of the regular boxes
                box_num=-1
                if(0<=i<=2){
                    if(0<=j<=2){
                        box_num=0
                    }else if(3<=j<=5){
                        box_num=1
                    }else{
                        box_num=2
                    }
                }else if(3<=i<=5){
                    if(0<=j<=2){
                        box_num=3
                    }else if(3<=j<=5){
                        box_num=4
                    }else{
                        box_num=5
                    }
                }else{
                    if(0<=j<=2){
                        box_num=6
                    }else if(3<=j<=5){
                        box_num=7
                    }else{
                        box_num=8
                    }
                }
                boxes[box_num].push(vertex)
                vertex.box_nums.add(box_num)
                //put the vertex in an additional box ifneeded
                if((1<=i<=3)&&(1<=j<=3)){
                    box_num=9
                }else if((5<=i<=7)&&(1<=j<=3)){
                    box_num=10
                }else if((1<=i<=3)&&(5<=j<=7)){
                    box_num=11
                }else if((5<=i<=7)&&(5<=j<=7)){
                    box_num=12
                }
                if(box_num>=9){
                    boxes[box_num].push(vertex)
                    vertex.box_nums.add(box_num)
                }
            }
        }
        return [graph, boxes, head]
    }
    solvev(vertex){
        adjacent_value=set()
        for(let i=0;i<vertex.adjacent_vertices.length;i++){
            adjacent_value.add(vertex.adjacent_vertices[i].value)
        }
        all_options=[1,2,3,4,5,6,7,8,9]
        options=all_options.difference(adjacent_value)
        //try for each option
        while(options.length>0){
            value=options.pop()
            vertex.value=value
            //if got an answer, return true
            if ((!(vertex.nextv))||(HyperSudoku.solvev(vertex.nextv))){
                return true
            }
            //otherwise try another solution
        }
        //if all options dont work, recover the value to 0 and backtrack
        vertex.value=0
        return false
    }
}

class Vertex{
    constructor(this,value){
        this.value=value
        this.adjacent_vertices=set()
        this.box_nums=set()
        this.nextv=false
        this.xy=false
    }
    connect(self,vertex){
        this.adjacent_vertices.add(vertex)
        vertex.adjacent_vertices.add(self)
    }
}
function set(arr) {
    var seen={}, result=[];
    var len=arr.len;
    for (var i=0; i < len; i++) {
      var el=arr[i];
      if (!seen[el]) {
        seen[el]=true;
        result.push(el);
      }
    }
    return result;
}
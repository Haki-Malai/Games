//First thing is to set the values. We set them here so they are global and we don't have to pass them every time.
//MAGIC NUMBERS, they set the first position relative to screen size!
//this number is how much each element will get moved in every loop below
const PXS_MOVE = 2.79375
//boxes are 89.40000000000005*89.40000000000005 pxs
const ONE_BOX = 89.40000000000005
//element of box should be given at this value (points, powerups, ghosts...)
const PXS_COLLAPSED = 75.43125000000003
//this calculates where the points,fruits,buffs/nerfs will be placed depending pacman's position
const FIRST_POINT_LEFT = -859//corner of map
const FIRST_POINT_TOP = -898//corner of map
const FIRST_GHOST_LEFT = 102
const FIRST_GHOST_TOP = 505.8
const FIRST_HEART_LEFT = 575
//pac man got 2 cordinates: x & y that change with him moving boxes. Every bot of this array condains a value whitch tells the pacman what way he can move.
//For example if the box we are in hold the "A" value we cannot move up and down.
const collisionDetector = [ //31x30
    [" " ," " ," " ," " ," " ," " ," " ,"G1","A" ,"A" ,"A" ,"A" ,"A" ,"G2","P1","G1","A" ,"A" ,"A" ,"A" ,"A" ,"G2"," " ," " ," " ," " ," " ," " ," " ,],
    [" " ," " ," " ," " ," " ," " ," " ,"B" ,"G1","A" ,"A" ,"A" ,"A" ,"K" ,"O" ,"K" ,"A" ,"A" ,"A" ,"A" ,"G2","B" ," " ," " ," " ," " ," " ," " ," " ,],
    [" " ," " ," " ," " ," " ," " ," " ,"B" ,"G4","A" ,"A" ,"P" ,"A" ,"G2","B" ,"G1","A" ,"P" ,"A" ,"A" ,"G3","B" ," " ," " ," " ," " ," " ," " ," " ,],
    [" " ," " ," " ," " ," " ," " ," " ,"L" ,"A" ,"A" ,"G2","L" ,"G2","B" ,"B" ,"B" ,"G1","R" ,"G1","A" ,"A" ,"R" ," " ," " ," " ," " ," " ," " ," " ,],
    [" " ," " ," " ," " ," " ," " ," " ,"B" ,"G1","G2","B" ,"B" ,"B" ,"B" ,"B" ,"B" ,"B" ,"B" ,"B" ,"G1","G2","B" ," " ," " ," " ," " ," " ," " ," " ,],
    [" " ," " ," " ," " ," " ," " ," " ,"B" ,"B" ,"B" ,"B" ,"B" ,"L" ,"G3","B" ,"G4","R" ,"B" ,"B" ,"B" ,"B" ,"B" ," " ," " ," " ," " ," " ," " ," " ,],
    ["G1","A" ,"A" ,"A" ,"A" ,"G2","G1","K" ,"G3","B" ,"B" ,"B" ,"G4","A" ,"O" ,"A" ,"G3","B" ,"B" ,"B" ,"G4","K" ,"G2","G1","A" ,"A" ,"A" ,"A" ,"G2",],
    ["B" ,"G1","A" ,"A" ,"G2","B" ,"B" ,"G1","A" ,"G3","G4","K" ,"P" ,"G2","B" ,"G1","P" ,"K" ,"G3","G4","A" ,"G2","B" ,"B" ,"G1","A" ,"A" ,"G2","B" ,],
    ["B" ,"L" ,"A" ,"G2","B" ,"B" ,"B" ,"B" ,"G1","A" ,"A" ,"G2","B" ,"B" ,"B" ,"B" ,"B" ,"G1","A" ,"A" ,"G2","B" ,"B" ,"B" ,"B" ,"G1","A" ,"R" ,"B" ,],
    ["B" ,"L" ,"G2","B" ,"B" ,"B" ,"B" ,"B" ,"L" ,"A" ,"A" ,"R" ,"B" ,"B" ,"B" ,"B" ,"B" ,"L" ,"A" ,"A" ,"R" ,"B" ,"B" ,"B" ,"B" ,"B" ,"G1","R" ,"B" ,],
    ["B" ,"B" ,"B" ,"G4","K" ,"G3","L" ,"R" ,"L" ,"A" ,"A" ,"R" ,"B" ,"B" ,"B" ,"B" ,"B" ,"L" ,"A" ,"A" ,"R" ,"L" ,"R" ,"G4","K" ,"G3","B" ,"B" ,"B" ,],
    ["L" ,"G3","G4","A" ,"A" ,"A" ,"G3","G4","R" ,"G1","G2","B" ,"G4","G3","B" ,"G4","G3","B" ,"G1","G2","L" ,"G3","G4","A" ,"A" ,"A" ,"G3","G4","R" ,],
    ["B" ,"G1","A" ,"A" ,"A" ,"G2","G1","G2","B" ,"B" ,"B" ,"G4","A" ,"A" ,"K" ,"A" ,"A" ,"G3","B" ,"B" ,"B" ,"G1","G2","G1","A" ,"A" ,"A" ,"G2","B" ,],
    ["B" ,"L" ,"A" ,"A" ,"A" ,"G3","B" ,"B" ,"G4","G3","B" ,"G1","A" ,"A" ,"A" ,"A" ,"A" ,"G2","B" ,"G4","G3","B" ,"B" ,"G4","A" ,"A" ,"A" ,"R" ,"B" ,],
    ["B" ,"G4","A" ,"A" ,"A" ,"A" ,"G3","L" ,"A" ,"A" ,"K" ,"G3"," " ," " ," " ," " ," " ,"G4","K" ,"A" ,"A" ,"R" ,"G4","A" ,"A" ,"A" ,"A" ,"G3","B" ,],
    ["L1","A" ,"A" ,"A" ,"A" ,"A" ,"A" ,"O" ,"A" ,"A" ,"A" ,"A" ,"A" ,"A" ,"A" ,"A" ,"A" ,"A" ,"A" ,"A" ,"A" ,"O" ,"A" ,"A" ,"A" ,"A" ,"A" ,"A" ,"R1",],
    ["B" ,"G1","A" ,"A" ,"A" ,"A" ,"G2","L" ,"A" ,"A" ,"P" ,"G2"," " ," " ," " ," " ," " ,"G1","P" ,"A" ,"A" ,"R" ,"G1","A" ,"A" ,"A" ,"A" ,"G2","B" ,],
    ["B" ,"L" ,"A" ,"A" ,"A" ,"G2","B" ,"B" ,"G1","G2","B" ,"G4","A" ,"A" ,"A" ,"A" ,"A" ,"G3","B" ,"G1","G2","B" ,"B" ,"G1","A" ,"A" ,"A" ,"R" ,"B" ,],
    ["B" ,"G4","A" ,"A" ,"A" ,"G3","G4","G3","B" ,"B" ,"B" ,"G1","A" ,"A" ,"P" ,"A" ,"A" ,"G2","B" ,"B" ,"B" ,"G4","G3","G4","A" ,"A" ,"A" ,"G3","B" ,],
    ["L" ,"G2","G1","A" ,"A" ,"A" ,"G2","G1","R" ,"G4","G3","B" ,"G1","G2","B" ,"G1","G2","B" ,"G4","G3","L" ,"G2","G1","A" ,"A" ,"A" ,"G2","G1","R" ,],
    ["B" ,"B" ,"B" ,"G1","P" ,"G2","L" ,"R" ,"L" ,"A" ,"A" ,"R" ,"B" ,"B" ,"B" ,"B" ,"B" ,"L" ,"A" ,"A" ,"R" ,"L" ,"R" ,"G1","P" ,"G2","B" ,"B" ,"B" ,],
    ["B" ,"L" ,"G3","B" ,"B" ,"B" ,"B" ,"B" ,"L" ,"A" ,"A" ,"R" ,"B" ,"B" ,"B" ,"B" ,"B" ,"L" ,"A" ,"A" ,"R" ,"B" ,"B" ,"B" ,"B" ,"B" ,"G4","R" ,"B" ,],
    ["B" ,"L" ,"A" ,"G3","B" ,"B" ,"B" ,"B" ,"G4","A" ,"A" ,"G3","B" ,"B" ,"B" ,"B" ,"B" ,"G4","A" ,"A" ,"G3","B" ,"B" ,"B" ,"B" ,"G4","A" ,"R" ,"B" ,],
    ["B" ,"G4","A" ,"A" ,"G3","B" ,"B" ,"G4","A" ,"G2","G1","P" ,"K" ,"G3","B" ,"G4","K" ,"P" ,"G2","G1","A" ,"G3","B" ,"B" ,"G4","A" ,"A" ,"G3","B" ,],
    ["G4","A" ,"A" ,"A" ,"A" ,"G3","G4","P" ,"G2","B" ,"B" ,"B" ,"G1","A" ,"O" ,"A" ,"G2","B" ,"B" ,"B" ,"G1","P" ,"G3","G4","A" ,"A" ,"A" ,"A" ,"G3",],
    [" " ," " ," " ," " ," " ," " ," " ,"B" ,"B" ,"B" ,"B" ,"B" ,"L" ,"G2","B" ,"G1","R" ,"B" ,"B" ,"B" ,"B" ,"B" ," " ," " ," " ," " ," " ," " ," " ,],
    [" " ," " ," " ," " ," " ," " ," " ,"B" ,"G4","G3","B" ,"B" ,"B" ,"B" ,"B" ,"B" ,"B" ,"B" ,"B" ,"G4","G3","B" ," " ," " ," " ," " ," " ," " ," " ,],
    [" " ," " ," " ," " ," " ," " ," " ,"L" ,"A" ,"A" ,"G3","L" ,"G3","B" ,"B" ,"B" ,"G4","R" ,"G4","A" ,"A" ,"R" ," " ," " ," " ," " ," " ," " ," " ,],
    [" " ," " ," " ," " ," " ," " ," " ,"B" ,"G1","A" ,"A" ,"K" ,"A" ,"G3","B" ,"G4","A" ,"K" ,"A" ,"A" ,"G2","B" ," " ," " ," " ," " ," " ," " ," " ,],
    [" " ," " ," " ," " ," " ," " ," " ,"B" ,"G4","A" ,"A" ,"A" ,"A" ,"P" ,"O" ,"P" ,"A" ,"A" ,"A" ,"A" ,"G3","B" ," " ," " ," " ," " ," " ," " ," " ,],
    [" " ," " ," " ," " ," " ," " ," " ,"G4","A" ,"A" ,"A" ,"A" ,"A" ,"G3","K1","G4","A" ,"A" ,"A" ,"A" ,"A" ,"G3"," " ," " ," " ," " ," " ," " ," " ,],
    [" " ," " ," " ," " ," " ," " ," " ,"P" ,"P" ,"P" ,"P" ,"P" ,"P" ,"P" ,"B" ,"P" ,"P" ,"P" ,"P" ,"P" ,"P" ,"P" ," " ," " ," " ," " ," " ," " ," " ,]
]
var x = 14, y = 15
var points = [ //31x30
    [0,0,0,0,0,0,0,7,1,1,1,1,1,1,1,1,1,1,1,1,1,7,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,7,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
    [7,1,1,1,1,1,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,1,1,1,1,1,7,],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
    [1,1,1,1,1,1,1,7,1,1,1,1,1,1,1,1,1,1,1,1,1,7,1,1,1,1,1,1,1,],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
    [1,1,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,1,1,1,1,1,1,1,1,1,1,1,7,1,1,],
    [1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
    [1,1,1,1,1,1,1,1,7,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
    [1,1,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,1,1,],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
    [1,1,1,1,1,1,1,1,7,1,1,1,1,1,1,1,1,1,1,1,1,7,1,1,1,1,1,1,1,],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
    [7,1,1,1,1,1,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,1,1,1,1,1,7,],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,7,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,7,1,1,1,1,1,1,1,1,1,1,1,1,1,7,0,0,0,0,0,0,0,],
]
//this array is for the ghosts to find their way back home
var wayToPrison = [ //31x30
    [99,99,99,99,99,99,99,36,37,38,39,40,41,42,43,42,41,40,39,38,37,36,99,99,99,99,99,99,99,],
    [99,99,99,99,99,99,99,33,47,47,46,45,44,43,42,43,44,45,46,47,47,33,99,99,99,99,99,99,99,],
    [99,99,99,99,99,99,99,32,46,45,44,43,44,43,41,43,44,43,44,45,46,32,99,99,99,99,99,99,99,],
    [99,99,99,99,99,99,99,31,32,33,34,42,41,42,40,42,41,42,34,33,32,31,99,99,99,99,99,99,99,],
    [99,99,99,99,99,99,99,30,31,30,35,42,40,41,38,41,40,42,35,30,31,30,99,99,99,99,99,99,99,],
    [99,99,99,99,99,99,99,29,30,29,36,41,39,40,37,40,39,41,36,29,30,29,99,99,99,99,99,99,99,],
    [22,23,24,25,26,27,27,28,29,28,37,40,38,37,36,37,38,40,37,28,29,28,27,27,26,25,24,23,22,],
    [21,22,23,24,25,28,26,25,26,27,38,39,40,41,35,41,40,39,38,27,26,25,26,28,25,24,23,22,21,],
    [20,21,22,23,26,29,25,24,23,24,25,26,41,42,34,42,41,26,25,24,23,24,25,29,26,23,22,21,20,],
    [19,20,21,24,27,28,24,22,23,22,23,24,25,42,43,42,25,24,23,22,23,22,24,28,27,24,21,20,19,],
    [18,19,22,25,26,27,23,22,21,22,23,24,43,44,32,44,43,24,23,22,21,22,23,27,26,25,22,19,18,],
    [17,18,23,24,25,25,24,21,20,14,13,26,44,45,31,45,44,26,13,14,20,21,24,25,25,24,23,18,17,],
    [16,19,20,22,25,23,10,9 ,19,16,12,27,28,29,30,29,28,27,12,16,19,9 ,10,23,22,21,20,19,18,],
    [15,18,19,20,21,22,11,8 ,18,17,11,12,13,14,15,14,13,12,11,17,18,8 ,11,22,21,20,19,18,15,],
    [14,17,16,15,14,13,12,7 ,8 ,9 ,10,11,99,99,99,99,99,11,10,9 ,8 ,7 ,12,13,14,15,16,17,14,],
    [13,12,11,10,9 ,8 ,7 ,6 ,5 ,4 ,3 ,2 ,1 ,1 ,1 ,1 ,1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,10,11,12,13,],
    [14,17,16,15,14,13,12,7 ,8 ,9 ,10,11,0 ,0 ,0 ,0 ,0 ,11,10,9 ,8 ,7 ,12,13,14,15,16,17,14,],
    [15,18,19,20,21,22,11,8 ,18,17,11,12,13,14,15,14,13,12,11,17,18,8 ,11,22,21,20,19,18,15,],
    [16,19,20,21,22,23,10,9 ,19,16,12,27,28,29,30,29,28,27,12,16,19,9 ,10,23,22,21,20,19,18,],
    [17,18,23,24,25,25,24,21,20,14,13,26,44,45,31,45,44,26,13,14,20,21,24,25,25,24,23,18,17,],
    [18,19,22,25,26,27,23,22,21,22,23,24,43,44,32,44,43,24,23,22,21,22,23,27,26,25,22,19,18,],
    [19,20,21,24,27,28,24,22,23,22,23,24,25,42,43,42,25,24,23,22,23,22,24,28,27,24,21,20,19,],
    [20,21,22,23,26,29,25,24,23,24,25,26,41,42,34,42,41,26,25,24,23,24,25,29,26,23,22,21,20,],
    [21,22,23,24,25,28,26,25,26,27,38,39,40,41,35,41,40,39,38,27,26,25,26,28,25,24,23,22,21,],
    [22,23,24,25,26,27,27,28,29,28,37,40,38,37,36,37,38,40,37,28,29,28,27,27,26,25,24,23,22,],
    [99,99,99,99,99,99,99,29,30,29,36,41,39,40,37,40,39,41,36,29,30,29,99,99,99,99,99,99,99,],
    [99,99,99,99,99,99,99,30,31,30,35,42,40,41,38,41,40,42,35,30,31,30,99,99,99,99,99,99,99,],
    [99,99,99,99,99,99,99,31,32,33,34,42,41,42,40,42,41,42,34,33,32,31,99,99,99,99,99,99,99,],
    [99,99,99,99,99,99,99,32,46,45,44,43,44,43,41,43,44,43,44,45,46,32,99,99,99,99,99,99,99,],
    [99,99,99,99,99,99,99,33,47,47,46,45,44,43,42,43,44,45,46,47,47,33,99,99,99,99,99,99,99,],
    [99,99,99,99,99,99,99,36,37,38,39,40,41,42,43,42,41,40,39,38,37,36,99,99,99,99,99,99,99,],
]
//here i count all the points
var leftToEat = 0
for (let i = 0; i < 31; i++){
    for (let j = 0; j < 30; j++){
        if (points[i][j] == 1){
            leftToEat = leftToEat + 1
        }
    }
}
// in this array we will set every css left value of every point
var pointLeft = [ //31x30
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
]
// in this array we will set every css top value of every point
var pointTop = [ //31x30
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
]
// here we have an array of html id names as string values
var pointId = [ //31x30
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
]
var i = 15, j = 14 
//starting position of pacman on the upper arrays
//he have 4 ghosts that move
//these arrays help the code be lesser in lines because we use loops!
//i think i do not have to explain what each array does...it's similar with the pacman values but there are 4 of them, one for each ghost, and they are packet in arrays :D!
var color = ["Red", "Yellow", "Blue", "Pink","Red", "Yellow", "Blue", "Pink"]
var ghostId = ['RedGhost', 'YellowGhost', 'BlueGhost', 'PinkGhost','RedGhost2', 'YellowGhost2', 'BlueGhost2', 'PinkGhost2']
var ghostDirection = ["Right", "Left", "Right", "Left", "Right", "Left","Right", "Left"]
var directions = ["Right", "Left", "Up", "Down",]
var horizontalDirections = ["Right", "Left",]
var verticalDirections = ["Up", "Down",]
var decidedODirection = [false, false, false, false, false, false, false, false,]
var ghostX = [12, 13, 14, 15, 12, 13, 14, 15,]
var ghostY = [15, 15, 15, 15, 15, 15, 15, 15,]
var ghostValueTop = [0,0,0,0,0,0,0,0]
var ghostValueLeft = [0,0,0,0,0,0,0,0]
var ghostAlive = [true,true,true,true,true,true,true,true]
var ghostStyleTop = [FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP]
var ghostStyleLeft = [FIRST_GHOST_LEFT + ONE_BOX, FIRST_GHOST_LEFT + 2*ONE_BOX, FIRST_GHOST_LEFT + 3*ONE_BOX, FIRST_GHOST_LEFT + 4*ONE_BOX, FIRST_GHOST_LEFT + 2*ONE_BOX, FIRST_GHOST_LEFT + 5*ONE_BOX, FIRST_GHOST_LEFT + 5*ONE_BOX, FIRST_GHOST_LEFT + 3*ONE_BOX,]
var prisonX = [0,1,2,3,1,4,4,2]
//is the ghost in prison? Should i set him free? We will find out...
var ghostInPrison = [true,true,true,true,true,true,true,true]
//there is no prison in the collisionDetector array! That's how this array comes to play...
var prison = ['L','A','A','A','R']
//here i store intervals
var gInvernal = ['','','','']

for(let i = 0; i < 5; i++){ //finds random places to place the multipliers,buffs,nerfs in the array
    for(let j = 0; j < 2; j++){
        do{
            var z = Math.floor(Math.random() * 31)
            var s = Math.floor(Math.random() * 30)
            
            if (points[z][s] == 1){
                points[z][s] = i + 2
            }
            var before = points[z][s]
        }while(points[z][s] != before)//the value MUST be different from before so for example a multiplier dont overwrite another multiplier
    }
}
//these values will let us know how much in pixels pacman moved
//every ONE_BOX pixels this is going to get reset because we traveled in the arrays
//meaning that the map is calculated as a number of ONE_BOXpx*ONE_BOXpx boxes!
var valueOfLeft = 0, valueOfTop = 0
var waitFree = ['','','','']
//score counting, multipliers, nerfs and buffs
var score = 0, multiplier = 1, multiplierTimout, lives = 3, powerUpTimout, powerUp = 'none', movingActive, waitDeath
//actual direction is movingDirecton.
//-But what if i wish to go somewhere else...
//-We are gonna change the movingDirection!
//-But what if i wish to go left and there is a wall in my left...
//-Good point! We are going to save your wished direction in wishedDirection and when there isn't a wall THEN we will change the movingDirection to wishedDirection unless they are the same!
//-Sound great! Let's do this!
var movingDirection = 'Right', wishedDirection = 'Right'
class element{//This class makes an element that can position it self, show self and hide self
    constructor(id, top, left){
        this.id = id
        this.top = top
        this.left = left
    }
    position(){
        this.id.style.top = this.top + "px"
        this.id.style.left = this.left + "px"
    }
    show(){
        this.id.style.opacity = '100%'
    }
    hide(){
        this.id.style.opacity = '0'
    }
}
var click, maze, pacman, menu, intro //We want these globally.

//we start at 1 depending on events we change the speed easily
var ghostSpeed = 1
window.addEventListener('load',function(){ //We position the main elements in the center of the screen, this calculates where it is
    intro = {//This is just the starting animation
        myName : document.getElementById('MyName'),
        top : $(window).height()/2 - 40,
        left : $(window).width()/2 - 370,
        madeBy : document.getElementById('MadeBy'),
        h : document.getElementById('H'),
        a : document.getElementById('A'),
        k : document.getElementById('K'),
        i : document.getElementById('I'),
        m : document.getElementById('M'),
        a2 : document.getElementById('A2'),
        l : document.getElementById('L'),
        a3 : document.getElementById('A3'),
        i2 : document.getElementById('I2'),
        pac : document.getElementById('Pac'),
        dash : document.getElementById('Dash'),
        man : document.getElementById('Man'),
        start : document.getElementById('Start'),
        options : document.getElementById('Options'),
        exit : document.getElementById('Exit'),
        t : document.getElementById('T'),
        io : document.getElementById('IO'),
        x : document.getElementById('X'),
        show(){
            this.myName.style.opacity = '100%'
            this.myName.style.top = this.top + "px"
            this.myName.style.left = this.left + "px"
        },
        go(){
            this.madeBy.style.animation = "WelcomeMadeBy 1s 1"
            this.h.style.animation = "WelcomeH 1.2s 1"
            this.a.style.animation = "WelcomeA 1.1s 1"
            this.k.style.animation = "WelcomeH 0.9s 1"
            this.i.style.animation = "WelcomeA 1.5s 1"
            this.m.style.animation = "WelcomeH 1.4s 1"
            this.a2.style.animation = "WelcomeA 1.3s 1"
            this.l.style.animation = "WelcomeH 1.6s 1"
            this.a3.style.animation = "WelcomeA 0.8s 1"
            this.i2.style.animation = "WelcomeH 1.7s 1"
        },
        bye(){
            this.h.style.animation = "ByeH 1.8s 0.5s 1"
            this.a.style.animation = "ByeA 1.9s 0.5s 1"
            this.k.style.animation = "ByeH 1.7s 0.5s 1"
            this.i.style.animation = "ByeA 2.3s 0.5s 1"
            this.m.style.animation = "ByeH 2.1s 0.5s 1"
            this.a2.style.animation = "ByeA 1.8s 0.5s 1"
            this.l.style.animation = "ByeH 1.8s 0.5s 1"
            this.a3.style.animation = "ByeA 1.7s 0.5s 1"
            this.i2.style.animation = "ByeH 1.6s 0.5s 1"
            this.madeBy.style.animation = "ByeMadeBy 1.6s 0.5s 1"
        },
        hide(){
            this.myName.style.opacity = '0%'
        }
    }
    menu = {//this is menu animations, and add listeners methods
        pac : document.getElementById("Pac"),
        dash : document.getElementById("Dash"),
        man : document.getElementById("Man"),
        start : document.getElementById("Start"),
        options : document.getElementById("Options"),
        exit : document.getElementById("Exit"),
        x : document.getElementById("X"),
        io : document.getElementById("IO"),
        t : document.getElementById("T"),
        top: $(window).height()/2,
        left: $(window).width()/2,
        show(){
            this.pac.style.opacity = '100%'
            this.dash.style.opacity = '100%'
            this.man.style.opacity = '100%'
            this.start.style.opacity = '100%'
            this.options.style.opacity = '100%'
            this.exit.style.opacity = '100%'
        },
        hide(){
            this.pac.style.opacity = '0'
            this.dash.style.opacity = '0'
            this.man.style.opacity = '0'
            this.start.style.opacity = '0'
            this.options.style.opacity = '0'
            this.exit.style.opacity = '0'
        },
        welcome(){
            this.pac.style.animation = "WelcomePac 1s 1, updown 0.5s 1.3s infinite, CloseEye 10s 2s infinite"
            this.dash.style.animation = "WelcomeDash 1.4s 1, updown 0.5s 1.3s infinite"
            this.man.style.animation = "WelcomeMan 1s 1, updown 0.5s 1.3s infinite"
            this.start.style.animation = "Welcome 1s 1, Lighting 4s linear infinite, updown 2.5s 1.5s infinite"
            this.options.style.animation = "WelcomeOptions 1s 1, Lighting 5s linear infinite, updown 2.5s 1.5s infinite"
            this.exit.style.animation = "Welcome 1s 1, Lighting 4s linear infinite, updown 2.5s 1.5s infinite"
        },
        ready(){
            this.start.addEventListener("click", ()=> menu.bye())
            this.start.addEventListener("mouseover", ()=> this.start.style.animation = "WhenHover 0.4s infinite, Lighting 0s 0s infinite, updown 0s 0s infinite")
            this.options.addEventListener("mouseover", ()=> this.options.style.animation = "WhenHover 0.4s infinite, Lighting 0s 0s infinite, updown 0s 0s infinite ")
            this.exit.addEventListener("mouseover", ()=> this.exit.style.animation = "WhenHover 0.4s infinite, Lighting 0s 0s infinite, updown 0s 0s infinite")
            this.start.addEventListener("mouseout", ()=> this.start.style.animation = "Lighting 4s linear infinite, updown 2.5s infinite")
            this.options.addEventListener("mouseout", ()=> this.options.style.animation = "Lighting 4s linear infinite, updown 2.5s infinite")
            this.exit.addEventListener("mouseout", ()=> this.exit.style.animation = "Lighting 4s linear infinite, updown 2.5s infinite")
            this.x.style.animation = "onoff 12s 2s infinite"
            this.io.style.animation = "onoff 2s 2s infinite"
            this.t.style.animation = "onoff 5s 2s infinite"
        },
        bye(){
            this.start.style.animation = "Lighting 0s 0, updown 0s 0 WhenHover 0s 0, Lighting 0s 0, updown 0s 0"
            this.pac.style.animation = "ByePac 1s 0.5s 1"
            this.dash.style.animation = "ByeDash 1s 0.2s 1"
            this.man.style.animation = "ByeMan 1s 0.5s 1"
            this.start.style.animation = "ByeStart 1s 0.2s 1"
            this.options.style.animation = "ByeOptions 1s 0.2s 1"
            this.exit.style.animation = "ByeExit 1s 0.2s 1"
            setTimeout(()=> menu.hide(), 1200)
            setTimeout(()=> startGame(), 1300)
        }
    }
    function introduction(){//start animations and show menu after
        click.hide()
        intro.show()
        intro.go()
        setTimeout(()=> intro.bye(),2000)
        setTimeout(()=> intro.hide(),3500)
        setTimeout(()=> menu.show(),4000)
        setTimeout(()=> menu.welcome(),4000)
        setTimeout(()=> menu.ready(),5000)
    }
    //We position the main elements in the center of the screen, that's why we have to use position relative.
    click = new element(document.getElementById("Click"),  365, 360)
    maze = new element(document.getElementById("maze"), -1562, -930)
    pacman = new element(document.getElementById("pacman"), -120, 375)
    window.addEventListener("click", introduction, { once: true })//Call introduction function
    intro.hide()
    menu.hide()
    //game functionality is here
    function startGame(){
        //this is the score holder line 
        blackLine = document.getElementById("BlackLine")
        click.show()
        //on click start moving
        window.addEventListener("click", function(){
            click.hide()
            movingActive = setInterval(moving,10)
            for (let c = 0; c < 8; c++){
                clearTimeout(waitFree[c])
                waitFree[c] = setTimeout(function(){ghostInPrison[c] = false},5000)
            }
        },{once : true})
        //this event listener changes the wishedDirection so the moving function changes the direction when it's possible
        //the \u03B4like are the greek letters so the user doesn't have to change the language to play the game
        window.addEventListener('keydown', function(press){
            if ((press.key == 'd')||(press.key == 'D')||(press.key == '\u03B4')||(press.key == '\u0394')||(press.keyCode == '39')){
                wishedDirection = 'Right'
            }else if ((press.key == 'a')||(press.key == 'A')||(press.key == '\u0391')||(press.key == '\u03B1')||(press.keyCode == '37')){
                wishedDirection = 'Left'
            }else if ((press.key == 's')||(press.key == 'S')||(press.key == '\u03A3')||(press.key == '\u03C3')||(press.keyCode == '40')){
                wishedDirection = 'Down'
            }else if ((press.key == 'w')||(press.key == 'W')||(press.key == '\u03C2')||(press.keyCode == '38')){
                wishedDirection = 'Up'
            }
        })
        //setting opacity to 100%
        pacman.id.style.opacity = '100%'
        maze.id.style.opacity = '100%'
        blackLine.style.opacity = '100%'
        //StyleLeft, StyleTop and valueOfTop, valueOfLeft!
        //'Style' variables are the ACTUAL css style values but 'value' variables is the value of how close in px is the pac to the OTHER 'box'
        //here we set the ccs left & top of our html elements
        maze.id.style.left = maze.left + "px"
        maze.id.style.top = maze.top + "px"
        pacman.id.style.left = pacman.left + "px"
        pacman.id.style.top = pacman.top + "px"
    

        //setting the lives
        repositionHearts()// this array sets if there is a point in the box we are in
        // this array sets if there is a point in the box we are in
        // this loop creates the html elements of every point, fruit, nerf and buff by reading its value on the points array
        //2 for cherry 3 for banana 4 for strawberry 5 for orange 6 for pear 7 for eat ghosts ability
        for (let m = 0; m < 31; m++){
            for (let k = 0; k < 30; k++){
                if (points[m][k] != 0){
                    document.getElementById('Points').innerHTML += "<div id = \"Point [" + m + '][' + k + "]\"></div>"
                    pointId[m][k] = "Point [" + m + '][' + k + "]"
                    pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX
                    pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX
                    document.getElementById(pointId[m][k]).style.position = 'absolute'
                    document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                    document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                    document.getElementById(pointId[m][k]).style.zIndex = '1'
                    document.getElementById(pointId[m][k]).style.backgroundRepeat = 'no-repeat'
                    document.getElementById(pointId[m][k]).style.backgroundSize = 'contain'
                    if (points[m][k] == 1 ){
                        document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Point.png")'
                        document.getElementById(pointId[m][k]).style.height = '12px'
                        document.getElementById(pointId[m][k]).style.width = '12px'
                    }else if (points[m][k] == 2 ){
                        pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX - 20
                        document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                        pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 20
                        document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                        document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Cherry.png")'
                        document.getElementById(pointId[m][k]).style.height = '40px'
                        document.getElementById(pointId[m][k]).style.width = '40px'
                    }else if (points[m][k] == 3 ){
                        pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX - 16
                        document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                        pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 16
                        document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                        document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Banana.png")'
                        document.getElementById(pointId[m][k]).style.height = '40px'
                        document.getElementById(pointId[m][k]).style.width = '40px'
                    }else if (points[m][k] == 4 ){
                        pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX - 16
                        document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                        pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 16
                        document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                        document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Strawberry.png")'
                        document.getElementById(pointId[m][k]).style.height = '40px'
                        document.getElementById(pointId[m][k]).style.width = '40px'
                    }else if (points[m][k] == 5 ){
                        pointLeft[m][k] = FIRST_POINT_LEFT + + k*ONE_BOX - 16
                        document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                        pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 16
                        document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                        document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Orange.png")'
                        document.getElementById(pointId[m][k]).style.height = '40px'
                        document.getElementById(pointId[m][k]).style.width = '40px'
                    }else if (points[m][k] == 6 ){
                        pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX - 16
                        document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                        pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 16
                        document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                        document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Pear.png")'
                        document.getElementById(pointId[m][k]).style.height = '40px'
                        document.getElementById(pointId[m][k]).style.width = '40px'
                    }else if (points[m][k] == 7 ){
                        pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX - 8
                        document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                        pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 6
                        document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                        document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Point.png")'
                        document.getElementById(pointId[m][k]).style.height = '23px'
                        document.getElementById(pointId[m][k]).style.width = '23px'
                        document.getElementById(pointId[m][k]).style.backgroundSize = '23px'
                    }
                    
                }
            }
        }
        //here i set the proper css properties to ghosts
        for (let c = 0; c < 8; c++){
            document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
            document.getElementById(ghostId[c]).style.backgroundSize = 'contain'
            document.getElementById(ghostId[c]).style.backgroundRepeat = 'no-repeat'
            document.getElementById(ghostId[c]).style.position = 'absolute'
            document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
            document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
            document.getElementById(ghostId[c]).style.height = '50px'
            document.getElementById(ghostId[c]).style.width = '50px'
            document.getElementById(ghostId[c]).style.opacity = '50%'
            gInvernal[c] = setInterval(function(){movingGhostInPrison(c)}, 10)
        }
        function moving(){
            //so valueOfTop and valueOfLeft become 0 when we are in the center of a box. Then it is the best moment to change direction so the distance with the pacMan and other elements stays how it should be.
            //every line here is necessery for the user experience to be complete.
            if ((valueOfTop == 0) && (valueOfLeft == 0) && (wishedDirection != movingDirection)){
                //here we check by our position in the collisionDetector array if its possible to move yet.
                //we don't let the direction change when it's not "possible". Sorry gamer...
                if ((wishedDirection == "Right") && (collisionDetector[y][x] != "R") && (collisionDetector[y][x] != "R") && (collisionDetector[y][x] != "G2") && (collisionDetector[y][x] != "G3") && (collisionDetector[y][x] != "B")){
                    movingDirection = wishedDirection
                    pacman.id.style.backgroundImage = 'url(\"Pac-Man Images/RightPac1.png\")'
                }else if ((wishedDirection == "Left") && (collisionDetector[y][x] != "L") && (collisionDetector[y][x] != "G1") && (collisionDetector[y][x] != "G4") && (collisionDetector[y][x] != "B")){
                    movingDirection = wishedDirection
                    pacman.id.style.backgroundImage = 'url(\"Pac-Man Images/LeftPac1.png\")'
                }else if ((wishedDirection == "Down") && (collisionDetector[y][x] != "A") && (collisionDetector[y][x] != "G3") && (collisionDetector[y][x] != "G4") && (collisionDetector[y][x] != "K")){
                    movingDirection = wishedDirection
                    pacman.id.style.backgroundImage = 'url(\"Pac-Man Images/DownPac1.png\")'
                }else if ((wishedDirection == "Up") && (collisionDetector[y][x] != "A") && (collisionDetector[y][x] != "G1") && (collisionDetector[y][x] != "G2") && (collisionDetector[y][x] != "P")){
                    movingDirection = wishedDirection
                    pacman.id.style.backgroundImage = 'url(\"Pac-Man Images/UpPac1.png\")'
                }
            //but sometimes we want to move before we get to valueOfTop 0 or valueOfLeft 0 so
            }else if ((valueOfTop == 0) && (((wishedDirection == 'Left')||(wishedDirection == 'Right')) && (wishedDirection != movingDirection))){
                movingDirection = wishedDirection
                pacman.id.style.backgroundImage = 'url(\"Pac-Man Images/' + movingDirection + 'Pac1.png\")'
            }else if ((valueOfLeft == 0) && (((wishedDirection == 'Up')||(wishedDirection == 'Down')) && (wishedDirection != movingDirection))){
                movingDirection = wishedDirection
                pacman.id.style.backgroundImage = 'url(\"Pac-Man Images/' + movingDirection + 'Pac1.png\")'
            }
            //this one is automated so we have to check again for maze.id.
            if ((movingDirection == "Right") && (collisionDetector[y][x] != "R") && (collisionDetector[y][x] != "G2") && (collisionDetector[y][x] != "G3") && (collisionDetector[y][x] != "B")){
                //so here we get a first look to how everything moves
                //its not the pacman that is moving but its the collision :)
                //we add/remove the PXS_MOVE to style and value.
                valueOfLeft = valueOfLeft - PXS_MOVE
                maze.left = maze.left - PXS_MOVE
                //then we put the new styleLeft value to the css left property
                maze.id.style.left = maze.left+ "px"
                //a fast loop for the repositioning of the ghosts!
                repositionGhostsLeft(ghostStyleLeft, -PXS_MOVE)
                //another loop for the repositioning of the points!
                //couldn't turn this into a function, i think the array is too big to pass on a function or i do not know how to pass a 2d array the right way :/
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                            pointLeft[m][k] = pointLeft[m][k] - PXS_MOVE
                            document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                        }
                    }
                }
                //if PAC travels ONE_BOX pixels to ONE direction that means we are in a new box. Time to travel in the arrays.
                if (valueOfLeft == -ONE_BOX){
                    x = x + 1
                    valueOfLeft = 0
                    j = j + 1
                }
                //here we do the point calcuations, more info in the function statement below!
                calculatePoint(i, j+1, -valueOfLeft)
            //this statement here is for when the player HASN'T moved a full box but instead changed mind just before, so we let him move.
            }else if ((movingDirection == "Right") && (valueOfLeft > 0)){
                maze.left = maze.left - PXS_MOVE
                valueOfLeft = valueOfLeft - PXS_MOVE
                maze.id.style.left = maze.left+ "px"
                repositionGhostsLeft(ghostStyleLeft, -PXS_MOVE)
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                            pointLeft[m][k] = pointLeft[m][k] - PXS_MOVE
                            document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                        }
                    }
                }
                if (valueOfLeft == ONE_BOX){
                    x = x - 1
                    valueOfLeft = 0
                    j = j - 1
                }
                calculatePoint(i, j-1, valueOfLeft)
            }
            if ((movingDirection == "Left") && (collisionDetector[y][x] != "L") && (collisionDetector[y][x] != "G1") && (collisionDetector[y][x] != "G4") && (collisionDetector[y][x] != "B")){
                maze.left = maze.left + PXS_MOVE
                valueOfLeft = valueOfLeft + PXS_MOVE
                maze.id.style.left = maze.left+ "px"
                repositionGhostsLeft(ghostStyleLeft, PXS_MOVE)
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                            pointLeft[m][k] = pointLeft[m][k] + PXS_MOVE
                            document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                        }
                    }
                }
                if (valueOfLeft == ONE_BOX){
                    x = x - 1
                    valueOfLeft = 0
                    j = j - 1
                }
                calculatePoint(i, j-1, valueOfLeft)
            }else if ((movingDirection == "Left") && (valueOfLeft < 0)){
                maze.left = maze.left + PXS_MOVE
                valueOfLeft = valueOfLeft + PXS_MOVE
                maze.id.style.left = maze.left+ "px"
                repositionGhostsLeft(ghostStyleLeft, PXS_MOVE)
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                            pointLeft[m][k] = pointLeft[m][k] + PXS_MOVE
                            document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                        }
                    }
                }
                if (valueOfLeft == ONE_BOX){
                    x = x - 1
                    valueOfLeft = 0
                    j = j - 1
                }
                calculatePoint(i, j-1, valueOfLeft)
            }
            if ((movingDirection == "Down") && (collisionDetector[y][x] != "A") && (collisionDetector[y][x] != "G3") && (collisionDetector[y][x] != "G4") && (collisionDetector[y][x] != "K")){
                maze.top = maze.top - PXS_MOVE
                valueOfTop = valueOfTop - PXS_MOVE
                maze.id.style.top = maze.top+ "px"
                repositionGhostsTop(ghostStyleTop, -PXS_MOVE)
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                            pointTop[m][k] = pointTop[m][k] - PXS_MOVE
                            document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                        }
                    }
                }
                if (valueOfTop == -ONE_BOX){
                    y = y + 1
                    valueOfTop = 0
                    i = i + 1
                    points[i][j] = 0
                }
                calculatePoint(i+1, j, -valueOfTop)
            }else if ((movingDirection == "Down") && (valueOfTop > 0)){
                maze.top = maze.top - PXS_MOVE
                valueOfTop = valueOfTop - PXS_MOVE
                maze.id.style.top = maze.top+ "px"
                repositionGhostsTop(ghostStyleTop, -PXS_MOVE)
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                                pointTop[m][k] = pointTop[m][k] - PXS_MOVE
                                document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                        }
                    }
                }
                if (valueOfTop == -ONE_BOX){
                    y = y + 1
                    valueOfTop = 0
                    i = i + 1
                }
                calculatePoint(i+1, j, -valueOfTop)
            }
            if ((movingDirection == "Up") && (collisionDetector[y][x] != "A") && (collisionDetector[y][x] != "G1") && (collisionDetector[y][x] != "G2") && (collisionDetector[y][x] != "P")){    
                maze.top = maze.top + PXS_MOVE
                valueOfTop = valueOfTop + PXS_MOVE
                maze.id.style.top = maze.top+ "px"
                repositionGhostsTop(ghostStyleTop, PXS_MOVE)
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                            pointTop[m][k] = pointTop[m][k] + PXS_MOVE
                            document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                        }
                    }
                }
                if (valueOfTop == ONE_BOX){
                    y = y - 1
                    valueOfTop = 0
                    i = i - 1
                }
                calculatePoint(i-1, j, valueOfTop)
            }else if ((movingDirection == "Up") && (valueOfTop < 0)){
                maze.top = maze.top + PXS_MOVE
                valueOfTop = valueOfTop + PXS_MOVE
                maze.id.style.top = maze.top+ "px"
                repositionGhostsTop(ghostStyleTop, PXS_MOVE)
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                            pointTop[m][k] = pointTop[m][k] + PXS_MOVE
                            document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                        }
                    }
                }
                if (valueOfTop == ONE_BOX){
                    y = y - 1
                    valueOfTop = 0
                    i = i - 1
                }
                calculatePoint(i-1, j, valueOfTop)
            }
            //this is the calculator of the postals at R1 L1 P1 K1
            if ((collisionDetector[y][x] == 'R1') && (valueOfLeft <= -50)){
                //calcuation go wrong if player spam portals so im just not gonna let him do that ^_^ :(
                x = -1
                j = -1
                maze.left = maze.left + ONE_BOX*29
                maze.id.style.left = maze.left+ "px"
                repositionGhostsLeft(ghostStyleLeft, ONE_BOX*29)
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                            pointLeft[m][k] = pointLeft[m][k] + ONE_BOX*29
                            document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                        }
                    }
                }
            }else if ((collisionDetector[y][x] == 'L1') && (valueOfLeft >= 50)){
                x = 29
                j = 29
                maze.left = maze.left - ONE_BOX*29
                maze.id.style.left = maze.left+ "px"
                repositionGhostsLeft(ghostStyleLeft, -ONE_BOX*29)
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                            pointLeft[m][k] = pointLeft[m][k] - ONE_BOX*29
                            document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                        }
                    }
                }
            }else if ((collisionDetector[y][x] == 'P1') && (valueOfTop >= 50)){
                y = 31
                i = 31
                maze.top = maze.top - ONE_BOX*31
                maze.id.style.top = maze.top+ "px"
                repositionGhostsLeft(ghostStyleTop, -ONE_BOX*31)
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                            pointTop[m][k] = pointTop[m][k] - ONE_BOX*31
                            document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                        }
                    }
                }
            }else if ((collisionDetector[y][x] == 'K1') && (valueOfTop <= -50)){
                y = -1
                i = -1
                maze.top = maze.top + ONE_BOX*31
                maze.id.style.top = maze.top+ "px"
                repositionGhostsLeft(ghostStyleTop, ONE_BOX*31)
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                            pointTop[m][k] = pointTop[m][k] + ONE_BOX*31
                            document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                        }
                    }
                }
                //sometimes we do not get the solutions we want but we get the solutions we need...
                do{
                    maze.top = maze.top - PXS_MOVE
                    valueOfTop = valueOfTop - PXS_MOVE
                    maze.id.style.top = maze.top+ "px"
                    repositionGhostsTop(ghostStyleTop, -PXS_MOVE)
                    for (let m = 0; m < 31; m++){
                        for (let k = 0; k < 30; k++){
                            if (points[m][k] != 0){
                                    pointTop[m][k] = pointTop[m][k] - PXS_MOVE
                                    document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                            }
                        }
                    }
                    if (valueOfTop == -ONE_BOX){
                        y = y + 1
                        valueOfTop = 0
                        i = i + 1
                    }
                    calculatePoint(i+1, j, -valueOfTop)
                }while(y==-1)
    
            }
            //because im not the best at math, sometimes when pacman cannot move the valueOfTop or valueOfLeft is greater or lesser than 0 when it should be 0
            //this makes it work even if it games a little "shacky"
            if ((valueOfLeft < 0) && (movingDirection == "Right") && ((collisionDetector[y][x] == "R") || (collisionDetector[y][x] == "G2") || (collisionDetector[y][x] == "G3") || (collisionDetector[y][x] == "B"))){
                maze.left = maze.left - valueOfLeft
                maze.id.style.left = maze.left+ "px"
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                            pointLeft[m][k] = pointLeft[m][k] - valueOfLeft
                            document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                        }
                    }
                }
                repositionGhostsLeft(ghostStyleLeft, -PXS_MOVE)
                valueOfLeft = 0
            }else if ((valueOfLeft > 0) && (movingDirection == "Left") && ((collisionDetector[y][x] == "L") || (collisionDetector[y][x] == "G1") || (collisionDetector[y][x] == "G4") || (collisionDetector[y][x] == "B"))){
                maze.left = maze.left - valueOfLeft
                maze.id.style.left = maze.left+ "px"
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                            pointLeft[m][k] = pointLeft[m][k] - valueOfLeft
                            document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                        }
                    }
                }
                repositionGhostsLeft(ghostStyleLeft, PXS_MOVE)
                valueOfLeft = 0
            }else if ((valueOfTop < 0) && (movingDirection == "Down") && ((collisionDetector[y][x] == "A") || (collisionDetector[y][x] == "G3") || (collisionDetector[y][x] == "G4") || (collisionDetector[y][x] == "K"))){
                maze.top = maze.top - valueOfTop
                maze.id.style.top = maze.top+ "px"
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                            pointTop[m][k] = pointTop[m][k] - valueOfTop
                            document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                        }
                    }
                }
                repositionGhostsTop(ghostStyleTop, PXS_MOVE)
                valueOfTop = 0
            }else if ((valueOfTop > 0) && (movingDirection == "Up") && ((collisionDetector[y][x] == "A") || (collisionDetector[y][x] == "G1") || (collisionDetector[y][x] == "G2") || (collisionDetector[y][x] == "P"))){
                maze.top = maze.top - valueOfTop
                maze.id.style.top = maze.top+ "px"
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                            pointTop[m][k] = pointTop[m][k] - valueOfTop
                            document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                        }
                    }
                }
                repositionGhostsTop(ghostStyleTop, -PXS_MOVE)
                valueOfTop = 0
            }
            //with this function we calculate the points and buffs, if there is a multiplier we add it to sxore for example Score:4X2!
            function calculatePoint(fI, fJ, value){
                if ((value == PXS_COLLAPSED)&&(points[fI][fJ] != 0)){
                    pacman.id.style.animation = 'none'
                    //we have to remove the property animation to add it later again
                    setTimeout( function(){
                        pacman.id.style.animation = ""
                    },300)
                    //here we add the animation to play once, concat helps us select the proper direction of images
                    pacman.id.style.animation = 'PacAnimation' + movingDirection + ' 0.3s 1'
                    if(points[fI][fJ] == 1){ 
                        score = score + multiplier*1
                        //if leftToEat = 0 you go next round with +1 lives
                        leftToEat = leftToEat - 1
                        if (leftToEat == 0) {
                           newRound()
                        }
                    }else if(points[fI][fJ] == 2){
                        multiplier = 2*multiplier
                        clearTimeout(multiplierTimout)
                        multiplierTimout = setTimeout(function(){
                            //multiplier get sets to 1 after 5 seconds
                            multiplier = 1
                            //also remove the X# from Score
                            blackLine.textContent = "Score:" + score
                        },5000)
                    }else if(points[fI][fJ] == 3){
                        multiplier = 3*multiplier
                        clearTimeout(multiplierTimout)
                        multiplierTimout = setTimeout(function(){
                            multiplier = 1
                            blackLine.textContent = "Score:" + score
                        },5000)
                    }else if(points[fI][fJ] == 4){
                        multiplier = 4*multiplier
                        clearTimeout(multiplierTimout)
                        multiplierTimout = setTimeout(function(){
                            multiplier = 1
                            blackLine.textContent = "Score:" + score
                        },5000)
                    }else if(points[fI][fJ] == 5){
                        multiplier = 5*multiplier
                        clearTimeout(multiplierTimout)
                        multiplierTimout = setTimeout(function(){
                            multiplier = 1
                            blackLine.textContent = "Score:" + score
                        },5000)
                    }else if(points[fI][fJ] == 6){
                        multiplier = 6*multiplier
                        clearTimeout(multiplierTimout)
                        multiplierTimout = setTimeout(function(){
                            multiplier = 1
                            blackLine.textContent = "Score:" + score
                        },5000)
                    }else if(points[fI][fJ] == 7){
                        //power up that let us eat ghosts
                        if (powerUp != 'EatGhosts'){
                            ghostSpeed = ghostSpeed/2
                        }
                        powerUp = 'EatGhosts'
                        //ghosts move slower now
                        clearTimeout(powerUpTimout)
                        powerUpTimout = setTimeout(function(){
                            //after 5 seconds no powerup and ghost speed the same
                            powerUp = 'none'
                            ghostSpeed = ghostSpeed*2
                            blackLine.textContent = "Score:" + score
                        },5000)
                    }
                    if(multiplier != 1){
                        //add X#! to score
                        blackLine.textContent = "Score:" + score + " X" + multiplier + "!"
                        //when we change the Content of blackLine it actually deletes the element and remakes it so we have to readd everything that was in it
                        repositionHearts()
                    }else{
                        blackLine.textContent = "Score:" + score
                        repositionHearts()
                    }
                    //make point invisimple
                    document.getElementById(pointId[fI][fJ]).style.opacity = '0'
                    points[fI][fJ] = 0
                }
            }
            //reposition ghosts relative to our position
            function repositionGhostsLeft(styleArray, addPXS){
                for (let c = 0; c < 8; c++){
                    detectIfCollide(c)
                    styleArray[c] = styleArray[c] + addPXS
                    document.getElementById(ghostId[c]).style.left = styleArray[c]+ "px"
                }
            }
            //reposition ghosts relative to our position
            function repositionGhostsTop(styleArray, addPXS){
                for (let c = 0; c < 8; c++){
                    styleArray[c] = styleArray[c] + addPXS
                    detectIfCollide(c)
                    document.getElementById(ghostId[c]).style.top = styleArray[c]+ "px"
                }
            }
        }
        // here the pac decides it's direction. It never changes to the opposite from current direction.
        // devidedODirection is a value that let's the other statements know if the O direction is calculated so it doesnt get stuck infenetelly in the '== O' statements.
        function movingGhost(c){
            if (ghostDirection[c] == "Right"){
                if (collisionDetector[ghostY[c]][ghostX[c]] == "R"){
                    ghostDirection[c] = verticalDirections[Math.floor(Math.random() * 2)]
                    decidedODirection[c] = false
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                }else if ((collisionDetector[ghostY[c]][ghostX[c]] == "P") && (!(decidedODirection[c]))){
                    do{
                        ghostDirection[c] = directions[Math.floor(Math.random() * 4)]
                    }while((ghostDirection[c] == 'Left') || (ghostDirection[c] == 'Up'))
                    decidedODirection[c] = true
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                }else if (collisionDetector[ghostY[c]][ghostX[c]] == "K"){
                    do{
                        ghostDirection[c] = directions[Math.floor(Math.random() * 4)]
                    }while((ghostDirection[c] == 'Left') || (ghostDirection[c] == 'Down'))
                    decidedODirection[c] = true
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                }else if (collisionDetector[ghostY[c]][ghostX[c]] == "G3"){
                    ghostDirection[c] = 'Up'
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                    decidedODirection[c] = false
                }else if (collisionDetector[ghostY[c]][ghostX[c]] == "G2"){
                    ghostDirection[c] = 'Down'
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                    decidedODirection[c] = false
                }else if (((collisionDetector[ghostY[c]][ghostX[c]] == "O") || (collisionDetector[ghostY[c]][ghostX[c]] == 'L1')) && (!(decidedODirection[c]))){
                    do{
                        ghostDirection[c] = directions[Math.floor(Math.random() * 4)]
                    }while(ghostDirection[c] == 'Left')
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                    decidedODirection[c] = true
                }else if ((collisionDetector[ghostY[c]][ghostX[c]] != 'B')){
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                    ghostValueLeft[c] = ghostValueLeft[c] + ghostSpeed*PXS_MOVE
                    ghostStyleLeft[c] = ghostStyleLeft[c] + ghostSpeed*PXS_MOVE
                    document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
                    //detect if collide with pac
                    detectIfCollide(c)
                    if (ghostValueLeft[c] >= ONE_BOX){
                        ghostStyleLeft[c] = ghostStyleLeft[c] - (ghostValueLeft[c] - ONE_BOX)
                        document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
                        ghostX[c] = ghostX[c] + 1
                        ghostValueLeft[c] = 0
                    }
                    if ((collisionDetector[ghostY[c]][ghostX[c]] != 'O') && (collisionDetector[ghostY[c]][ghostX[c]] != 'L1') && (collisionDetector[ghostY[c]][ghostX[c]] != 'L') && (collisionDetector[ghostY[c]][ghostX[c]] != 'P')  && (collisionDetector[ghostY[c]][ghostX[c]] != 'R') && (collisionDetector[ghostY[c]][ghostX[c]] != 'K')){
                        decidedODirection[c] = false
                    }
                }
    
            }else if (ghostDirection[c] == "Left"){
                if (collisionDetector[ghostY[c]][ghostX[c]] == "L"){
                    ghostDirection[c] = verticalDirections[Math.floor(Math.random() * 2)]
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                }else if ((collisionDetector[ghostY[c]][ghostX[c]] == "P") && (!(decidedODirection[c]))){
                    do{
                        ghostDirection[c] = directions[Math.floor(Math.random() * 4)]
                    }while((ghostDirection[c] == 'Right') || (ghostDirection[c] == 'Up'))
                    decidedODirection[c] = true
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                }else if ((collisionDetector[ghostY[c]][ghostX[c]] == "K") && (!(decidedODirection[c]))){
                    do{
                        ghostDirection[c] = directions[Math.floor(Math.random() * 4)]
                    }while((ghostDirection[c] == 'Right') || (ghostDirection[c] == 'Down'))
                    decidedODirection[c] = true
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                }else if (collisionDetector[ghostY[c]][ghostX[c]] == "G4"){
                    decidedODirection[c] = false
                    ghostDirection[c] = 'Up'
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                }else if (collisionDetector[ghostY[c]][ghostX[c]] == "G1"){
                    decidedODirection[c] = false
                    ghostDirection[c] = 'Down'
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                }else if (((collisionDetector[ghostY[c]][ghostX[c]] == "O") || (collisionDetector[ghostY[c]][ghostX[c]] == 'R1')) && (!(decidedODirection[c]))){
                    do{
                        ghostDirection[c] = directions[Math.floor(Math.random() * 4)]
                    }while(ghostDirection[c] == 'Right')
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                    decidedODirection[c] = true
                }else if (collisionDetector[ghostY[c]][ghostX[c]] != 'B'){
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                    ghostValueLeft[c] = ghostValueLeft[c] - ghostSpeed*PXS_MOVE
                    ghostStyleLeft[c] = ghostStyleLeft[c] - ghostSpeed*PXS_MOVE
                    document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
                    detectIfCollide(c)
                    if (ghostValueLeft[c] <= -ONE_BOX){
                        ghostStyleLeft[c] = ghostStyleLeft[c] - (ghostValueLeft[c] + ONE_BOX)
                        document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
                        ghostX[c] = ghostX[c] - 1
                        ghostValueLeft[c] = 0
                    }
                    if ((collisionDetector[ghostY[c]][ghostX[c]] != 'O') && (collisionDetector[ghostY[c]][ghostX[c]] != 'L1') && (collisionDetector[ghostY[c]][ghostX[c]] != 'L') && (collisionDetector[ghostY[c]][ghostX[c]] != 'P')  && (collisionDetector[ghostY[c]][ghostX[c]] != 'R') && (collisionDetector[ghostY[c]][ghostX[c]] != 'K')){
                        decidedODirection[c] = false
                    }
                }
            }else if (ghostDirection[c] == "Down"){
                if (collisionDetector[ghostY[c]][ghostX[c]] == "K"){
                    decidedODirection[c] = false
                    ghostDirection[c] = horizontalDirections[Math.floor(Math.random() * 2)]
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                }else if ((collisionDetector[ghostY[c]][ghostX[c]] == "L") && (!(decidedODirection[c]))){
                    do{
                        ghostDirection[c] = directions[Math.floor(Math.random() * 4)]
                    }while((ghostDirection[c] == 'Left') || (ghostDirection[c] == 'Up'))
                    decidedODirection[c] = true
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                }else if ((collisionDetector[ghostY[c]][ghostX[c]] == "R") && (!(decidedODirection[c]))){
                    do{
                        ghostDirection[c] = directions[Math.floor(Math.random() * 4)]
                    }while((ghostDirection[c] == 'Right') || (ghostDirection[c] == 'Up'))
                    decidedODirection[c] = true
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                }else if (collisionDetector[ghostY[c]][ghostX[c]] == "G3"){
                    decidedODirection[c] = false
                    ghostDirection[c] = 'Left'
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                }else if (collisionDetector[ghostY[c]][ghostX[c]] == "G4"){
                    decidedODirection[c] = false
                    ghostDirection[c] = 'Right'
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                }else if (((collisionDetector[ghostY[c]][ghostX[c]] == "O") || (collisionDetector[ghostY[c]][ghostX[c]] == 'P1')) && (!(decidedODirection[c]))){
                    do{
                        ghostDirection[c] = directions[Math.floor(Math.random() * 4)]
                    }while(ghostDirection[c] == 'Up')
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                    decidedODirection[c] = true
                }else if (collisionDetector[ghostY[c]][ghostX[c]] != 'A'){
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                    ghostValueTop[c] = ghostValueTop[c] + ghostSpeed*PXS_MOVE
                    ghostStyleTop[c] = ghostStyleTop[c] + ghostSpeed*PXS_MOVE
                    document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
                    detectIfCollide(c)
                    if (ghostValueTop[c] >= ONE_BOX){
                        ghostStyleTop[c] = ghostStyleTop[c] - (ghostValueTop[c] - ONE_BOX)
                        document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
                        ghostY[c] = ghostY[c] + 1
                        ghostValueTop[c] = 0
                    }
                    if ((collisionDetector[ghostY[c]][ghostX[c]] != 'O') && (collisionDetector[ghostY[c]][ghostX[c]] != 'L1') && (collisionDetector[ghostY[c]][ghostX[c]] != 'L') && (collisionDetector[ghostY[c]][ghostX[c]] != 'P')  && (collisionDetector[ghostY[c]][ghostX[c]] != 'R') && (collisionDetector[ghostY[c]][ghostX[c]] != 'K')){
                        decidedODirection[c] = false
                    }
                }
    
            }else if (ghostDirection[c] == "Up"){
                if (collisionDetector[ghostY[c]][ghostX[c]] == "P"){
                    decidedODirection[c] = false
                    ghostDirection[c] = horizontalDirections[Math.floor(Math.random() * 2)]
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                }else if ((collisionDetector[ghostY[c]][ghostX[c]] == "L") && (!(decidedODirection[c]))){
                    do{
                        ghostDirection[c] = directions[Math.floor(Math.random() * 4)]
                    }while((ghostDirection[c] == 'Left') || (ghostDirection[c] == 'Down'))
                    decidedODirection[c] = true
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                }else if ((collisionDetector[ghostY[c]][ghostX[c]] == "R") && (!(decidedODirection[c]))){
                    do{
                        ghostDirection[c] = directions[Math.floor(Math.random() * 4)]
                    }while((ghostDirection[c] == 'Right') || (ghostDirection[c] == 'Down'))
                    decidedODirection[c] = true
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                    }
                }else if (collisionDetector[ghostY[c]][ghostX[c]] == "G2"){
                    decidedODirection[c] = false
                    ghostDirection[c] = 'Left'
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                }else if (collisionDetector[ghostY[c]][ghostX[c]] == "G1"){
                    decidedODirection[c] = false
                    ghostDirection[c] = 'Right'
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                }else if (((collisionDetector[ghostY[c]][ghostX[c]] == "O") || (collisionDetector[ghostY[c]][ghostX[c]] == 'K1')) && (!(decidedODirection[c]))){
                    do{
                        ghostDirection[c] = directions[Math.floor(Math.random() * 4)]
                    }while(ghostDirection[c] == 'Down')
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '100%'
                    }
                    decidedODirection[c] = true
                }else if (collisionDetector[ghostY[c]][ghostX[c]] != 'A'){
                    if (powerUp != 'EatGhosts'){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                    }else {
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/Scared'+ ghostDirection[c] + '.png\"\)'
                    }
                    ghostValueTop[c] = ghostValueTop[c] - ghostSpeed*PXS_MOVE
                    ghostStyleTop[c] = ghostStyleTop[c] - ghostSpeed*PXS_MOVE
                    document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
                    detectIfCollide(c)
                    if (ghostValueTop[c] <= -ONE_BOX){
                        ghostStyleTop[c] = ghostStyleTop[c] - (ghostValueTop[c] + ONE_BOX)
                        document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
                        ghostY[c] = ghostY[c] - 1
                        ghostValueTop[c] = 0
                    }
                    if ((collisionDetector[ghostY[c]][ghostX[c]] != 'O') && (collisionDetector[ghostY[c]][ghostX[c]] != 'L1') && (collisionDetector[ghostY[c]][ghostX[c]] != 'L') && (collisionDetector[ghostY[c]][ghostX[c]] != 'P')  && (collisionDetector[ghostY[c]][ghostX[c]] != 'R') && (collisionDetector[ghostY[c]][ghostX[c]] != 'K')){
                        decidedODirection[c] = false
                    }
                }
            }
            //this is the calculator of the postals at R1 L1 P1 K1
            if ((collisionDetector[ghostY[c]][ghostX[c]] == 'R1') && (ghostValueLeft[c] >= 50)){
                ghostX[c] = -1
                ghostStyleLeft[c] = ghostStyleLeft[c] - ONE_BOX*29
                document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c] + "px"
            }else if ((collisionDetector[ghostY[c]][ghostX[c]] == 'L1') && (ghostValueLeft[c] <= -50)){
                ghostX[c] = 29
                ghostStyleLeft[c] = ghostStyleLeft[c] + ONE_BOX*29
                document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c] + "px"
            }else if ((collisionDetector[ghostY[c]][ghostX[c]] == 'P1') && (ghostValueTop[c] >= 50)){
                ghostY[c] = 31
                ghostStyleTop[c] = ghostStyleTop[c] + ONE_BOX*31
                document.getElementById(ghostId[c]).style.top = ghostStyleTop[c] + "px"
            }else if ((collisionDetector[ghostY[c]][ghostX[c]] == 'K1') && (ghostValueTop[c] <= -50)){
                ghostY[c] = -1
                ghostStyleTop[c] = ghostStyleTop[c] - ONE_BOX*31
                document.getElementById(ghostId[c]).style.top = ghostStyleTop[c] + "px"
                do{
                    ghostStyleTop[c] = ghostStyleTop[c] + PXS_MOVE
                    ghostValueTop[c] = ghostValueTop[c] + PXS_MOVE
                    document.getElementById(ghostId[c]).style.top = ghostValueTop[c]+ "px"
                    if (ghostValueTop[c] == ONE_BOX){
                        ghostY[c] = ghostY[c] + 1
                        ghostValueTop[c] = 0
                    }
                }while(ghostY[c]==-1)
            }
            //here we fix my bad math ^_^
            if ((ghostValueLeft[c] < 0) && (ghostDirection[c] == "Right") && ((collisionDetector[ghostY[c]][ghostX[c]] == "R") || (collisionDetector[ghostY[c]][ghostX[c]] == "G2") || (collisionDetector[ghostY[c]][ghostX[c]] == "G3") || (collisionDetector[ghostY[c]][ghostX[c]] == "B"))){
                ghostStyleLeft[c] = ghostStyleLeft[c] - ghostValueLeft[c]
                document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c] + "px"
                ghostValueLeft[c] = 0
            }else if ((ghostValueLeft[c] > 0) && (ghostDirection[c] == "Left") && ((collisionDetector[ghostY[c]][ghostX[c]] == "L") || (collisionDetector[ghostY[c]][ghostX[c]] == "G1") || (collisionDetector[ghostY[c]][ghostX[c]] == "G4") || (collisionDetector[ghostY[c]][ghostX[c]] == "B"))){
                ghostStyleLeft[c] = ghostStyleLeft[c] - ghostValueLeft[c]
                document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c] + "px"
                ghostValueLeft[c] = 0
            }else if ((ghostValueTop[c] < 0) && (ghostDirection[c] == "Down") && ((collisionDetector[ghostY[c]][ghostX[c]] == "A") || (collisionDetector[ghostY[c]][ghostX[c]] == "G3") || (collisionDetector[ghostY[c]][ghostX[c]] == "G4") || (collisionDetector[ghostY[c]][ghostX[c]] == "K"))){
                ghostStyleTop[c] = ghostStyleTop[c] - ghostValueTop[c]
                document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
                ghostValueTop[c] = 0
            }else if ((ghostValueTop[c] < 0) && (ghostDirection[c] == "Up") && ((collisionDetector[ghostY[c]][ghostX[c]] == "A") || (collisionDetector[ghostY[c]][ghostX[c]] == "G1") || (collisionDetector[ghostY[c]][ghostX[c]] == "G2") || (collisionDetector[ghostY[c]][ghostX[c]] == "P"))){
                ghostStyleTop[c] = ghostStyleTop[c] - ghostValueTop[c]
                document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
                ghostValueTop[c] = 0
            }
        }
        //simplified movingGhost for prison only
        function movingGhostInPrison(c){
            if (ghostInPrison[c]){
                if (ghostDirection[c] == "Right"){
                    if (prison[prisonX[c]] == "R"){
                        ghostDirection[c] = 'Left'
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                    }else {
                        ghostValueLeft[c] = ghostValueLeft[c] + PXS_MOVE
                        ghostStyleLeft[c] = ghostStyleLeft[c] + PXS_MOVE
                        document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
                        if (ghostValueLeft[c] == ONE_BOX){
                            prisonX[c] = prisonX[c] + 1
                            ghostValueLeft[c] = 0
                        }
                    }
                }else if (ghostDirection[c] == "Left"){
                    if (prison[prisonX[c]] == "L"){
                        ghostDirection[c] = 'Right'
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                    }else {
                        ghostValueLeft[c] = ghostValueLeft[c] - PXS_MOVE
                        ghostStyleLeft[c] = ghostStyleLeft[c] - PXS_MOVE
                        document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
                        if (ghostValueLeft[c] == -ONE_BOX){
                            prisonX[c] = prisonX[c] - 1
                            ghostValueLeft[c] = 0
                        }
                    }
                }
            }else if(ghostValueLeft[c] != 0){
                if (ghostDirection[c] == "Right"){
                    if (prison[prisonX[c]] == "R"){
                        ghostDirection[c] = 'Left'
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                    }else {
                        ghostValueLeft[c] = ghostValueLeft[c] + PXS_MOVE
                        ghostStyleLeft[c] = ghostStyleLeft[c] + PXS_MOVE
                        document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
                        if (ghostValueLeft[c] == ONE_BOX){
                            prisonX[c] = prisonX[c] + 1
                            ghostValueLeft[c] = 0
                        }
                    }
                }else if (ghostDirection[c] == "Left"){
                    if (prison[prisonX[c]] == "L"){
                        ghostDirection[c] = 'Right'
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                    }else {
                        ghostValueLeft[c] = ghostValueLeft[c] - PXS_MOVE
                        ghostStyleLeft[c] = ghostStyleLeft[c] - PXS_MOVE
                        document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
                        if (ghostValueLeft[c] == -ONE_BOX){
                            prisonX[c] = prisonX[c] - 1
                            ghostValueLeft[c] = 0
                        }
                    }
                }
            }else if(ghostValueLeft[c] == 0){
                ghostValueTop[c] = ghostValueTop[c] - PXS_MOVE
                ghostStyleTop[c] = ghostStyleTop[c] - PXS_MOVE
                document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
                if (ghostValueTop[c] == -ONE_BOX){
                    ghostY[c] = ghostY[c] - 1
                    ghostValueTop[c] = 0
                    ghostX[c] = prisonX[c] + 12
                    ghostY[c] = 15
                    clearInterval(gInvernal[c])
                    gInvernal[c] = setInterval(function(){movingGhost(c)}, 10)
                }
            }
        }
        function detectIfCollide(c) {
            var $id = $("[id^=" + ghostId[c] + ']')
            var x1 = $id.offset().left;
            var y1 = $id.offset().top;
            var h1 = $id.outerHeight(true);
            var w1 = $id.outerWidth(true);
            var b1 = y1 + h1;
            var r1 = x1 + w1;
            var x2 = $('#pacman').offset().left;
            var y2 = $('#pacman').offset().top;
            var h2 = $('#pacman').outerHeight(true);
            var w2 = $('#pacman').outerWidth(true);
            var b2 = y2 + h2;
            var r2 = x2 + w2;
            if (!(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)){
                if ((powerUp != 'EatGhosts') && (ghostAlive[c])){
                    death()
                }else {
                    clearInterval(gInvernal[c])
                    gInvernal[c] = setInterval(function(){ghostDeath(c)}, 10)
                }
            }
        }
        function repositionHearts(){
            if (lives != 0){
                for (let i = 0; i < lives; i++){
                    document.getElementById('BlackLine').innerHTML += '<div id = \"Heart#' + (i+1) + "\"></div>"
                    document.getElementById('Heart#' + (i+1)).style.position = 'fixed'
                    document.getElementById('Heart#' + (i+1)).style.left = (FIRST_HEART_LEFT+80*i)+ "px"
                    document.getElementById('Heart#' + (i+1)).style.top = '12px'
                    document.getElementById('Heart#' + (i+1)).style.backgroundImage = 'url("Pac-Man\ Images/Heart.png")'
                    document.getElementById('Heart#' + (i+1)).style.backgroundSize = 'contain'
                    document.getElementById('Heart#' + (i+1)).style.backgroundRepeat = 'no-repeat'
                    document.getElementById('Heart#' + (i+1)).style.width = '55px'
                    document.getElementById('Heart#' + (i+1)).style.height = '55px'
                    document.getElementById('Heart#' + (i+1)).style.zIndex = '5'
                }
            }
        }
        //everything starts over
        function death(){
            pacman.id.style.animation = 'none'
            clearInterval(movingActive)
            pacman.id.style.animation = 'PacDying' + movingDirection + ' 1s 1'
            clearTimeout(waitDeath)
            for(let c = 0; c < 8; c++){
                clearInterval(gInvernal[c])
            }
            waitDeath = setTimeout(function(){
                click.show()
                pacman.id.style.animation = ""
                movingDirection = 'Right'
                wishedDirection = 'Right'
                window.addEventListener("click",
                    function(){
                        click.hide()
                        movingActive = setInterval(moving,10)
                        for(let c = 0; c < 8; c++){
                            clearTimeout(waitFree[c])
                            waitFree[c] = setTimeout(function(){ghostInPrison[c] = false},5000)
                        }
                    },{once : true})
                multiplier = 1
                powerUp = 'none'
                blackLine.textContent = "Score:"+ score 
                lives = lives - 1
                repositionHearts()
                ghostStyleTop = [FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP]
                ghostStyleLeft = [FIRST_GHOST_LEFT + ONE_BOX, FIRST_GHOST_LEFT + 2*ONE_BOX, FIRST_GHOST_LEFT + 3*ONE_BOX, FIRST_GHOST_LEFT + 4*ONE_BOX, FIRST_GHOST_LEFT + 2*ONE_BOX, FIRST_GHOST_LEFT + 5*ONE_BOX, FIRST_GHOST_LEFT + 5*ONE_BOX, FIRST_GHOST_LEFT + 3*ONE_BOX,]
                decidedODirection = [false, false, false, false, false, false, false, false,]
                ghostX = [12, 13, 14, 15, 12, 13, 14, 15,]
                ghostY = [15, 15, 15, 15, 15, 15, 15, 15,]
                ghostValueTop = [0,0,0,0,0,0,0,0]
                ghostValueLeft = [0,0,0,0,0,0,0,0]
                ghostInPrison = [true,true,true,true,true,true,true,true]
                ghostDirection = ["Right", "Left", "Right", "Left", "Right", "Left","Right", "Left"]
                prisonX = [0,1,2,3,1,4,4,2]
                for (let c = 0; c < 8; c++){
                    document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
                    document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
                    document.getElementById(ghostId[c]).style.opacity = '50%'
                    document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                    clearInterval(gInvernal[c])
                    gInvernal[c] = setInterval(function(){movingGhostInPrison(c)}, 10)
                }
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                            pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX
                            pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX
                            document.getElementById(pointId[m][k]).style.position = 'absolute'
                            document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                            document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                            document.getElementById(pointId[m][k]).style.zIndex = '1'
                            document.getElementById(pointId[m][k]).style.backgroundRepeat = 'no-repeat'
                            document.getElementById(pointId[m][k]).style.backgroundSize = 'contain'
                            if (points[m][k] == 1 ){
                                document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Point.png")'
                                document.getElementById(pointId[m][k]).style.height = '12px'
                                document.getElementById(pointId[m][k]).style.width = '12px'
                            }else if (points[m][k] == 2 ){
                                pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX - 20
                                document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                                pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 20
                                document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                                document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Cherry.png")'
                                document.getElementById(pointId[m][k]).style.height = '40px'
                                document.getElementById(pointId[m][k]).style.width = '40px'
                            }else if (points[m][k] == 3 ){
                                pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX - 16
                                document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                                pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 16
                                document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                                document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Banana.png")'
                                document.getElementById(pointId[m][k]).style.height = '40px'
                                document.getElementById(pointId[m][k]).style.width = '40px'
                            }else if (points[m][k] == 4 ){
                                pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX - 16
                                document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                                pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 16
                                document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                                document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Strawberry.png")'
                                document.getElementById(pointId[m][k]).style.height = '40px'
                                document.getElementById(pointId[m][k]).style.width = '40px'
                            }else if (points[m][k] == 5 ){
                                pointLeft[m][k] = FIRST_POINT_LEFT + + k*ONE_BOX - 16
                                document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                                pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 16
                                document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                                document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Orange.png")'
                                document.getElementById(pointId[m][k]).style.height = '40px'
                                document.getElementById(pointId[m][k]).style.width = '40px'
                            }else if (points[m][k] == 6 ){
                                pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX - 16
                                document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                                pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 16
                                document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                                document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Pear.png")'
                                document.getElementById(pointId[m][k]).style.height = '40px'
                                document.getElementById(pointId[m][k]).style.width = '40px'
                            }else if (points[m][k] == 7 ){
                                pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX - 8
                                document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                                pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 6
                                document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                                document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Point.png")'
                                document.getElementById(pointId[m][k]).style.height = '23px'
                                document.getElementById(pointId[m][k]).style.width = '23px'
                                document.getElementById(pointId[m][k]).style.backgroundSize = '23px'
                            }
                        }
                    }
                    movingDirection = 'Right'
                    pacman.id.style.backgroundImage = 'url(\"Pac-Man Images/' + movingDirection + 'Pac1.png\")'
                    x = 14
                    y = 15
                    i = 15
                    j = 14
                    valueOfLeft = 0
                    valueOfTop = 0
                    maze.top = -1562
                    maze.left = -932
                    maze.id.style.left = maze.left + "px"
                    maze.id.style.top = maze.top + "px"
                }
            },800)
        }
        //ghost finds its way back to prison
        function ghostDeath(c){
            ghostAlive[c] = false
            if ((ghostY[c] != 15) || ((ghostX[c] > 16) || (ghostX[c] < 12))){
                // if values aren't 0 move to direction set until they become
                if (ghostValueLeft[c] != 0){
                    //here we find the closest way to prison and go there by using the wayToPrison array
                    findNextDirection(c)
                    if ((ghostDirection[c] == "Right") && (collisionDetector[ghostY[c]][ghostX[c]] != 'R') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G2') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G3') && (collisionDetector[ghostY[c]][ghostX[c]] != 'B')){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/ToPrison' + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.width = '35px'
                        document.getElementById(ghostId[c]).style.height = '35px'
                        ghostValueLeft[c] = ghostValueLeft[c] + 2.5*PXS_MOVE
                        ghostStyleLeft[c] = ghostStyleLeft[c] + 2.5*PXS_MOVE
                        document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
                        if (ghostValueLeft[c] >= ONE_BOX){
                            ghostStyleLeft[c] = ghostStyleLeft[c] - (ghostValueLeft[c] - ONE_BOX)
                            document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
                            ghostX[c] = ghostX[c] + 1
                            ghostValueLeft[c] = 0
                        }
                    }else if ((ghostDirection[c] == "Left") && (collisionDetector[ghostY[c]][ghostX[c]] != 'L') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G1') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G4') && (collisionDetector[ghostY[c]][ghostX[c]] != 'B')){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/ToPrison' + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.width = '35px'
                        document.getElementById(ghostId[c]).style.height = '35px'
                        ghostValueLeft[c] = ghostValueLeft[c] - 2.5*PXS_MOVE
                        ghostStyleLeft[c] = ghostStyleLeft[c] - 2.5*PXS_MOVE
                        document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
                        if (ghostValueLeft[c] <= -ONE_BOX){
                            ghostStyleLeft[c] = ghostStyleLeft[c] - (ghostValueLeft[c] + ONE_BOX)
                            document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
                            ghostX[c] = ghostX[c] - 1
                            ghostValueLeft[c] = 0
                        }
                    }
                }else if (ghostValueTop[c] != 0){
                    if ((ghostDirection[c] == "Down") && (collisionDetector[ghostY[c]][ghostX[c]] != 'P') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G1') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G2') && (collisionDetector[ghostY[c]][ghostX[c]] != 'A')){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/ToPrison' + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.width = '35px'
                        document.getElementById(ghostId[c]).style.height = '35px'
                        ghostValueTop[c] = ghostValueTop[c] + 2.5*PXS_MOVE
                        ghostStyleTop[c] = ghostStyleTop[c] + 2.5*PXS_MOVE
                        document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
                        if (ghostValueTop[c] >= ONE_BOX){
                            ghostStyleTop[c] = ghostStyleTop[c] - (ghostValueTop[c] - ONE_BOX)
                            document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
                            ghostY[c] = ghostY[c] + 1
                            ghostValueTop[c] = 0
                        }
                    }else if ((ghostDirection[c] == "Up") && (collisionDetector[ghostY[c]][ghostX[c]] != 'K') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G3') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G4') && (collisionDetector[ghostY[c]][ghostX[c]] != 'A')){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/ToPrison' + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.width = '35px'
                        document.getElementById(ghostId[c]).style.height = '35px'
                        ghostValueTop[c] = ghostValueTop[c] - 2.5*PXS_MOVE
                        ghostStyleTop[c] = ghostStyleTop[c] - 2.5*PXS_MOVE
                        document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
                        if (ghostValueTop[c] <= -ONE_BOX){
                            ghostStyleTop[c] = ghostStyleTop[c] - (ghostValueTop[c] + ONE_BOX)
                            document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
                            ghostY[c] = ghostY[c] - 1
                            ghostValueTop[c] = 0
                        }
                    }
                }else {
                    //here we find the closest way to prison and go there by using the wayToPrison array
                    findNextDirection(c)
                    if ((ghostDirection[c] == "Right") && (collisionDetector[ghostY[c]][ghostX[c]] != 'R') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G2') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G3') && (collisionDetector[ghostY[c]][ghostX[c]] != 'B')){
                        ghostValueLeft[c] = ghostValueLeft[c] + 2.5*PXS_MOVE
                        ghostStyleLeft[c] = ghostStyleLeft[c] + 2.5*PXS_MOVE
                        document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
                        if (ghostValueLeft[c] >= ONE_BOX){
                            ghostStyleLeft[c] = ghostStyleLeft[c] - (ghostValueLeft[c] - ONE_BOX)
                            document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
                            ghostX[c] = ghostX[c] + 1
                            ghostValueLeft[c] = 0
                        }
                    }else if ((ghostDirection[c] == "Left") && (collisionDetector[ghostY[c]][ghostX[c]] != 'L') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G1') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G4') && (collisionDetector[ghostY[c]][ghostX[c]] != 'B')){
                        ghostValueLeft[c] = ghostValueLeft[c] - 2.5*PXS_MOVE
                        ghostStyleLeft[c] = ghostStyleLeft[c] - 2.5*PXS_MOVE
                        document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
                        if (ghostValueLeft[c] <= -ONE_BOX){
                            ghostStyleLeft[c] = ghostStyleLeft[c] - (ghostValueLeft[c] + ONE_BOX)
                            document.getElementById(ghostId[c]).style.left = ghostStyleLeft[c]+ "px"
                            ghostX[c] = ghostX[c] - 1
                            ghostValueLeft[c] = 0
                        }
                    }else if ((ghostDirection[c] == "Down") && (collisionDetector[ghostY[c]][ghostX[c]] != 'P') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G1') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G2') && (collisionDetector[ghostY[c]][ghostX[c]] != 'A')){
                        ghostValueTop[c] = ghostValueTop[c] + 2.5*PXS_MOVE
                        ghostStyleTop[c] = ghostStyleTop[c] + 2.5*PXS_MOVE
                        document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
                        if (ghostValueTop[c] >= ONE_BOX){
                            ghostStyleTop[c] = ghostStyleTop[c] - (ghostValueTop[c] - ONE_BOX)
                            document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
                            ghostY[c] = ghostY[c] + 1
                            ghostValueTop[c] = 0
                        }
                    }else if ((ghostDirection[c] == "Up") && (collisionDetector[ghostY[c]][ghostX[c]] != 'K') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G3') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G4') && (collisionDetector[ghostY[c]][ghostX[c]] != 'A')){
                        ghostValueTop[c] = ghostValueTop[c] - 2.5*PXS_MOVE
                        ghostStyleTop[c] = ghostStyleTop[c] - 2.5*PXS_MOVE
                        document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
                        if (ghostValueTop[c] <= -ONE_BOX){
                            ghostStyleTop[c] = ghostStyleTop[c] - (ghostValueTop[c] + ONE_BOX)
                            document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
                            ghostY[c] = ghostY[c] - 1
                            ghostValueTop[c] = 0
                        }
                    }
                }
            // if we are on top of prison then the ghost go inside and the movingGhostInPrison is again replayed in gInvernal
            }else if((ghostValueLeft[c] == 0) && (ghostValueLeft[c] == 0)){
                ghostValueTop[c] = ghostValueTop[c] + PXS_MOVE
                ghostStyleTop[c] = ghostStyleTop[c] + PXS_MOVE
                document.getElementById(ghostId[c]).style.top = ghostStyleTop[c]+ "px"
                if (ghostValueTop[c] >= ONE_BOX){
                    ghostStyleTop[c] = ghostStyleTop[c] - (ghostValueTop[c] - ONE_BOX)
                    ghostY[c] = ghostY[c] + 1
                    ghostValueTop[c] = 0
                    prisonX[c] = ghostX[c] - 12
                    clearInterval(gInvernal[c])
                    gInvernal[c] = setInterval(function(){movingGhostInPrison(c)}, 10)
                    ghostInPrison[c] = true
                    document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                    document.getElementById(ghostId[c]).style.height = '50px'
                    document.getElementById(ghostId[c]).style.width = '50px'
                    setTimeout(function(){ 
                        ghostAlive[c] = true
                        ghostInPrison[c] = false
                    }, 3000)
                }
            }
        }
        //this function finds the closest way to prison
        function findNextDirection(c){
            if (((wayToPrison[ghostY[c]][ghostX[c]-1] <= wayToPrison[ghostY[c]][ghostX[c]+1]) && (wayToPrison[ghostY[c]][ghostX[c]-1] <= wayToPrison[ghostY[c]-1][ghostX[c]]) && (wayToPrison[ghostY[c]][ghostX[c]-1] <= wayToPrison[ghostY[c]+1][ghostX[c]]))
                    &&((collisionDetector[ghostY[c]][ghostX[c]] != 'L') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G1') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G4') && (collisionDetector[ghostY[c]][ghostX[c]] != 'B'))){
                ghostDirection[c] = 'Left'
                console.log(ghostDirection[c])
                document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/ToPrison' + ghostDirection[c] + '.png\"\)'
                document.getElementById(ghostId[c]).style.width = '35px'
                document.getElementById(ghostId[c]).style.height = '35px'
            }else if (((wayToPrison[ghostY[c]][ghostX[c]+1] <= wayToPrison[ghostY[c]][ghostX[c]-1]) && (wayToPrison[ghostY[c]][ghostX[c]+1] <= wayToPrison[ghostY[c]-1][ghostX[c]]) && (wayToPrison[ghostY[c]][ghostX[c]+1] <= wayToPrison[ghostY[c]+1][ghostX[c]]))
                    &&((collisionDetector[ghostY[c]][ghostX[c]] != 'R') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G2') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G3') && (collisionDetector[ghostY[c]][ghostX[c]] != 'B'))){
                ghostDirection[c] = 'Right'
                console.log(ghostDirection[c])
                document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/ToPrison' + ghostDirection[c] + '.png\"\)'
                document.getElementById(ghostId[c]).style.width = '35px'
                document.getElementById(ghostId[c]).style.height = '35px'
            }else if (((wayToPrison[ghostY[c]-1][ghostX[c]] <= wayToPrison[ghostY[c]][ghostX[c]+1]) && (wayToPrison[ghostY[c]-1][ghostX[c]] <= wayToPrison[ghostY[c]][ghostX[c]-1]) && (wayToPrison[ghostY[c]-1][ghostX[c]] <= wayToPrison[ghostY[c]+1][ghostX[c]]))
                    &&((collisionDetector[ghostY[c]][ghostX[c]] != 'P') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G1') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G2') && (collisionDetector[ghostY[c]][ghostX[c]] != 'A'))){
                ghostDirection[c] = 'Up'
                console.log(ghostDirection[c])
                document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/ToPrison' + ghostDirection[c] + '.png\"\)'
                document.getElementById(ghostId[c]).style.width = '35px'
                document.getElementById(ghostId[c]).style.height = '35px'
            }else if (((wayToPrison[ghostY[c]+1][ghostX[c]] <= wayToPrison[ghostY[c]][ghostX[c]+1]) && (wayToPrison[ghostY[c]+1][ghostX[c]] <= wayToPrison[ghostY[c]][ghostX[c]-1]) && (wayToPrison[ghostY[c]+1][ghostX[c]] <= wayToPrison[ghostY[c]-1][ghostX[c]]))
                    && ((collisionDetector[ghostY[c]][ghostX[c]] != 'K') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G3') && (collisionDetector[ghostY[c]][ghostX[c]] != 'G4') && (collisionDetector[ghostY[c]][ghostX[c]] != 'A'))){
                ghostDirection[c] = 'Down'
                console.log(ghostDirection[c])
                document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/ToPrison' + ghostDirection[c] + '.png\"\)'
                document.getElementById(ghostId[c]).style.width = '35px'
                document.getElementById(ghostId[c]).style.height = '35px'
            }
        }
        function newRound(){
            document.getElementById("winMessage").style.opacity = '100%'
            document.getElementById("winMessage").style.top = (pacman.top-100)+ "px"
            blackLine.textContent = "Score:" + score
            for (let c = 0; c < 8; c++){
                if (((ghostY[c] != 15) || ((ghostX[c] > 16) || (ghostX[c] < 12))) && (ghostInPrison[c] == false)){
                    clearInterval(gInvernal[c])
                    gInvernal[c] = setInterval(function(){ghostDeath(c)},10)
                }else{
                    clearTimeout(waitFree[c])
                    waitFree[c] = setTimeout(function(){ghostInPrison[c] = false},5000)
                }
            }
            clearTimeout(waitDeath)
            waitDeath = setTimeout(function(){
                $("#Click").show()
                document.getElementById("winMessage").style.opacity = '0%'
                //safety first
                clearInterval(movingActive)
                clearTimeout(multiplierTimout)
                clearTimeout(powerUpTimout)
                powerUp = 'none'
                wishedDirection = 'Right'
                movingDirection = 'Right'
                pacman.id.style.backgroundImage = 'url(\"Pac-Man Images/RightPac1.png\")'
                blackLine.textContent = "Score:" + score
                window.addEventListener("click", function(){
                    $("#Click").hide()
                    movingActive = setInterval(moving,10)
                    for (let c = 0; c < 8; c++){
                        document.getElementById(ghostId[c]).style.backgroundImage = 'url("Pac-Man\ Images/' + color[c] + ghostDirection[c] + '.png\"\)'
                        document.getElementById(ghostId[c]).style.opacity = '50%'
                    }
                },{once : true})
                maze.left = pacman.left -1303.2
                maze.top = pacman.top -1398.004
                valueOfLeft = 0
                valueOfTop = 0
                maze.id.style.left = maze.left+ "px"
                maze.id.style.top = styleTop+ "px"
                pacman.id.style.left = pacman.left+ "px"
                pacman.id.style.top = pacman.top+ "px"
                multiplier = 1
                lives = lives + 1
                i = 15, j = 14, y = 15, x = 14
                blackLine.textContent = "Score:" + score
                repositionHearts()
                points = [ //31x30
                    [0,0,0,0,0,0,0,7,1,1,1,1,1,1,1,1,1,1,1,1,1,7,0,0,0,0,0,0,0,],
                    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
                    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
                    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
                    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
                    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
                    [7,1,1,1,1,1,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,1,1,1,1,1,7,],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
                    [1,1,1,1,1,1,1,7,1,1,1,1,1,1,1,1,1,1,1,1,1,7,1,1,1,1,1,1,1,],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
                    [1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,7,1,1,1,1,1,1,1,1,1,],
                    [1,1,1,1,1,1,1,1,7,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
                    [1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
                    [1,1,1,1,1,1,1,1,7,1,1,1,1,1,1,1,1,1,1,1,1,7,1,1,1,1,1,1,1,],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
                    [7,1,1,1,1,1,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,1,1,1,1,1,7,],
                    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
                    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
                    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
                    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
                    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,],
                    [0,0,0,0,0,0,0,7,1,1,1,1,1,1,1,1,1,1,1,1,1,7,0,0,0,0,0,0,0,],
                ]
                for (let c = 0; c < 8; c++){
                    clearInterval(gInvernal[c])
                    gInvernal[c] = setInterval(function(){movingGhostInPrison(c)},10)
                    clearTimeout(waitFree[c])
                    waitFree[c] = setTimeout(function(){ghostInPrison[c] = false},5000)
                }
                for (let i = 0; i < 31; i++){
                    for (let j = 0; j < 30; j++){
                        if (points[i][j] == 1){
                            leftToEat = leftToEat + 1
                        }
                    }
                }
                for(let i = 0; i < 5; i++){ //finds random places to place the multipliers,buffs,nerfs in the array
                    for(let j = 0; j < 2; j++){
                        do{
                            var z = Math.floor(Math.random() * 31)
                            var s = Math.floor(Math.random() * 30)
                            
                            if (points[z][s] == 1){
                                points[z][s] = i + 2
                            }
                            var before = points[z][s]
                        }while(points[z][s] != before)//the value MUST be different from before so for example a multiplier dont overwrite another multiplier
                    }
                }
                for (let m = 0; m < 31; m++){
                    for (let k = 0; k < 30; k++){
                        if (points[m][k] != 0){
                            document.getElementById('Points').innerHTML += "<div id = \"Point [" + m + '][' + k + "]\"></div>"
                            pointId[m][k] = "Point [" + m + '][' + k + "]"
                            pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX
                            pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX
                            document.getElementById(pointId[m][k]).style.position = 'absolute'
                            document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                            document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                            document.getElementById(pointId[m][k]).style.zIndex = '1'
                            document.getElementById(pointId[m][k]).style.backgroundRepeat = 'no-repeat'
                            document.getElementById(pointId[m][k]).style.backgroundSize = 'contain'
                            if (points[m][k] == 1 ){
                                document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Point.png")'
                                document.getElementById(pointId[m][k]).style.height = '12px'
                                document.getElementById(pointId[m][k]).style.width = '12px'
                            }else if (points[m][k] == 2 ){
                                pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX - 20
                                document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                                pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 20
                                document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                                document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Cherry.png")'
                                document.getElementById(pointId[m][k]).style.height = '40px'
                                document.getElementById(pointId[m][k]).style.width = '40px'
                            }else if (points[m][k] == 3 ){
                                pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX - 16
                                document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                                pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 16
                                document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                                document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Banana.png")'
                                document.getElementById(pointId[m][k]).style.height = '40px'
                                document.getElementById(pointId[m][k]).style.width = '40px'
                            }else if (points[m][k] == 4 ){
                                pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX - 16
                                document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                                pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 16
                                document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                                document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Strawberry.png")'
                                document.getElementById(pointId[m][k]).style.height = '40px'
                                document.getElementById(pointId[m][k]).style.width = '40px'
                            }else if (points[m][k] == 5 ){
                                pointLeft[m][k] = FIRST_POINT_LEFT + + k*ONE_BOX - 16
                                document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                                pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 16
                                document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                                document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Orange.png")'
                                document.getElementById(pointId[m][k]).style.height = '40px'
                                document.getElementById(pointId[m][k]).style.width = '40px'
                            }else if (points[m][k] == 6 ){
                                pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX - 16
                                document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                                pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 16
                                document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                                document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Pear.png")'
                                document.getElementById(pointId[m][k]).style.height = '40px'
                                document.getElementById(pointId[m][k]).style.width = '40px'
                            }else if (points[m][k] == 7 ){
                                pointLeft[m][k] = FIRST_POINT_LEFT + k*ONE_BOX - 8
                                document.getElementById(pointId[m][k]).style.left = pointLeft[m][k]+ "px"
                                pointTop[m][k] = FIRST_POINT_TOP + m*ONE_BOX - 6
                                document.getElementById(pointId[m][k]).style.top = pointTop[m][k]+ "px"
                                document.getElementById(pointId[m][k]).style.backgroundImage = 'url("Pac-Man\ Images/Point.png")'
                                document.getElementById(pointId[m][k]).style.height = '23px'
                                document.getElementById(pointId[m][k]).style.width = '23px'
                                document.getElementById(pointId[m][k]).style.backgroundSize = '23px'
                            }
                            
                        }
                    }
                }
                ghostDirection = ["Right", "Left", "Right", "Left", "Right", "Left","Right", "Left"]
                decidedODirection = [false, false, false, false, false, false, false, false,]
                ghostValueTop = [0,0,0,0,0,0,0,0]
                ghostValueLeft = [0,0,0,0,0,0,0,0]
                ghostStyleTop = [FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP, FIRST_GHOST_TOP]
                ghostStyleLeft = [FIRST_GHOST_LEFT + ONE_BOX, FIRST_GHOST_LEFT + 2*ONE_BOX, FIRST_GHOST_LEFT + 3*ONE_BOX, FIRST_GHOST_LEFT + 4*ONE_BOX, FIRST_GHOST_LEFT + 2*ONE_BOX, FIRST_GHOST_LEFT + 5*ONE_BOX, FIRST_GHOST_LEFT + 5*ONE_BOX, FIRST_GHOST_LEFT + 3*ONE_BOX,]
                prisonX = [0,1,2,3,1,4,4,2]
                ghostInPrison = [true,true,true,true,true,true,true,true]
                ghostSpeed = ghostSpeed * 1.4
            },2000)
        }
    }
})
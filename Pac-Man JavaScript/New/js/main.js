const config = {
    type:   Phaser.AUTO,
    parent: 'phaser-main',
    width:  height*1.8,
    height: height,
    scene:  [ playScene ], //, menuScene
    render: {
        pixelArt: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
}
//original grid 507*507 with 16 px box and 11 px pacman
const grid      = new Item(config.height*3, config.height*3, -give4rthNumber(5, 3, config.height), -config.height)
const pacman    = new Item(give4rthNumber(507, 11, grid.width), give4rthNumber(507, 11, grid.width), config.width/2-height/40, config.height/2-height/32.5)
const gdata     = new GameData(give4rthNumber(507, 16, grid.width), 3, 0, 0, 14, 15, 'Right', 'Right')
const loadingPs = []
for (let i = 0; i<10; i++){
    loadingPs.push(new Item(pacman.width*0.7, pacman.width*0.7, width/2 - pacman.width*0.7 + i*gdata.len, height/2- pacman.width*0.7))
}
const game      = new Phaser.Game(config)
//3 nums method to find len of box
function give4rthNumber(a, b, c){
    return Math.floor((c/a)*b*10)/10
}

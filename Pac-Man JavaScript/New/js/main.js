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
const pacman    = new Item(height/14, height/14, config.width/2-height/35, config.height/2-height/30)
const grid      = new Item(config.height*3, config.height*3, config.width/2, config.height/2)
const gdata     = new GameData(pacman.width*4.205, 3, 0, 0, 14, 15, 'Right', 'Right')
const loadingPs = []
for (let i = 0; i<10; i++){
    loadingPs.push(new Item(pacman.width*0.7, pacman.width*0.7, width/2 - pacman.width*0.7 + i*gdata.len, height/2- pacman.width*0.7))
}
const game      = new Phaser.Game(config)
console.log(gdata.grid)


class loadScene extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }
    init() {
        this.load.image('grid', 'assets/sprites/testgrid.png')
        this.load.image('point', 'assets/sprites/Point.png')
        this.load.spritesheet('PacMan', 'assets/sprites/PacMan.png', { frameWidth: 85, frameHeight: 91 })
        this.add.image(width/2, height/2, 'point').setDisplaySize(height/10, width/10)
    }
    preload() {
        

        /*
        Loader Events:
            complete - when done loading everything
            progress - loader number progress in decimal
        */

        //simulate large load
        
        for(let i = 0; i < 1000; i++){
            this.load.spritesheet("pacman" + i, "./assets/sprites/PacMan.png", {
                frameHeight: 32,
                frameWidth: 32
            });        
        }
        this.load.on("progress", (percent) => {
            if(percent > 1){
            }
        })

        this.load.on("complete", () => {
            console.log('done')
            this.scene.start('gameScene');
        })

        this.load.on("load", (file) => {
            console.log(file.src)
        })
    }
    create() {//create loading bar
        
        


    }
    update(){
    }
}
//https://www.youtube.com/watch?v=OS7neDUUhPE
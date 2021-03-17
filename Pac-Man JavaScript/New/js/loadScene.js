class loadScene extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }
    init() {
    }
    preload() {
        const cam = this.cameras.main
        cam.setBackgroundColor('rgba(55, 11,27, 0.5)')
        var loadingAnimations = true
        
        this.load.image('grid', 'assets/sprites/testgrid.png')
        this.load.image('point', 'assets/sprites/Point.png')
        this.load.spritesheet('PacMan', 'assets/sprites/PacMan.png', { frameWidth: 85, frameHeight: 91 })

        /*
        Loader Events:
            complete - when done loading everything
            progress - loader number progress in decimal
        */

        //simulate large load
        
        for (let i = 0; i < 5000; i++){
            this.load.spritesheet("pacman" + i, "./assets/sprites/PacMan.png", {
                frameHeight: 32,
                frameWidth: 32
            });        
        }
        this.load.on("progress", (percent) => {
            if ((percent > 0.05)&&(loadingAnimations)){
                loadingAnimations = false
                pacman.obj = this.add.sprite(pacman.x,  pacman.y).setDisplaySize(pacman.width, pacman.height).setDisplayOrigin(0).setScrollFactor(0)
                this.anims.create({
                    key: 'eat',
                    frames: this.anims.generateFrameNumbers('PacMan', { frames: [ 0, 1, 2, 3 ] }),
                    frameRate: 10,
                    repeat: -1
                })
                this.anims.create({
                    key: 'idle',
                    frames: this.anims.generateFrameNumbers('PacMan', { frames: [ 0 ] }),
                    frameRate: 1,
                    repeat: -1
                })
                this.add.image(width/2 - pacman.width*0.7, height/2- pacman.width*0.7, 'point').setDisplaySize(pacman.width*0.7, pacman.width*0.7).setDisplayOrigin(0)
                for (let i = 0; i<10; i++){
                    loadingPs.push(new Item(width/2 - pacman.width*0.7 + i*gdata.len, height/2- pacman.width*0.7))
                    loadingPs[i].obj = this.add.image(loadingPs[i].x, loadingPs[i].y, 'point').setDisplaySize(loadingPs[i].width, loadingPs[i].height).setDisplayOrigin(0)
                }
                pacman.obj.play('eat')
                var variableonlyforthenextinterval = 0
                setInterval(()=> {
                    cam.scrollX += gdata.speed
                    variableonlyforthenextinterval += gdata.speed
                    if (variableonlyforthenextinterval >= gdata.len){
                        cam.scrollX -= gdata.len
                        console.log(gdata.len,'  ', variableonlyforthenextinterval)
                        variableonlyforthenextinterval = 0
                    }
                }
                , 10)
            }
        })

        this.load.on("complete", () => {
            //console.log('done')
            this.scene.start('gameScene');
        })

        this.load.on("load", (file) => {
            //console.log(file.src)
        })
    }
    create() {//create loading bar
    }
    update(time, delta){
    }
}
//https://www.youtube.com/watch?v=OS7neDUUhPE
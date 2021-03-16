class playScene extends Phaser.Scene
{
    constructor ()
    {
        super()
        this.pacman = {
            width: config.width/80,
            height: config.width/80,
            x: config.width/2-config.width/85-1,
            y: config.height/2-config.width/60,
            obj: ''
        }
        this.grid = {
            width: config.height*3,
            height: config.height*3,
            x: config.width/2,
            y: config.height/2,
            obj : ''
        }
        this.gdata = new GameData(this.pacman.width*4.205, 3, 0, 0, 14, 15, 'Right', 'Right')
    }

    preload ()
    {
        this.load.image('grid', 'assets/sprites/testgrid.png')
        this.load.spritesheet('PacMan', 'assets/sprites/PacMan.png', { frameWidth: 85, frameHeight: 91 })
        
    }

    create ()
    {
        this.anims.create({
            key: 'eat',
            frames: this.anims.generateFrameNumbers('PacMan', { frames: [ 0, 1, 2, 3 ] }),
            frameRate: 8,
            repeat: -1
        })
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('PacMan', { frames: [ 0 ] }),
            frameRate: 8,
            repeat: -1
        })
        this.pacman.obj = this.add.sprite(this.pacman.x,  this.pacman.y).setDisplaySize(this.pacman.width, this.pacman.height).setDisplayOrigin(0).setScrollFactor(0)
        this.pacman.obj.play('eat')

        this.grid.obj = this.add.image(this.grid.x, this.grid.y, 'grid').setDisplaySize(this.grid.height, this.grid.width)
    }

    update (time, delta)
    {
        const pointer = this.input.activePointer;
        this.cursors = this.input.keyboard.createCursorKeys()

        const cam = this.cameras.main
        cam.setBackgroundColor('rgba(55, 11,27, 0.5)')

        console.log(this.gdata)
        if (this.gdata.currentDirection == 'Right'){
            cam.scrollX += this.gdata.speed
        } else if (this.gdata.currentDirection == 'Left'){
            cam.scrollX -= this.gdata.speed
        } else if (this.gdata.currentDirection == 'Up'){
            cam.scrollY += this.gdata.speed
        } else if (this.gdata.currentDirection == 'Down'){
            cam.scrollY -= this.gdata.speed
        }
        
        if ((this.cursors.left.isDown) || (pointer.leftButtonDown())){
            this.gdata.currentDirection = 'Left'
        } else if (this.cursors.right.isDown){
            this.gdata.currentDirection = 'Right'
        } else if (this.cursors.down.isDown){
            this.gdata.currentDirection = 'Up'
        } else if (this.cursors.up.isDown){
            this.gdata.currentDirection = 'Down'
        }
        // else if (this.cursors.right.isDown)
        // {
        //     data.currentDirection = 'Left'
        // }

        // if (this.cursors.up.isDown)
        // {
        //     data.currentDirection = 'Left'
        // }
        // else if (this.cursors.down.isDown)
        // {
        //     data.currentDirection = 'Left'
        // }
    }
}
class playScene extends Phaser.Scene
{
    constructor ()
    {
        super('gameScene')
    }

    preload (){
        this.load.image('grid', 'assets/sprites/testgrid.png')
        this.load.image('point', 'assets/sprites/Point.png')
        this.load.spritesheet('PacMan', 'assets/sprites/PacMan.png', { frameWidth: 85, frameHeight: 91 })
    }

    create ()
    {
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
        grid.obj = this.add.image(grid.x, grid.y, 'grid').setDisplaySize(grid.height, grid.width)
        pacman.obj = this.add.sprite(pacman.x,  pacman.y, 'PacMan').setDisplaySize(pacman.width, pacman.height).setDisplayOrigin(0).setScrollFactor(0)
        pacman.obj.play('eat')
    }

    update (time, delta)
    {
        const cam = this.cameras.main
        cam.setBackgroundColor('rgba(55, 11,27, 0.5)')
        this.cursors = this.input.keyboard.createCursorKeys()
        this.pointer = this.input.activePointer;
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        if (gdata.currentDirection == 'Right'){
            cam.scrollX += gdata.speed
        } else if (gdata.currentDirection == 'Left'){
            cam.scrollX -= gdata.speed
        } else if (gdata.currentDirection == 'Up'){
            cam.scrollY += gdata.speed
        } else if (gdata.currentDirection == 'Down'){
            cam.scrollY -= gdata.speed
        }
        
        if ((this.cursors.left.isDown) || (this.pointer.leftButtonDown())){
            gdata.changeDirection('Left')
        } else if (this.cursors.right.isDown){
            gdata.changeDirection('Right')
        } else if (this.cursors.down.isDown){
            gdata.changeDirection('Up')
        } else if (this.cursors.up.isDown){
            gdata.changeDirection('Down')
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
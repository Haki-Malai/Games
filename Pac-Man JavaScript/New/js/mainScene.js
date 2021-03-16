class main extends Phaser.Scene
{
    constructor ()
    {
        super()
    }

    preload ()
    {
        this.load.image('grid', 'assets/sprites/testgrid.png')
        this.load.spritesheet('PacMan', 'assets/sprites/PacMan.png', { frameWidth: 85, frameHeight: 91 })
        
    }

    create ()
    {
        const pacman = {
            width: config.width/80,
            height: config.width/80,
            x: config.width/2-config.width/85-1,
            y: config.height/2-config.width/60,
            obj: ''
        }
        this.anims.create({
            key: 'eat',
            frames: this.anims.generateFrameNumbers('PacMan', { frames: [ 0, 1, 2, 3 ] }),
            frameRate: 8,
            repeat: 1
        })
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('PacMan', { frames: [ 0 ] }),
            frameRate: 8,
            repeat: -1
        })
        pacman.obj = this.add.sprite(pacman.x,  pacman.y).setDisplaySize(pacman.width, pacman.height).setDisplayOrigin(0).setScrollFactor(0)
        pacman.obj.play('eat')

        const grid = {
            width: config.height*3,
            height: config.height*3,
            x: config.width/2,
            y: config.height/2,
            obj : ''
        }
        grid.obj = this.add.image(grid.x, grid.y, 'grid').setDisplaySize(grid.height, grid.width)

        const cursors = this.input.keyboard.createCursorKeys()
        const cam = this.cameras.main
        cam.setBackgroundColor('rgba(55, 11,27, 0.5)')
        cam.scrollY += pacman.width*4.205*14*-1
    }

    update (time, delta)
    {
    }
}
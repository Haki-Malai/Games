class main extends Phaser.Scene
{
    constructor ()
    {
        super()
    }

    preload ()
    {
        this.load.image('grid', 'assets/sprites/testgrid.png')
        this.load.spritesheet('PacMan', 'assets/sprites/PacMan.png', { frameWidth: 86, frameHeight: 90 })
    }

    create ()
    {
        const pacman = {
            width: width/75,
            height: width/75,
            x: width/2 - 27,
            y: height/2 - 34
        }
        const grid = this.add.image(width/2, height/2, 'grid').setDisplaySize(width*2, width*2)
        const cursors = this.input.keyboard.createCursorKeys()
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
        const cody = this.add.sprite(pacman.x,  pacman.y).setDisplaySize(pacman.width, pacman.height).setDisplayOrigin(0)
        cody.play('idle')
    }

    update (time, delta)
    {
        const cam = this.cameras.main
    }
}
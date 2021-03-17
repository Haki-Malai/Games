const width = window.innerWidth
const height = window.innerHeight

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-main',
    width: height*1.8,
    height: height,
    scene: [ loadScene, playScene ], //, menuScene
    render: {
        pixelArt: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
};

const game = new Phaser.Game(config);


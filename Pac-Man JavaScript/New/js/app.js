const width = window.innerWidth
const height = window.innerHeight

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-main',
    width: height*1.8,
    height: height,
    scene: [ main ]
};

const game = new Phaser.Game(config);


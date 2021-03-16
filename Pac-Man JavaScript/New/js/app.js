const width = window.innerWidth
const height = window.innerHeight

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-main',
    width: width,
    height: height,
    scene: [ main ]
};

const game = new Phaser.Game(config);


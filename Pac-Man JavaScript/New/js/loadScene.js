class loadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }
    init() {

    }
    loadImages() {
        this.load.setPath("./assets/sprite");

        for (let prop in CST.IMAGE) {
            this.load.image(CST.IMAGE[prop], CST.IMAGE[prop]);
        }
    }
    loadAudio() {
        this.load.setPath("./assets/sprite");

        for (let prop in CST.AUDIO) {
            //@ts-ignore
            this.load.audio(CST.AUDIO[prop], CST.AUDIO[prop]);
        }
    }
    loadSprites(frameConfig) {
        this.load.setPath("./assets/sprite");

        for (let prop in CST.SPRITE) {
            //@ts-ignore
            this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], frameConfig);
        }
    }
    preload() {
        this.load.spritesheet("grid", "./assets/sprites/grid.png", {frameHeight: 64, frameWidth: 64});
        //load atlases
        this.load.atlas("pacman", "./assets/sprites/PacMan.png")
        this.load.atlas("testgrid", "./assets/sprites/testgrid.png", "./assets/sprite/daze.json")
        this.load.spritesheet("start", "./assets/sprites/start.png", {frameHeight: 192, frameWidth: 192});

        //load image, spritesheet, sound
        this.loadAudio();
        this.loadSprites({
            frameHeight: 32,
            frameWidth: 32
        });
        this.loadImages();

        //create loading bar

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        })

        /*
        Loader Events:
            complete - when done loading everything
            progress - loader number progress in decimal
        */

        //simulate large load
        /*
        for(let i = 0; i < 100; i++){
            this.load.spritesheet("cat" + i, "./assets/cat.png", {
                frameHeight: 32,
                frameWidth: 32
            });        
        }*/

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(this.game.renderer.width / 2, 0, 50, this.game.renderer.height * percent);
            console.log(percent);
        })

        this.load.on("complete", () => {
            //this.scene.start(CST.SCENES.MENU, "hello from LoadScene");
        });

        this.load.on("load", (file) => {
            console.log(file.src)
        })
    }
    create() {

        this.scene.start(CST.SCENES.MENU);
    }
}
//https://www.youtube.com/watch?v=OS7neDUUhPE
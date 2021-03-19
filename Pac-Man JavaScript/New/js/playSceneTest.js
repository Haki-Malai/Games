class playSceneTest extends Phaser.Scene
{
    constructor ()
    {
        super('playSceneTest')
    }
    preload ()
    {
        this.load.tilemapTiledJSON('map', 'assets/jsons/grid.json', null, Phaser.Tilemap.TILED_JSON)
        this.load.image('tiles', 'assets/tiles/tiles.png')
    }


    create ()
    {
        var map
        var layer
        this.stage.backgroundColor = '#787878'
        map = this.add.tilemap('map')
        map.addTilesetImage('tiles', 'tiles')
        layer = map.createLayer('Tile Layer 1')
        layer.resizeWorld()
    }
}
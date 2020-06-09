import Player from '../gameObjects/Player';

const registerPlayer = () => {
    Phaser.GameObjects.GameObjectFactory.register('player', function(x, y) {
        const player = new Player({
            scene: this.scene,
            x, y
        });
    
        this.displayList.add(player);
        this.updateList.add(player);
        this.scene.physics.world.enableBody(
          player,
          Phaser.Physics.Arcade.DYNAMIC_BODY
        );
    
        player.body.setSize(player.width * .5, player.height * .7);
        player.body.setOffset(25, 30);
        player.setCollideWorldBounds(true);
        player.setDragX(player.VELOCITY * 1.5);
    
        return player;
    });
};

export default registerPlayer;
import Phaser from 'phaser';
import createPlayerAnims from '../lib/animations/playerAnims';
import registerPlayer from '../lib/registrations/registerPlayer';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'boot' });
    }

    preload() {
        this.loadImages();
        this.loadTileMaps();
        this.loadSounds();
        this.handleLoadEvents();
    }

    create() {
        createPlayerAnims(this.anims);
        registerPlayer();
    }

    loadImages() {
        this.load.image('playerWalk1', '../images/player/platformChar_walk1.png');
        this.load.image('playerWalk2', '../images/player/platformChar_walk2.png');
        this.load.image('playerIdle', '../images/player/platformChar_idle.png');
        this.load.image('playerJump', '../images/player/platformChar_jump.png');
        this.load.image('tiles', '../images/maps/tiles_extruded.png');
    }

    loadTileMaps() {
        this.load.tilemapTiledJSON('levelOne', '../images/maps/LevelOne.json');
    }
    
    loadSounds() {
        this.load.audio("jump", ["../audio/phaseJump3.ogg"]);
        this.load.audio("music", [
            '../audio/worldmusic.wav'
        ]);
    }

    handleLoadEvents(){
        this.loadingText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Loading: 0%', {
            fontSize: '64px'
        }).setOrigin(0.5);
        
        this.load.on('progress', (progress) => {
            this.loadingText.setText(`Loading: ${Math.floor(progress * 100)}%`);
        });

        this.load.on('complete', () => {
            this.scene.start('game');
        });
    }
}

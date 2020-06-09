import Phaser from 'phaser';
import StateMachine from '../stateMachines/stateMachine';
import { IdleState, MoveState, JumpState } from '../stateMachines/states/playerStates';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor({ scene, x, y }) {
        super(scene, x, y, 'playerIdle');

        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.VELOCITY = 300;
        this.JUMP_HEIGHT = -700;

        this.scene.cameras.main.setBounds(0, 0, 6400, 640);
        this.scene.cameras.main.startFollow(this, true, 0.05, 0);
        this.jump = this.scene.sound.add("jump");

        this.configureTimer();

        this.stateMachine = new StateMachine(
            "idle",
            {
              idle: new IdleState(),
              move: new MoveState(),
              jump: new JumpState()
            },
            [scene, this]
          );

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.stateMachine.step();
        this.runTimer();
    }

    configureTimer() {
        //Timer Data
        this.frameCount = 60;
        this.timer = 30;
        this.scene.registry.set('timer', this.timer);
    }

    runTimer() {
        //Timer based off 60 frames per second.
        this.frameCount -= 1;

        if(this.frameCount === 0) {
            this.frameCount = 60;
            this.timer -= 1;
        }

        //Die when out of time.
        if(this.timer === 0) {
            this.die();
        }

        this.scene.registry.values.timer = this.timer;
    }

    die() {
        this.scene.sound.removeAll();
        this.scene.scene.restart();
    }
}

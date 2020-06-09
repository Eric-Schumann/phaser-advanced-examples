import State from '../state';

/*Create Player States*/
class IdleState extends State {
  enter(scene, player) {
    player.anims.play("idle");
  }

  execute(scene, player) {
    const { left, right, space } = player.cursors;

    if (space.isDown && player.body.onFloor()) {
      this.stateMachine.transition("jump");
    }

    if (left.isDown || right.isDown) {
      this.stateMachine.transition("move");
    }
  }
}

class MoveState extends State {
  enter(scene, player) {
    player.anims.play("run");
  }

  execute(scene, player) {
    const { left, right, space } = player.cursors;

    if (left.isDown) {
      player.setVelocityX(-player.VELOCITY);
      player.flipX = true;
    } else if (right.isDown) {
      player.setVelocityX(player.VELOCITY);
      player.flipX = false;
    }

    if (space.isDown) {
      this.stateMachine.transition("jump");
    }

    if (player.body.velocity.x === 0) {
      this.stateMachine.transition("idle");
    }
  }
}

class JumpState extends State {
  enter(scene, player) {
    player.anims.play("jump");
    player.setVelocityY(player.JUMP_HEIGHT);
    player.jump.play();
  }

  execute(scene, player) {
    const { left, right } = player.cursors;

    if (left.isDown) {
      player.setVelocityX(-player.VELOCITY);
      player.flipX = true;
    }

    if (right.isDown) {
      player.setVelocityX(player.VELOCITY);
      player.flipX = false;
    }

    if (player.body.onFloor()) {
      if (player.body.velocity.x !== 0) {
        this.stateMachine.transition("move");
      } else {
        this.stateMachine.transition("idle");
      }
    }
  }
}

export {
  IdleState,
  MoveState,
  JumpState
}
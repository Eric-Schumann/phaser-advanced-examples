const createPlayerAnims = (anims) => {
            //Run animation.
            anims.create({
                key: 'run',
                frames: [
                    { key: 'playerWalk1' },
                    { key: 'playerWalk2' }
                ],
                frameRate: 4,
                repeat: -1
            });
    
            //Idle animation.
            anims.create({
                key: 'idle',
                frames: [{ key: 'playerIdle' }],
                frameRate: 0,
                repeat: 0
            });
    
            //Jump animation.
            anims.create({
                key: 'jump',
                frames: [{ key: 'playerJump' }],
                frameRate: 0,
                repeat: 0
            });
};

export default createPlayerAnims;
export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture){
        super(scene,x,y,texture);

        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.setScale(0.1);
        this.setCollideWorldBounds(true);

        this.NORMAL_SPEED=200;

        this.cursors=scene.cursors;
    }
    hitEnemy(){
        this.disableBody(true,true);
    }
    update(){
        if(!this.active) return;

        const isRightDown=this.cursors.right.isDown;
        const isLeftDown=this.cursors.left.isDown;
        const isUpDown=this.cursors.up.isDown;
        const isDownDown=this.cursors.down.isDown;
        let targetVelocityX=0;
        let targetVelocityY=0;

        if(isRightDown){
            targetVelocityX=this.NORMAL_SPEED;
        }
        else if(isLeftDown){
            targetVelocityX=-this.NORMAL_SPEED;
        }
        this.setVelocityX(targetVelocityX);
        if(isUpDown){
            targetVelocityY=-this.NORMAL_SPEED;
        }else if(isDownDown){
            targetVelocityY=this.NORMAL_SPEED;
        }
        this.setVelocityY(targetVelocityY);
    }
}
export class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture){
        super(scene,x,y,texture);

        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setScale(0.1);
        this.body.setSize(this.width, this.height);
        this.setVelocityX(-100);
        
    }
    update(){
        if(!this.active) return;

        if(this.body.blocked.left){
            this.setVelocityX(100);
        }else if(this.body.blocked.right){
            this.setVelocityX(-100);
        }
        if(this.body.onFloor() && !this.body.blocked.left && !this.body.blocked.right){
            this.setVelocityX(-100);
        }
    }
}
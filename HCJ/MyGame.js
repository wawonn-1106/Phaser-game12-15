import {Player} from './Player.js';
import {Enemy} from './Enemy.js';

class MyGame extends Phaser.Scene{
    constructor(){
        super({key:'MyGame'});

        this.player=null;
        this.enemyGroup=null;
        this.cursors=null;
    }
    preload(){
        this.load.image('sky','assets/sky.png');
        this.load.image('player','assets/player.png');
        this.load.image('zombie','assets/zombie.png');
        this.load.image('pumpkin','assets/pumpkin.png');
        this.load.image('ghost','assets/ghost.png');
        this.load.image('tileset','assets/tileset.jpg');
    }
    create(){
        this.add.image(0,0,'sky').setOrigin(0,0).setScale(10);
        const mapData=[
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
            [1,3,1,1,3,1,1,3,1,3,1,1,3,1,1,3,1],
            [1,3,1,1,3,1,1,3,1,3,1,1,3,1,1,3,1],
            [1,3,1,1,3,1,1,3,1,3,1,1,3,1,1,3,1],
            [1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
            [1,1,1,3,1,1,1,1,3,1,1,1,1,3,1,1,1],
            [3,3,1,3,1,3,3,3,3,3,3,3,1,3,1,3,3],
            [1,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,1],
            [1,3,1,3,1,3,3,3,1,3,3,3,1,3,1,3,1],
            [1,3,3,3,3,3,1,3,1,3,1,3,3,3,3,3,1],
            [1,3,1,1,3,1,1,3,1,3,1,1,3,1,1,3,1],
            [1,3,1,1,3,3,3,3,3,3,3,3,3,1,1,3,1],
            [1,3,1,1,3,1,1,1,1,1,1,1,3,1,1,3,1],
            [1,3,3,3,3,1,3,3,3,3,3,1,3,3,3,3,1],
            [1,1,1,1,1,1,3,3,3,3,3,1,1,1,1,1,1],
        ];
        const map=this.make.tilemap({
            data:mapData,
            tileWidth:50,
            tileHeight:50
        });
        const tileset=map.addTilesetImage('tileset','tileset');
        const worldLayer=map.createLayer(0,tileset,0,0);

        worldLayer.setCollision([1]);

        this.cursors=this.input.keyboard.createCursorKeys();

        this.player=new Player(this,100,400,'player');

        this.enemyGroup=this.physics.add.group();
        const enemyData=[
            {x:500,y:100,key:'pumpkin'},
            {x:600,y:100,key:'zombie'},
            {x:700,y:100,key:'ghost'}
        ];

        enemyData.forEach(data=>{
            this.enemyGroup.add(new Enemy(this,data.x,data.y,data.key));
        });
        
        this.physics.add.collider(this.player,worldLayer);
        this.physics.add.collider(this.enemyGroup,worldLayer);
        this.physics.add.collider(this.player,this.enemyGroup,(player,enemy)=>{
            player.hitEnemy();
            if(!player.active) {
                enemy.setVelocityX(0);
            }
        },null,this);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0,0,850,800);
        
    }
    update(){
        this.player.update();
        this.enemyGroup.children.each(enemy=>enemy.update());
    }
}

const config={
    type:Phaser.AUTO,
    width:850,
    height:800,
    physics:{
        default:'arcade',
        arcade:{
            gravity:{y:0},
            debug:false
        }
    },
    scene:MyGame
}

const game=new Phaser.Game(config);
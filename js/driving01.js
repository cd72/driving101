var config = {
    type: Phaser.AUTO,
    width: 360,
    height: 640,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'matter',
        matter: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var cursors;
var player;
var game = new Phaser.Game(config);
var speed = 0.04;

async function turnLeft() {
    console.log('Hello from the left Key!');
    car.setVelocity(0,0);
    car.angle = car.angle - 45;
    await sleep(50);
    car.angle = car.angle - 45;
    car.thrust(speed);
    
}
    
async function turnRight() {
    console.log('Hello from the right Key!');
    car.setVelocity(0,0)
    car.angle = car.angle + 45;
    await sleep(50)
    car.angle = car.angle + 45;
    car.thrust(speed);
}

function createCar(scene) {
    car = scene.matter.add.image(50, 600, 'car');
    car.setAngle(-90);
    car.setFrictionAir(0.0);
    car.setMass(10);
    car.thrust(speed);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createKeyboardControls(scene) {
    cursors = scene.input.keyboard.createCursorKeys();
    cursors.left.addListener('down', turnLeft);
    cursors.right.addListener('down', turnRight);
}

function createOnScreenControls(scene) {
    const leftButton = scene.add.text(20, 600, 'Left', { fill: '#0f0', fontSize: 36 });
    leftButton.setInteractive();    
    leftButton.on('pointerdown', turnLeft);
 
    const rightButton = scene.add.text(230, 600, 'Right', { fill: '#0f0', fontSize: 36 });
    rightButton.setInteractive();
    rightButton.on('pointerdown', turnRight);
}

function createBuildings(scene) {
    //rect1 = scene.add.rectangle(60,100,10,100,400,0xff0000);
    rect1_visual = scene.add.rectangle(10,500,10,150,0x80ffff);
    rect1 = scene.matter.add.rectangle(10,500,10,150,{ isStatic: true });
    rect2_visual = scene.add.rectangle(85,420,160,10,0x80ffff);
    rect2 = scene.matter.add.rectangle(85,420,160,10,{ isStatic: true });
    rect3_visual = scene.add.rectangle(90,550,10,90,0x80ffff);
    rect3 = scene.matter.add.rectangle(90,550,10,90,{ isStatic: true });
    rect4_visual = scene.add.rectangle(10,520,10,150,0x80ffff);
    rect4 = scene.matter.add.rectangle(10,520,10,150,{ isStatic: true });
    
    //rect3 = [100,300,200,10];
    //r3 = scene.add.rectangle.apply(rect3,0x80ffff,128);
    //r4 = scene.matter.add.rectangle.apply(rect3,{ isStatic: true });
    
    //scene.physics.add.existing(line1)
    //line1.body.collideWorldBounds = true;
}

function preload () {
    this.load.image('car', 'assets/car.png');
}

function create () {
    console.log(this.constructor.name);
    
    createCar(this);
    
    this.matter.world.setBounds(0, 0, 360, 640);

    createKeyboardControls(this);
    createOnScreenControls(this);
    
    createBuildings(this);
    
    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
        console.log('collision');
        //let gameOverText = this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', { fontSize: '32px', fill: '#fff' });
    })

}


function update ()
{
}


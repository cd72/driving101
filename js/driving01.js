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

function createCar(scene) {
    car = scene.matter.add.image(180, 600, 'car');
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
    line1 = scene.add.line(0,0,10,10,400,400,0xff0000);
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

}

function turnLeft() {
    console.log('Hello from the left Key!');
    car.setVelocity(0,0)
    car.angle = car.angle - 45;
    
    sleep(50).then(() => {
        car.angle = car.angle - 45;
        car.thrust(speed);
    })
    
}
    
function turnRight() {
    console.log('Hello from the right Key!');
    car.setVelocity(0,0)
    car.angle = car.angle + 45;
    
    sleep(50).then(() => {
        car.angle = car.angle + 45;
        car.thrust(speed);
    })
}

function update ()
{
}


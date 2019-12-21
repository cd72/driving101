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

function preload () {
    this.load.image('car', 'assets/car.png');
}

function create () {
    cursors = this.input.keyboard.createCursorKeys();
    //this.input.keyboard.on(cursors.left, rotateLeft);
    cursors.left.addListener('down', turnLeft)
    cursors.right.addListener('down', turnRight)
    
    car = this.matter.add.image(100, 100, 'car');
    car.setAngle(-90);
    car.setFrictionAir(0.0);
    car.setMass(10);
    
    car.thrust(speed);
    
    this.matter.world.setBounds(0, 0, 360, 640);
        
    const leftButton = this.add.text(50, 600, 'Left', { fill: '#0f0' });
    leftButton.setInteractive();    
    leftButton.on('pointerdown', turnLeft);
 
    const rightButton = this.add.text(260, 600, 'Right', { fill: '#0f0' });
    rightButton.setInteractive();
    rightButton.on('pointerdown', turnRight);

}

function turnLeft() {
    console.log('Hello from the left Key!');
    car.setVelocity(0,0)
    car.angle = car.angle - 90;
    car.thrust(speed);
}
    
function turnRight() {
    console.log('Hello from the right Key!');
    car.setVelocity(0,0)
    car.angle = car.angle + 90;
    car.thrust(speed);
}

function update ()
{
}


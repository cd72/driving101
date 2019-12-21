var config = {
    type: Phaser.AUTO,
    width: 300,
    height: 400,
    physics: {
        default: 'matter',
        matter: {
            debug: true,
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

function preload ()
{
    this.load.image('car', 'assets/car.png');
}

function create ()
{
    cursors = this.input.keyboard.createCursorKeys();
    //this.input.keyboard.on(cursors.left, rotateLeft);
    cursors.left.addListener('down', turnLeft)
    cursors.right.addListener('down', turnRight)
    
    car = this.matter.add.image(100, 100, 'car');
    car.setAngle(-90);
    car.setFrictionAir(0.0);
    car.setMass(10);
    
    car.thrust(speed);
    
    this.matter.world.setBounds(0, 0, 300, 400);
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

function render() {

    //game.debug.spriteInfo(car, 32, 32);
    // game.debug.text('angularVelocity: ' + player.body.angularVelocity, 32, 200);
    // game.debug.text('angularAcceleration: ' + player.body.angularAcceleration, 32, 232);
    // game.debug.text('angularDrag: ' + player.body.angularDrag, 32, 264);
    // game.debug.text('deltaZ: ' + player.body.deltaZ(), 32, 296);
    game.debug.text('Speed: ' + car.body.speed, 32, 100);

}

var player = {
    thrusting: false,
    xVelocity: 0, yVelocity: 0,
    init: function init() {
        document.addEventListener("keydown", this.keyDown);
        document.addEventListener("keyup", this.keyUp);
        var playerSpecs = createSpaceShipType(30, 70, "player.png", 50, "placeholder", 0.005, 0, 1)({x: 100, y: 100, armour: "placeholder", weapons: "placeholder", shield: "placeholder", inventory: "placeholder", devices: "placeholder"}, playerCollisionHandler, false);
        Object.assign(this, playerSpecs);
        this.angle = 0;
        game.registerGameObject(this);
    },
    //Swap player for this in the event listeners
    update: function update() {
        var playerX = player.x + player.width / 2;
        var playerY = player.y + player.height / 2;
        player.angle = getAngleBetween({x: playerX, y: playerY}, {x: mouseX, y: mouseY});
        if(this.thrusting) {
            this.yVelocity -= this.baseAcc * Math.cos(toRadians(this.angle));
            this.xVelocity += this.baseAcc * Math.sin(toRadians(this.angle));
        }
        if(this.xVelocity >= this.baseMaxSpeed) this.xVelocity = this.baseMaxSpeed;
        if(this.xVelocity <= -this.baseMaxSpeed) this.xVelocity = -this.baseMaxSpeed;
        if(this.yVelocity >= this.baseMaxSpeed) this.yVelocity = this.baseMaxSpeed;
        if(this.yVelocity <= -this.baseMaxSpeed) this.yVelocity = -this.baseMaxSpeed;
        this.x += this.xVelocity;
        this.y += this.yVelocity;
    },
    render: function render() {
        this.element.style.transform = `rotate(${this.angle}deg`;
        this.element.style.top = this.y + "px";
        this.element.style.left = this.x  + "px";
    },
    keyDown: function keyDown() {
        if(event.which == 38) {
            player.thrusting = true;
        } 
    },
    keyUp: function keyUp() {
        if(event.which == 38) {
            player.thrusting = false;
        }
    }
}
var playerCollisionHandler = createCollisionHandlerType(
    function(other) {
        console.log(`I, ${this.weapons}, bumped into ${other.weapons}. ${other.weapons} is of type ${typeof other}. I am at (${this.x}, ${this.y}), and I am (${this.width}, ${this.height}) big. My friend is at (${other.x}, ${other.y}) and is (${other.width}, ${other.height}) big.`);
        console.log(this.weapons);
        other.collisionHandler.callBack.call(this, other);
    }, 
    function(other) {
        console.log(`This is a callBack which has been passed to me by ${other.weapons}, but is being excuted on me, ${this.weapons}.`);
    }
);
player.init();
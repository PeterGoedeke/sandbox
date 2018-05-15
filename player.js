var playerCollisionHandler = createCollisionHandlerType(
    function(other) {
        console.log(`I, ${this.class}, bumped into ${other.class}. ${other.class} is of type ${typeof other}. I am at (${this.x}, ${this.y}), and I am (${this.width}, ${this.height}) big. My friend is at (${other.x}, ${other.y}) and is (${other.width}, ${other.height}) big.`);
        console.log(this.class);
        other.collisionHandler.callBack.call(this, other);
    }, 
    function(other) {
        console.log(`This is a callBack which has been passed to me by ${other.class}, but is being excuted on me, ${this.class}.`);
    }
);

var playerClassSpecs = {
    class: "Player",
    width: 30,
    height: 70,
    image: "player.png",
    mass: "placeholder",
    baseArmour: "placeholder",
    baseAcc: 0.02,
    baseManu: "placeholder",
    baseMaxSpeed: 2.5
}
var playerSpecs = {
    x: 250,
    y: 250,
    armour: "placeholder",
    weapons: "placeholder",
    shield: "placeholder",
    inventory: "placeholder",
    devices: "placeholder",
    collisionHandler: playerCollisionHandler
}

var player = {
    exhaustHandlers: [],
    thrusting: false,
    xVelocity: 0, yVelocity: 0, angle: 0,
    init: function init() {
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);
        document.addEventListener("keydown", this.keyDown);
        document.addEventListener("keyup", this.keyUp);
        var playerShip = createSpaceShipClass(playerClassSpecs)(playerSpecs, false);
        console.log(playerShip.exhaustHandlers);
        Object.assign(this, playerShip);
        console.log(this.exhaustHandlers);
        console.log(this.init);
        this.collisionHandler.addTo(this);
        this.collisionHandler.init();
        initDisplayElement(this);
        game.registerGameObject(this);
        this.exhaustHandlers.push(createExhaustHandler(this, 0, this.height * 8 / 10, this.width / 3, this.height, "exhaust.png"));
        this.exhaustHandlers.push(createExhaustHandler(this, this.width / 3, this.height * 8 / 10, this.width / 3, this.height, "exhaust.png"));
        this.exhaustHandlers.push(createExhaustHandler(this, this.width / 3 * 2, this.height * 8 / 10, this.width / 3, this.height, "exhaust.png"));
    },
    //Swap player for this in the event listeners
    update: function update() {
        var playerX = this.x + this.width / 2;
        var playerY = this.y + this.height / 2;
        player.angle = getAngleBetween({x: playerX, y: playerY}, {x: mouseX, y: mouseY});
        if(this.thrusting) {
            this.yVelocity -= this.baseAcc * Math.cos(toRadians(this.angle));
            this.xVelocity += this.baseAcc * Math.sin(toRadians(this.angle));
        }
        //Use vectors to work this out better
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
        for(let handler of this.exhaustHandlers) handler.render(this.thrusting);
    },
    keyDown: function keyDown() {
        if(event.which == 38) {
            this.thrusting = true;
        } 
    },
    keyUp: function keyUp() {
        if(event.which == 38) {
            this.thrusting = false;
        }
    }
}
player.init();
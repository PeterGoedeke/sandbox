var player = {
    init: function init() {
        document.addEventListener("keydown", this.keyDown);
        document.addEventListener("keyup", this.keyUp);
        document.addEventListener('mousemove', this.trackMouse);
        var playerSpecs = createSpaceShipType(30, 70, "player.png", 50, "placeholder", 0.02, 5, 2)
            ({x: 100, y: 100, armour: "placeholder", weapons: "placeholder", shield: "placeholder", inventory: "placeholder", devices: "placeholder"}, playerCollisionHandler);
        mixin(this, playerSpecs);
        this.angle = 0;
        game.registerGameObject(this);
        initDisplayElement(this);
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    },
    update: function update() {
        
    },
    render: function render() {
        this.element.style.transform = `rotate(${this.angle}deg`;
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
    },
    trackMouse: function trackMouse(event) {
        var playerX = player.x + player.width / 2;
        var playerY = player.y + player.height / 2;
        var angleToMouse = getAngleBetween({x: playerX, y: playerY}, {x: event.pageX, y: event.pageY});
        player.angle = angleToMouse;
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

/*
const Player = (function() {
    let [x, y] = [250, 500];
    let [width, height] = [15, 35];
    let [xVelocity, yVelocity] = [0, 0];
    let acceleration = 0.05;
    let maxSpeed = 2.5;
    let angle = 0;
    let element = document.querySelector(".player");

    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);

    let [leftArrow, rightArrow, upArrow] = [false, false, false];
    let thrusting = false;

    function keyDown() {
        switch (event.which) {
            case 37:
            leftArrow = true;
            break;
            case 38:
            upArrow = true;
            break;
            case 39:
            rightArrow = true;
        }
    }
    function keyUp() {
        switch (event.which) {
            case 37:
            leftArrow = false;
            break;
            case 38:
            upArrow = false;
            break;
            case 39:
            rightArrow = false;
        }
    }

    function move(event) {
        var direction;
        if(leftArrow) {
            angle -= 5;
        }
        if(rightArrow) {
            angle += 5;
        }
        if(upArrow) {
            yVelocity -= acceleration * Math.cos(toRadians(angle));
            xVelocity += acceleration * Math.sin(toRadians(angle));
        }
        if(xVelocity >= maxSpeed) xVelocity = maxSpeed;
        if(xVelocity <= -maxSpeed) xVelocity = -maxSpeed;
        if(yVelocity >= maxSpeed) yVelocity = maxSpeed;
        if(yVelocity <= -maxSpeed) yVelocity = -maxSpeed;
    }

    function getX() {
        return x;
    }
    function getY() {
        return y;
    }
    function getThrusting() {
        return thrusting;
    }

    var toRadians = (term) => term * (Math.PI / 180);

    function init() {
        element.style.width = width + "px";
        element.style.height = height + "px";
        particleHandler = new ParticleHandler(this);
        particleHandler.init();
    }

    function update() {
        move();
        if(upArrow) thrusting = true;
        else thrusting = false;
        particleHandler.update();
        x += xVelocity;
        y += yVelocity;
        element.style.transform = `rotate(${angle}deg`;
        element.style.top = y + "px";
        element.style.left = x  + "px";
        requestAnimationFrame(Player.update);
    }

    return {
        update: update,
        init: init,
        getX: getX, getY: getY, width: width, height: height,
        element: element, thrusting: getThrusting
    }
})();
*/
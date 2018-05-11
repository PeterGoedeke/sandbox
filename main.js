const Player = (function() {
    let [x, y] = [250, 500];
    let [width, height] = [15, 35];
    let [xVelocity, yVelocity] = [0, 0];
    let acceleration = 0.05;
    let maxSpeed = 2.5;
    let angle = 0;
    let element = document.querySelector(".player");
    let image = 

    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);

    let [leftArrow, rightArrow, upArrow] = [false, false, false];

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

    var toRadians = (term) => term * (Math.PI / 180);

    function init() {
        element.style.width = width + "px";
        element.style.height = height + "px";
    }

    function update() {
        move();
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
        getX: getX, getY: getY, width: width, height: height
    }
})();

const Wall = (function() {
    let [x, y] = [245, 50];
    var [width, height] = [25, 25];
    var element = document.querySelector(".wall");

    function init() {
        element.style.width = width + "px";
        element.style.height = height + "px";
        element.style.top = y + "px";
        element.style.left = x  + "px";
    }

    function getX() {
        return x;
    }
    function getY() {
        return y;
    }

    return {
        init: init,
        getX: getX, getY: getY, width: width, height: height
    }
})();

const Collidable = {
    mass: null,
    onCollide: function() {
        delete this;
    }
}

const CollisionHandler = (function() {
    var collidables = [];

    function colliding(entity, other) {
        var collidingX = (entity.getX() < other.getX() + other.width && entity.getX() + entity.width > other.getX());
        var collidingY = (entity.getY() < other.getY() + other.width && entity.getY() + entity.width > other.getY());
        //var collidingY = (entity.y < other.y + other.height && entity.y + entity.height > other.y);
        //console.log(entity.x);
        return (collidingX && collidingY);
    }

    function testForCollisions() {
        for(let i = 0; i < collidables.length; i++) {
            for(let j = 1; j < collidables.length && i != j; j++) {
                if(colliding(collidables[i], collidables[j])) console.log(collidables[0].getX());
                //console.log("tested " + i + " " + j);
            }
        }
    }

    return {
        testForCollisions: testForCollisions,
        collidables: collidables
    }
})();


//window.requestAnimationFrame(Player.update);
Player.init();
Player.update();

Object.assign(Player, Collidable);
Object.assign(Wall, Collidable);

Wall.init();

CollisionHandler.collidables.push(Player);
CollisionHandler.collidables.push(Wall);

window.setInterval(CollisionHandler.testForCollisions, 1);
//CollisionHandler.testForCollisions();
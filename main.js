const Player = (function() {
    let [x, y] = [250, 500];
    var [width, height] = [5, 25];
    var [xVelocity, yVelocity] = [0, 0];
    var acceleration = 1;
    var maxSpeed = 2;
    var angle = 0;
    var element = document.querySelector(".player");
    document.addEventListener('keydown', move);

    function move(event) {
        var direction;
        switch (event.which) {
            case 37:
            angle -= 5;
            break;
            case 38:
            yVelocity -= acceleration * Math.cos(toRadians(angle));
            xVelocity += acceleration * Math.sin(toRadians(angle));
            break;
            case 39:
            angle += 5;
            break;
            case 40:
            //yVelocity += Math.cos(toRadians(angle));
            //xVelocity += Math.sin(toRadians(angle));
            break;
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
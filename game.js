var MasterCollisionHandler = {
    collidables: [],
    registerCollidable: function(collidable) {
        this.collidables.push(collidable);
    },
    checkForCollision: function() {
        console.log(this.collidables);
        for(let i = 0; i < this.collidables.length; i++) {
            for(let j = 1; j < this.collidables.length && i != j; j++) {
                if(this.collidables[i].test == "original" && this.collidables[j].test == "other") {
                    this.collidables[i].collisionHandler.respond(this.collidables[j]);
                }
            }
        }
    }
}

var CollisionHandlerProto = {
    init: function() {
       MasterCollisionHandler.registerCollidable(this);
    },
    respond: function(other) {
        console.log(other.width);
    }
}

var ExhaustHandlerProto = {
    init: function() {

    },
    update: function() {

    },
    render: function() {

    }
}

var SpaceShipProto = {
    test: "original"
}

var addCollisionHandler = function(superEntity) {
    var collisionHandler = Object.create(CollisionHandlerProto);
    for(const key in collisionHandler) collisionHandler[key] = collisionHandler[key].bind(superEntity);
    superEntity.collisionHandler = collisionHandler;
}

var addExhaustHandler = function(superEntity) {
    var exhaustHandler = Object.create(ExhaustHandlerProto);
    for(key in exhaustHandler) key.bind(superEntity);
}

var createSpaceShip = function(x, y, width, height) {
    return function() {
        var SpaceShip = Object.create(SpaceShipProto);
        Object.assign(SpaceShip, {x, y, width, height});
        addCollisionHandler(SpaceShip);
        SpaceShip.collisionHandler.init();
        return SpaceShip;
    }
}

var spaceShip = createSpaceShip(50, 50, 15, 35)();
var otherSpaceShip = createSpaceShip(50, 50, 50, 50)();
otherSpaceShip.test = "other";

MasterCollisionHandler.checkForCollision();
var MasterCollisionManager = {
    collidables: [],
    registerCollidable: function(collidable) {
        this.collidables.push(collidable);
    },
    checkForCollision: function() {
        console.log("checking for collisions");
        this.collidables[0].collisionHandler;
    }
}

var CollisionManagerProto = {
    init: function() {
       MasterCollisionManager.registerCollidable(this);
    },
    respond: function(other) {
        console.log();
    }
}

var SpaceShipProto = {
    test: "original"
}

var addCollisionManager = function(superEntity) {
    var collisionManager = Object.create(CollisionManagerProto);
    collisionManager.init = collisionManager.init.bind(superEntity);
    collisionManager.respond = collisionManager.respond.bind(superEntity);
    superEntity.collisionManager = collisionManager;
} 

var createSpaceShip = function() {
    var SpaceShip = Object.create(SpaceShipProto);
    addCollisionManager(SpaceShip);
    SpaceShip.collisionManager.init();
    return SpaceShip;
}

var spaceShip = createSpaceShip();
var otherSpaceShip = createSpaceShip();
otherSpaceShip.test = "other";

spaceShip.collisionManager.respond();
otherSpaceShip.collisionManager.respond();
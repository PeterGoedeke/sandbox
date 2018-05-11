var MasterCollisionManager = {
    collidables: [],
    registerCollidable: function(collidable) {
        this.collidables.push(collidable);
    },
    checkForCollision: function() {
        console.log(this.collidables);
        for(let i = 0; i < this.collidables.length; i++) {
            for(let j = 1; j < this.collidables.length && i != j; j++) {
                if(this.collidables[i].test == "original" && this.collidables[j].test == "other") {
                    this.collidables[i].collisionManager.respond(this.collidables[j]);
                }
            }
        }
    }
}

var CollisionManagerProto = {
    init: function() {
       MasterCollisionManager.registerCollidable(this);
    },
    respond: function(other) {
        console.log(other.test);
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

MasterCollisionManager.checkForCollision();
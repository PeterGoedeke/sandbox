//Collision Handler Resources
var masterCollisionHandler = {
    collidables: [],
    registerCollidable: function registerCollidable(collidable) {
        this.collidables.push(collidable);
    },
    checkForCollisions: function checkForCollisions() {
        for(let i = 0; i < this.collidables.length; i++) {
            for(let j = 1; j < this.collidables.length && i != j; j++) {
                const iCollidable = this.collidables[i];
                const jCollidable = this.collidables[j];
                if(!this.areColliding(iCollidable, jCollidable)) continue;
                iCollidable.collisionHandler.respond(jCollidable);
                jCollidable.collisionHandler.respond(iCollidable);
            }
        }
    },
    areColliding: function areColliding(entity, other) {
        var collidingX = (entity.x < other.x + other.width && entity.x + entity.width > other.x);
        var collidingY = (entity.y < other.y + other.width && entity.y + entity.width > other.y);
        return (collidingX && collidingY);
    }
}

var collisionHandlerProto = {
    init: function init() {
       masterCollisionHandler.registerCollidable(this);
    },
    respond: function respond(other) {

    },
    callBack: function callBack() {

    }
}

var createCollisionHandlerType = function(respond, callBack) {
    return {
        addTo: function addTo(superEntity) {
            var collisionHandler = Object.create(collisionHandlerProto);
            collisionHandler.respond = respond;
            collisionHandler.callBack = callBack;
            collisionHandler.init = collisionHandler.init.bind(superEntity);
            collisionHandler.respond = collisionHandler.respond.bind(superEntity);
            superEntity.collisionHandler = collisionHandler;
        } 
    }
}

//Collision Handlers
var testCollisionHandler = createCollisionHandlerType(
    function(other) {
        console.log(`I, ${this.weapons}, bumped into ${other.weapons}. ${other.weapons} is of type ${typeof other}. I am at (${this.x}, ${this.y}), and I am (${this.width}, ${this.height}) big. My friend is at (${other.x}, ${other.y}) and is (${other.width}, ${other.height}) big.`);
        console.log(this.weapons);
        other.collisionHandler.callBack.call(this, other);
    }, 
    function(other) {
        console.log(`This is a callBack which has been passed to me by ${other.weapons}, but is being excuted on me, ${this.weapons}.`);
    });
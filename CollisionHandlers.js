//Collision Handler Resources
var MasterCollisionHandler = {
    collidables: [],
    registerCollidable: function registerCollidable(collidable) {
        this.collidables.push(collidable);
    },
    checkForCollision: function checkForCollision() {
        for(let i = 0; i < this.collidables.length; i++) {
            for(let j = 1; j < this.collidables.length && i != j; j++) {
                if(this.collidables[i].test == "original" && this.collidables[j].test == "other") {
                    const iCollidable = this.collidables[i];
                    const jCollidable = this.collidables[j];
                    iCollidable.collisionHandler.respond(jCollidable, jCollidable.collisionHandler.callback);
                    jCollidable.collisionHandler.respond(iCollidable, iCollidable.collisionHandler.callback);
                }
            }
        }
    }
}

var CollisionHandlerProto = {
    init: function init() {
       MasterCollisionHandler.registerCollidable(this);
    },
    respond: function respond(other) {

    },
    callBack: function callBack() {

    }
}

var createCollisionHandlerType = function(respond, callback) {
    return {
            addTo: function addTo(superEntity) {
            var collisionHandler = Object.create(CollisionHandlerProto);
            collisionHandler.respond = respond;
            collisionHandler.callback = callback;
            for(const key in collisionHandler) collisionHandler[key] = collisionHandler[key].bind(superEntity);
            superEntity.collisionHandler = collisionHandler;
        } 
    }
}

//Collision Handlers

var testCollisionHandler = createCollisionHandlerType(
    (other, callback) => {console.log(`I, ${this}, bumped into ${other}. ${other} is of type ${other.type}`); callback();}, 
    () => console.log(`This is a callback which has been passed to me by ${other}, but is being excuted on me, ${this}.`));
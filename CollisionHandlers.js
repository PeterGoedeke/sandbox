//Collision Handler Resources
var MasterCollisionHandler = {
    collidables: [],
    registerCollidable: function registerCollidable(collidable) {
        this.collidables.push(collidable);
    },
    checkForCollisions: function checkForCollisions() {
        for(let i = 0; i < this.collidables.length; i++) {
            for(let j = 1; j < this.collidables.length && i != j; j++) {
                if(this.collidables[i].armour == 5 && this.collidables[j].armour == 5) {
                    const iCollidable = this.collidables[i];
                    const jCollidable = this.collidables[j];
                    iCollidable.collisionHandler.respond(jCollidable);
                    jCollidable.collisionHandler.respond(iCollidable);
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

var createCollisionHandlerType = function(respond, callBack) {
    return {
        addTo: function addTo(superEntity) {
            var collisionHandler = Object.create(CollisionHandlerProto);
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
        console.log(`I, ${this.weapons}, bumped into ${other.weapons}. ${other.weapons} is of type ${typeof other}`);
        console.log(this.weapons);
        other.collisionHandler.callBack.call(this, other);
    }, 
    function(other) {
        console.log(`This is a callBack which has been passed to me by ${other.weapons}, but is being excuted on me, ${this.weapons}.`);
    });
//Game 
var Game = {
    gameObjects: [],
    registerGameObject: function registerGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    },
    updateGameObjects: function updateGameObjects() {
        console.log(this.gameObjects);
        console.log(MasterCollisionHandler.collidables);
        //for(let gameObject of this.gameObjects) gameObject.update();
        //for(let i = 0; i < this.gameObjects)
    }
}

var gameLoop = setInterval(Game.updateGameObjects.bind(Game), 1000);

//ExhaustHandlers
var ExhaustHandlerProto = {
    update: function() {

    },
    render: function() {

    }
}
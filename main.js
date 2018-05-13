//Game 
var Game = {
    gameObjects: [],
    registerGameObject: function registerGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    },
    updateGameState: function updateGameState() {
        MasterCollisionHandler.checkForCollisions();
        this.updateGameObjects();
    },
    updateGameObjects: function updateGameObjects() {
        for(let gameObject of this.gameObjects) gameObject.update();
    }
}

var gameLoop = setInterval(Game.updateGameState.bind(Game), 1000);

//ExhaustHandlers
var ExhaustHandlerProto = {
    update: function() {

    },
    render: function() {

    }
}
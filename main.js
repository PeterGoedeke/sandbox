//Game 
var game = {
    gameObjects: [],
    registerGameObject: function registerGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    },
    updateGameState: function updateGameState() {
        masterCollisionHandler.checkForCollisions();
        this.updateGameObjects();
    },
    updateGameObjects: function updateGameObjects() {
        for(let gameObject of this.gameObjects) gameObject.update();
    }
}

var gameLoop = setInterval(game.updateGameState.bind(game), 1000);

//ExhaustHandlers
var exhaustHandlerProto = {
    update: function() {

    },
    render: function() {

    }
}
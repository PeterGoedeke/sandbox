//Game 
var Game = {
    gameObjects: [],
    registerGameObject: function(gameObject) {
        this.gameObjects.push(gameObject);
    },
    updateGameObjects: function() {
        for(let gameObject of this.gameObjects) gameObject.update();
        console.log("ayy");
    }
}
var gameLoop = setInterval(Game.updateGameObjects(), 1);

//ExhaustHandlers
var ExhaustHandlerProto = {
    update: function() {

    },
    render: function() {

    }
}
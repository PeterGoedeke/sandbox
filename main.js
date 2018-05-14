//Game 
var game = {
    gameObjects: [],
    init: function init() {
        this.gameLoop = setInterval(this.updateGameState.bind(this), 1);
        requestAnimationFrame(this.renderGameObjects.bind(this));
    },
    registerGameObject: function registerGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    },
    updateGameState: function updateGameState() {
        masterCollisionHandler.checkForCollisions();
        this.updateGameObjects();
    },
    updateGameObjects: function updateGameObjects() {
        for(let gameObject of this.gameObjects) {
            //onsole.log(`(${Math.floor(gameObject.x)}, ${Math.floor(gameObject.y)}), dimensions (${Math.floor(gameObject.width)}, ${Math.floor(gameObject.height)})`);
            gameObject.update();
        }
    },
    renderGameObjects: function renderGameObjects() {
        for(let gameObject of this.gameObjects) {
            gameObject.render();
        }
        requestAnimationFrame(renderGameObjects.bind(this));
    }
}
game.init();

function mixin(target, ...objects) {
    for(const object of objects) {
        if(typeof object === 'object') {
            for(const key of Object.keys(object)) {
                if(typeof object[key] === 'object') {
                    target[key] = Array.isArray(object[key]) ? [] : {};
                    mixin(target[key], object[key]);
                } else {
                    Object.assign(target, object);
                }
            }
        }
    }
    return target;
}

function initDisplayElement(gameObject) {
    gameObject.element = document.createElement("div");
    gameObject.element.classList.add("gameObject");
    gameObject.element.style.width = gameObject.width + "px";
    gameObject.element.style.height = gameObject.height + "px";
    var displayImage = document.createElement("img");
    displayImage.src = gameObject.image;
    displayImage.classList.add("shipDisplayGraphic");
    gameObject.element.appendChild(displayImage);
    document.querySelector(".game").appendChild(gameObject.element);
}

function getAngleBetween(entity, other) {
    return Math.atan2(other.x - entity.x, -(other.y - entity.y)) * 180 / Math.PI;
}

var toRadians = (term) => term * (Math.PI / 180);

var mouseX = 0;
var mouseY = 0;

document.addEventListener('mousemove', trackMouse);
function trackMouse() {
    mouseX = event.pageX;
    mouseY = event.pageY;
}
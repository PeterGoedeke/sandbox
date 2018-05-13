var spaceShipProto = {
    element: document.createElement("div"),
    init: function init() {
        game.registerGameObject(this);
        this.element.classList.add("gameObject");
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        var displayImage = document.createElement("img");
        displayImage.src = this.image;
        displayImage.classList.add("shipDisplayGraphic");
        this.element.appendChild(displayImage);
        document.querySelector(".game").appendChild(this.element);
    },
    update: function update() {
        
    },
    render: function render() {

    }
}

//Add particle handler
var createSpaceShipType = function(x, y, width, height, image, mass, baseArmour, baseAcc, baseManu, baseMaxSpeed) {
    //Add exhaust handler
    return function(spaceShipEquip, collisionHandler) {
        var spaceShip = Object.create(spaceShipProto);
        Object.assign(spaceShip, {x, y, width, height, image, mass, baseArmour, baseAcc, baseManu, baseMaxSpeed, collisionHandler});
        Object.assign(spaceShip, spaceShipEquip);
        testCollisionHandler.addTo(spaceShip);
        spaceShip.collisionHandler.init();
        spaceShip.init();
        return spaceShip;
    }
}

var createTestSpaceShip = createSpaceShipType(0, 0, 30, 70, "player.png", 50, "placeholder", 0.02, 5, 2);

var mySpaceShip = createTestSpaceShip({armour: 5, weapons: "myspaceship", shield: 5, inventory: 5, devices: 5}, testCollisionHandler);
var myOtherSpaceShip = createTestSpaceShip({armour: 5, weapons: "myotherspaceship", shield: 5, inventory: 5, devices: 5}, testCollisionHandler);

var createCollisionHandlerType = function(respond, callback) {
    return function(superEntity) {
        var collisionHandler = Object.create(CollisionHandlerProto);
        collisionHandler.respond = respond;
        collisionHandler.callback = callback;
        for(const key in collisionHandler) collisionHandler[key] = collisionHandler[key].bind(superEntity);
        superEntity.collisionHandler = collisionHandler;
    } 
}
var SpaceShipProto = {
    init: function init() {
        Game.registerGameObject(this);
    },
    update: function update() {
        console.log("ayy");
    },
    render: function render() {

    }
}

//Add particle handler
var createSpaceShipType = function(x, y, width, height, image, mass, baseArmour, baseAcc, baseManu, baseMaxSpeed) {
    //Add exhaust handler
    return function(SpaceShipEquip, collisionHandler) {
        var SpaceShip = Object.create(SpaceShipProto);
        Object.assign(SpaceShip, {x, y, width, height, image, mass, baseArmour, baseAcc, baseManu, baseMaxSpeed, collisionHandler});
        Object.assign(SpaceShip, SpaceShipEquip);
        testCollisionHandler.addTo(SpaceShip);
        SpaceShip.collisionHandler.init();
        SpaceShip.init();
        return SpaceShip;
    }
}

var createTestSpaceShip = createSpaceShipType(0, 0, 25, 25, "player.png", 50, "placeholder", 0.02, 5, 2);

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
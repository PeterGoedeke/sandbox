var spaceShipProto = {
    init: function init(collisionHandler) {
        collisionHandler.addTo(this);
        this.collisionHandler.init();
        game.registerGameObject(this);
        initDisplayElement(this);
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    },
    update: function update() {
        
    },
    render: function render() {

    }
}

//Class, width, height, image, mass, baseArmour, baseAcc, baseManu, baseMaxSpeed
var createSpaceShipClass = function(spaceShipClassSpecs) {
    //x, y, armour, weapons, shield, inventory, devices, collisionHandler
    return function(spaceShipSpecs, init = true) {
        var spaceShip = Object.create(spaceShipProto);
        mixin(spaceShip, spaceShipClassSpecs);
        mixin(spaceShip, spaceShipSpecs);
        if(init) spaceShip.init(spaceShip.collisionHandler);
        return spaceShip;
    }
}

var testSpaceShipClassSpecs = {
    class: "Test Space Ship",
    width: 30,
    height: 70,
    image: "player.png",
    mass: "placeholder",
    baseArmour: "placeholder",
    baseAcc: "placeholder",
    baseManu: "placeholder",
    baseMaxSpeed: "placeholder"
}
var mySpaceShipClass = createSpaceShipClass(testSpaceShipClassSpecs);

var instanceOfMySpaceShipClassSpecs = {
    x: 0,
    y: 0,
    armour: "placeholder",
    weapons: "placeholder",
    shield: "placeholder",
    inventory: "placeholder",
    devices: "placeholder",
    collisionHandler: testCollisionHandler
}
var instanceOfMySpaceShipClassSpecs2 = {
    x: 100,
    y: 100,
    armour: "placeholder",
    weapons: "placeholder",
    shield: "placeholder",
    inventory: "placeholder",
    devices: "placeholder",
    collisionHandler: testCollisionHandler
}
var instanceOfMySpaceShipClass = mySpaceShipClass(instanceOfMySpaceShipClassSpecs);
var instanceOfMySpaceShipClass2 = mySpaceShipClass(instanceOfMySpaceShipClassSpecs2);

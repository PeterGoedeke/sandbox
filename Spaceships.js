var spaceShipProto = {
    init: function init() {
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

//Add particle handler
var createSpaceShipType = function(width, height, image, mass, baseArmour, baseAcc, baseManu, baseMaxSpeed) {
    //Add exhaust handler
    return function(spaceShipSpecs, collisionHandler) {
        var spaceShip = Object.create(spaceShipProto);
        mixin(spaceShip, {width, height, image, mass, baseArmour, baseAcc, baseManu, baseMaxSpeed, collisionHandler});
        mixin(spaceShip, spaceShipSpecs);
        collisionHandler.addTo(spaceShip);
        spaceShip.collisionHandler.init();
        spaceShip.init();
        return spaceShip;
    }
}

var createTestSpaceShip = createSpaceShipType(30, 70, "player.png", 50, "placeholder", 0.02, 5, 2);

var mySpaceShip = createTestSpaceShip({x: 0, y: 0, armour: 5, weapons: "myspaceship", shield: 5, inventory: 5, devices: 5}, testCollisionHandler);
var myOtherSpaceShip = createTestSpaceShip({x: 40, y: 10, armour: 5, weapons: "myotherspaceship", shield: 5, inventory: 5, devices: 5}, testCollisionHandler);
//ExhaustHandlers
var exhaustHandlerProto = {
    init: function init(superEntity) {
        this.exhaustElement = document.createElement("IMG");
        this.exhaustElement.classList.add("exhaust");
        this.exhaustElement.src = this.image;
        this.exhaustElement.style.top = this.verticalOffset + "px";
        this.exhaustElement.style.left = this.horizontalOffset + "px";
        this.exhaustElement.style.width = this.width + "px";
        this.exhaustElement.style.height = this.height + "px";
        this.exhaustElement.style.zIndex = -1;
        superEntity.element.appendChild(this.exhaustElement);
    },
    render: function render(thrusting) {
        if(thrusting) this.exhaustElement.style.display = "block";
        else this.exhaustElement.style.display = "none";
        console.log(thrusting);
    }
}

var createExhaustHandler = function(superEntity, horizontalOffset, verticalOffset, width, height, image) {
    var exhaustHandler = Object.create(exhaustHandlerProto);
    Object.assign(exhaustHandler, {horizontalOffset, verticalOffset, width, height, image});
    exhaustHandler.init(superEntity);
    return exhaustHandler;
}
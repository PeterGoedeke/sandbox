const Player = (function() {
    var [x, y] = [250, 500];
    var [xVelocity, yVelocity] = [0, 0];
    var acceleration = 1;
    var maxSpeed = 2;
    var angle = 0;
    var element = document.querySelector(".player");
    document.addEventListener('keydown', move);

    function move(event) {
        var direction;
        switch (event.which) {
            case 37:
            angle -= 5;
            break;
            case 38:
            yVelocity -= acceleration * Math.cos(toRadians(angle));
            xVelocity += acceleration * Math.sin(toRadians(angle));
            break;
            case 39:
            angle += 5;
            break;
            case 40:
            //yVelocity += Math.cos(toRadians(angle));
            //xVelocity += Math.sin(toRadians(angle));
            break;
        }
        if(xVelocity >= maxSpeed) xVelocity = maxSpeed;
        if(xVelocity <= -maxSpeed) xVelocity = -maxSpeed;
        if(yVelocity >= maxSpeed) yVelocity = maxSpeed;
        if(yVelocity <= -maxSpeed) yVelocity = -maxSpeed;
    }

    var toRadians = (term) => term * (Math.PI / 180);

    function update() {
        x += xVelocity;
        y += yVelocity;
        element.style.transform = `rotate(${angle}deg`;
        element.style.top = y + "px";
        element.style.left = x  + "px";
        console.log(`${xVelocity} ${yVelocity}`)
        requestAnimationFrame(Player.update);
    }

    return {
        update: update
    }
})();

const Wall = (function() {
    
    return {

    }
})();

//window.requestAnimationFrame(Player.update);
Player.update();
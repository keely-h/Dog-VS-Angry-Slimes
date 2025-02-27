let canvas;
let context;

let fpsInterval = 1000 / 30;
let now;
let then = Date.now();
let request_id;

//32 w 48 h
let player = {
    x : 50,
    y : 50,
    // width : 1216,
    // height : 1216,
    width : 32,
    height : 32,
    frameX : 0, 
    frameY : 0,
    // frameY = 9 standing
    xChange : 10,
    yChange : 10,
};

let health_bar = {
    x : player.x - 10,
    y : player.y - 10,
    width : 40,
    height : 4,
};

let rocks = [];

let press = 0;

let powerUps = [];


let enemies_health = [];

let foods = [];

let enemies = [];

//wall boundaries
// let xBoundary = 20;
// let yBoundary = 20;

let xhttp;
let score = 0;

let playerImage = new Image();
let enemyImage = new Image();
let foodImage = new Image();
let powerImage = new Image();
let rockImage = new Image();

let floor; 

let moveLeft = false;
let moveUp = false;
let moveRight = false;
let moveDown = false;
let spaceBar = false;
//32 across, 20 down
let background = [
    [1, 1, 2, 2, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 2], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], 
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], 
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], 
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [2, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1]]

let backgroundImage = new Image();
let tilesPerRow = 3;
let tileSize = 32;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);
   
    load_assets([
        {"var": playerImage, "url": "static/spritesheet.png"},
        {"var": backgroundImage, "url": "static/tileMap.png"},
        {"var": enemyImage, "url": "static/enemySheet.png"},
        {"var": foodImage, "url": "static/pizza.png"},
        {"var": powerImage, "url": "static/chips.png"},
        {"var": rockImage, "url": "static/rock.png"}
    ], draw);
  
}

function draw() {
    request_id = window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);
  
    context.clearRect(0, 0, canvas.width, canvas.height);
    // <canvas width="650" height="450">
    if (enemies.length < 3 ) {
        let enemy = {
            x : randint(70, canvas.width),
            y : randint(70, canvas.height),
            width : 32,
            height : 32,
            // width : 1216,
            // height : 1216,
            xChange : randint(-3, -1),
            yChange : randint(-3, -1),
            frameX : 0,
            frameY : 0,
            alive: true,
            
        };
        enemy.enemy_health = {
            x : enemy.x - 10,
            y : enemy.y - 10,
            width : 40,
            height : 4,
        },
        enemies.push(enemy);     
    };
    
    //drawing the background on canvas
    for (let r = 0; r < 20; r += 1) {
        for (let c = 0; c < 32; c += 1) {
            let tile = background[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);
                context.drawImage(backgroundImage, 
                    tileCol * 1216, tileRow * 1216, 1216, 1216,
                    c * 32, r * 32, 32, 32);
            }
        }
    }

    // draw player
    console.log("Drawing player at (" + player.x + ", " + player.y + ")");

    context.drawImage(playerImage,
        player.frameY * 1216, 0, 1216, 1216,
        player.x, player.y, 50, 50);
        //1216 -> first frame (both 1216 dimensions.)
        //i used this video to help me with the sprite: https://www.youtube.com/watch?v=CY0HE277IBM
 
    // moving the player around!!
    if (moveRight) {
        player.xChange = player.xChange + 0.5;
        player.frameY = 5;
    }
    if (moveLeft) {
        player.xChange = player.xChange - 0.5;
        player.frameY = 7;
    }
    if (moveUp) {
        player.yChange = player.yChange - 0.5;
        player.frameY = 0;
    }
    if (moveDown) {
        player.yChange = player.yChange + 0.5;
        player.frameY = 3;
    }
    if (!moveRight && !moveLeft && !moveUp && !moveDown ) {
        player.frameY = 9;
    }
    ///////////////food flying.
    if (spaceBar) {
        press = press + 1;
        if (press === 1 ) {
            player.frameY = 2;
            let f = {
                x : player.x + 50,
                y : player.y + 20,
                width : 32,
                height : 32,
                xChange : -10,
                yChange : 0,
            };
        foods.push(f);
        }
    } else if (!spaceBar) {
        press = 0;
    }

    for (let f of foods) {
        context.drawImage(foodImage, f.x, f.y, f.width, f.height);
    };
    for (let f of foods) {
        f.x = f.x - f.xChange;
    };
   
    if (moveRight || moveLeft || moveUp || moveDown ) {
        player.x = player.x + player.xChange;
        player.y = player.y + player.yChange;
    };

    player.xChange = player.xChange * 0.9; //friction
    player.yChange = player.yChange * 0.9; //friction

    console.log("Player position: (" + player.x + ", " + player.y + ")");
    playerImageLoaded();
     //drawing the actual enemy
    for (let enemy of enemies) {
        // context.fillStyle = "green";
        // context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        context.drawImage(enemyImage,
            enemy.frameY * enemy.width, 0, 1216, 1216,
            enemy.x, enemy.y, 40, 40);
        context.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    }

    for (let enemy of enemies) {
        if (player_collides(enemy)) {
            console.log("Colission detected.!!!");
            health_bar.width = health_bar.width - 0.5;
            if (health_bar.width === 0) {
                stop("Game over!");
                return;
            }
        }
    }
      //updating positions.

    for (let enemy of enemies) {
            enemy.x = enemy.x + enemy.xChange;
            enemy.y = enemy.y + enemy.yChange;
        if (enemy.x < 16) {
            enemy.xChange = enemy.xChange * -1;
        } else if ( enemy.x + enemy.width >= canvas.width ) {
            enemy.xChange = enemy.xChange * -1;
        }
        if (enemy.y < 16) {
            enemy.yChange = enemy.yChange * -1;
        } else if ( enemy.y + enemy.width >= canvas.height ) {
            enemy.yChange = enemy.yChange * -1;
        }
        let distX = player.x - enemy.x;
        let distY = player.y - enemy.y;
        let totalDist = Math.sqrt(distX * distX + distY * distY);
        let speed = 1.5;
        enemy.xChange = (distX / totalDist) * speed;
        enemy.yChange = (distY / totalDist) * speed;
        enemy.x += enemy.xChange;
        enemy.y += enemy.yChange;
        console.log("enemy position: (" + enemy.x + ", " + enemy.y + ")");
    }
 
    ////////////////////////player health bar
    context.fillStyle = "green";
    context.fillRect(health_bar.x, health_bar.y, health_bar.width, health_bar.height);
    health_bar.x = player.x + 5;
    health_bar.y = player.y + 52;
    ///////////////////////enemy health bar 
  
    ////////////////////big mistake
    for (let enemy of enemies) {
        let enemy_health = enemy.enemy_health;
        enemy_health.x = enemy.x + 5;
        enemy_health.y = enemy.y + 45;
        context.fillStyle = "red";
        context.fillRect(enemy_health.x, enemy_health.y, enemy_health.width, enemy_health.height);
        for (let f of foods) {
            if (food_collides(enemy, f)) {
                console.log("ENEMY COLLISION");
                enemy_health.width = enemy_health.width - 1.5;
                // enemy = enemy.enemy_health.width;
                if (enemy_health.width <= 0) {
                    enemies.splice(enemy, 1);
                    // enemies.splice(enemy_health, 1)
                    // enemy.enemies_health.splice(enemy_health);
                    score += 1;
                    enemy.alive = false;
                    console.log("health : " + score);
                } 
            }
        }
        // https://www.youtube.com/watch?v=lqNztI7BMf8 used this video to get information about enemies, splicing
        
        
    };
    if (player.x < 0) {
        player.xChange = player.xChange * -1 ;
    } else if (player.x + (player.width + player.height) >= canvas.width) {
        player.xChange = player.xChange * -1;
    }
    if (player.y < 0 ) {
        player.yChange = player.yChange * -1;
    } else if ( player.y + (player.width + player.height) >= canvas.height ) {
        player.yChange = player.yChange * -1;

    }
    if (powerUps.length < 2) {
        let powerUp = {
        x : randint(20, canvas.width - 50),
        y : randint(20, canvas.height - 50),
        width : 40,
        height : 40
        }
        powerUps.push(powerUp);
    }
    for (let powerUp of powerUps) {
        context.drawImage(powerImage, powerUp.x, powerUp.y, powerUp.width, powerUp.height);
        if (player_collides(powerUp)) {
            health_bar.width = health_bar.width + 0.5;
            if (health_bar.width > 40 ) {
                health_bar.width = 40;
            }
        } 
    }
    if (rocks.length < 4) {
        let rock = {
            x : randint(20, canvas.width - 100),
            y : randint(20, canvas.height - 100),
            width : 32,
            height : 32,
        }
        rocks.push(rock);
    }
    for (let rock of rocks) {
        context.drawImage(rockImage, rock.x, rock.y, rock.width, rock.height);
        if (player_collides(rock)) {
            if (player.x < rock.x) {
                player.xChange = player.xChange * -1 ;
            } else if (player.x + (player.width + player.height) >= rock.width) {
                player.xChange = player.xChange * -1;
            }
            if (player.y < rock.y ) {
                player.yChange = player.yChange * -1;
            } else if ( player.y + (player.width + player.height) >= rock.height ) {
                player.yChange = player.yChange * -1;
        
            }
        }
    }
    
}

function randint(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function playerImageLoaded() {
    console.log("Player sprite sheet image loaded successfully.");
    console.log("Image dimensions: " + playerImage.width + "x" + playerImage.height);

    // Now that the image is loaded, you can start drawing it on the canvas
}

function activate(event) {
    let key = event.key;
    console.log("key pressed: ", key);
    if (key === "ArrowLeft") {
        moveLeft = true;
    } else if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    } else if (key === "ArrowDown") {
        moveDown = true;
    } else if (key === " ") {
        spaceBar = true;
    }
}

function deactivate(event) {
    let key = event.key;
    console.log("key released:", key);
    if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
    } else if (key === "ArrowDown") {
        moveDown = false;
    } else if (key === " ") {
        spaceBar = false;
    }
}

function load_assets(assets, callback) {
    let num_assets = assets.length;
    let loaded = function() {
        console.log("loaded");
        num_assets = num_assets - 1;
        if (num_assets === 0) {
            callback();
        }
    };
    for (let asset of assets) {
        let element = asset.var;
        if ( element instanceof HTMLImageElement ) {
            console.log("img");
            element.addEventListener("load", loaded, false);
        }
        else if ( element instanceof HTMLAudioElement ) {
            console.log("audio");
            element.addEventListener("canplaythrough", loaded, false);
        }
        element.src = asset.url;
    }
}

function food_collides(enemy, f) {
    if (enemy.x < f.x + f.width &&
        enemy.x + enemy.width > f.x &&
        enemy.y + enemy.height > f.y &&
        enemy.y < f.y + f.height) {
        return true;
    } else {
        return false;
    }
}

function player_collides(enemy) {
    if (enemy.x < player.x + player.width &&
        enemy.x + enemy.width > player.x &&
        enemy.y + enemy.height > player.y &&
        enemy.y < player.y + player.height) {
        return true;
    } else {
        return false;
    }
}

function stop(outcome) {
    window.cancelAnimationFrame(request_id);
    window.removeEventListener("keydown", activate, false);
    window.removeEventListener("keyup", deactivate, false);
    let outcome_element = document.querySelector("#outcome");
    outcome_element.innerHTML = outcome + " Enemies killed: " + score;
}

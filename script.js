class Game {
    constructor() {
        this.obstaclesArr = [];
        this.refreshRate = 1000 / 70;
        this.obstacleSpawnRate = 600;
        this.bulletArr = [];
        this.time = 0;
        this.intervalId = null;
    }



    start() {
        this.player = new Player();
        this.player.domElement = this.createDomElm(this.player);
        this.drawDomElm(this.player);


        this.addEventListeners();

        this.intervalId = setInterval(() => {
            this.time++;

            // create obstacles
            if(this.time % 10 === 0){
                const newObstacle = new Obstacle();
                this.obstaclesArr.push(newObstacle);
                newObstacle.domElement = this.createDomElm(newObstacle);
                this.drawDomElm(newObstacle);
            }
           
            // iterate through obstaclesArr
            this.obstaclesArr.forEach((obstacle, i) => {
                obstacle.deletObstacle(obstacle, this.obstaclesArr, i);
                obstacle.moveDown();
                this.drawDomElm(obstacle);
                this.detectCollisionWithPlayer(obstacle);
                this.bulletdetectCollision(obstacle)                
            })

            // iterate throuh bulletArr
            this.bulletArr.forEach((bullet, index) => {
                bullet.bulletMoveUp();
                this.drawDomElm(bullet);
                bullet.deletBullet(bullet, this.bulletArr, index);
            })
            if(this.time % 15 === 0)
            this.updateScore();

        }, this.refreshRate);

        
        this.audioVolume()
    }


    addEventListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                this.player.moveLeft();
            } else if (event.key === "ArrowRight") {
                this.player.moveRight();
            } else if (event.key === "ArrowUp") {
                this.player.movesUp();
            } else if (event.key === "ArrowDown") {
                this.player.moveDown();
            } else if (event.key === " ") {
                this.shoot();

            }
            this.drawDomElm(this.player);
        });
    }

    createDomElm(instance) {
        const htmlTag = document.createElement("div");
        htmlTag.className = instance.className;
        htmlTag.style.width = instance.width + "%";
        htmlTag.style.height = instance.height + "%";
        const board = document.getElementById("board");
        board.appendChild(htmlTag);
        return htmlTag;
    }
    drawDomElm(instance) {
        instance.domElement.style.left = instance.positionX + "%";
        instance.domElement.style.bottom = instance.positionY + "%";
    }


    detectCollisionWithPlayer(astroid) {
        if (this.player.positionX < astroid.positionX + astroid.width &&
            this.player.positionX + this.player.width > astroid.positionX &&
            this.player.positionY < astroid.positionY + astroid.height &&
            this.player.height + this.player.positionY > astroid.positionY) {
            document.getElementById("board").style.visibility = "hidden";
            this.stopMyScore();
            document.getElementById("gameOver").style.visibility = "visible";
        }
    }
    shoot() {
        this.bullet = new Bullet(this.player);
        this.bulletArr.push(this.bullet);
        this.bullet.domElement = this.createDomElm(this.bullet);
    }

    bulletdetectCollision(astroid) {
        this.bulletArr.forEach((bullet) => {
            if (bullet.positionX < astroid.positionX + astroid.width &&
                bullet.positionX + bullet.width > astroid.positionX &&
                bullet.positionY < astroid.positionY + astroid.height &&
                bullet.height + bullet.positionY > astroid.positionY) {
                astroid.domElement.remove();
                let indexOfObstacle = this.obstaclesArr.indexOf(astroid);
                this.obstaclesArr.splice(indexOfObstacle, 1);
                let indexOfBullets = this.bulletArr.indexOf(bullet);
                bullet.domElement.remove();
                this.bulletArr.splice(indexOfBullets, 1);


            }
        })

    }

    updateScore() {
        let count = document.getElementById("score")
        count.innerHTML = this.time * 2;
    }
    stopMyScore() {
        clearInterval(this.intervalId);
    }



    audioVolume() {
        let audio = document.getElementById("myaudio");
        audio.volume = 0.1;

    }
}

const restart = document.querySelector(".button")
restart.addEventListener("click", (event) => {
    location.reload();
});



class Player {
    constructor() {
        this.className = "player";
        this.width = 5;
        this.height = 5;
        this.positionX = 50;
        this.positionY = -1;
        this.domElement = null;
    }
    moveLeft() {
        if (this.positionX > 0) {
            this.positionX -= 5;
        } else {
            console.log("Can't move outside playspace!")
        }

    }
    moveRight() {
        if (this.positionX <= 90) {
            this.positionX += 5;
        } else {
            console.log("Can't move outside playspace!")
        }

    }
    movesUp() {
        if (this.positionY <= 25) {
            this.positionY += 5;
        } else {
            console.log("Can't move outside playspace!")
        }

    }
    moveDown() {
        if (this.positionY >= 0) {
            this.positionY -= 5;
        }
    }
}

class Obstacle {
    constructor() {
        this.className = "obstacle";
        this.width = 5;
        this.height = 5;
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1));
        this.positionY = 100;
        this.domElement = null;
    }

    moveDown() {
        this.positionY -= 1;
    }
    deletObstacle(element, arr, i) {
        if (element.positionY < 0.5) {
            element.domElement.remove()
            arr.splice(i, 1)
        }
    }
}

class Bullet {
    constructor(x) {
        this.className = "bullets";
        this.width = 1;
        this.height = 5;
        this.positionX = x.positionX + 1.8;
        this.positionY = x.positionY + 5.1;
        this.domElement = null;
    }
    bulletMoveUp() {
        this.positionY += 1;
    }
    deletBullet(element, arr, i) {
        if (element.positionY >= 100) {
            element.domElement.remove();
            arr.splice(i, 1);
        }
    }
}



const game = new Game();
game.start();


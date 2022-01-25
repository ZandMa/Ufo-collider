class Game {
    constructor() {
        this.obstaclesArr = [];
        this.obstacleSpeed = 65;
        this.obstacleSpawnRate = 600;
    }



    start() {
        this.player = new Player();
        this.player.domElement = this.createDomElm(this.player);
        this.drawDomElm(this.player);


        this.addEventListeners();

        setInterval(() => {
            const newObstacle = new Obstacle();
            this.obstaclesArr.push(newObstacle);
            newObstacle.domElement = this.createDomElm(newObstacle);
            this.drawDomElm(newObstacle);
            this.obstaclesArr.forEach((obstacle) => {
                setInterval(() => {
                    obstacle.moveDown();
                    this.drawDomElm(obstacle);
                    this.detectCollisionWithPlayer(obstacle);
                    obstacle.deletObstacle(obstacle, this.obstaclesArr);
                }, this.obstacleSpeed)
            })
        }, this.obstacleSpawnRate);

     this.score()
     this.audioVolume()
    }


    addEventListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                this.player.moveLeft();
            } else if (event.key === "ArrowRight") {
                this.player.moveRight();
            }else if (event.key === "ArrowUp"){
                this.player.movesUp();
            }else if (event.key === "ArrowDown"){
                this.player.moveDown();
            }
            this.drawDomElm(this.player);
        });
    }
    createDomElm(instance) {
        const htmlTag = document.createElement("div");
        htmlTag.className = instance.className;
        htmlTag.style.width = instance.width + "vw";
        htmlTag.style.height = instance.height + "vh";
        const board = document.getElementById("board");
        board.appendChild(htmlTag);
        return htmlTag;
    }
    drawDomElm(instance) {
        instance.domElement.style.left = instance.positionX + "vw";
        instance.domElement.style.bottom = instance.positionY + "vh";
    }
    detectCollisionWithPlayer(astroid) {
        if (this.player.positionX < astroid.positionX + astroid.width &&
            this.player.positionX + this.player.width > astroid.positionX &&
            this.player.positionY < astroid.positionY + astroid.height &&
            this.player.height + this.player.positionY > astroid.positionY) {
            //let reaload = document.getElementById("board")#
            location.reload();



        }
    }
    score() {
        let count = document.getElementById("score")
        console.log(count)
        let counter = 0;
        setInterval(() => {
            
            counter += 100 ;
            count.innerHTML = counter;
            
        }, 1000)

    }
    audioVolume(){
        let audio = document.getElementById("myaudio");
        audio.volume = 0.2;
    }
    
}



class Player {
    constructor() {
        this.className = "player";
        this.width = 5;
        this.height = 5;
        this.positionX = 40;
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
        if (this.positionX <= 60) {
            this.positionX += 5;
        } else {
            console.log("Can't move outside playspace!")
        }

    }
    movesUp(){
        if(this.positionY <= 25){
            this.positionY +=5;
        } else {
            console.log("Can't move outside playspace!")
        }
        
    }
    moveDown(){
        if (this.positionY >= 0){
            this.positionY -= 5;
        }
    }
}

class Obstacle {
    constructor() {
        this.className = "obstacle";
        this.width = 5;
        this.height = 5;
        this.positionX = Math.floor(Math.random() * (70 - this.width + 1));
        this.positionY = 85;
        this.domElement = null;
    }

    moveDown() {
        this.positionY -= 1;
    }
    deletObstacle(element, arr) {
        if (element.positionY < 0.5) {
            element.domElement.remove()
            arr.shift(element)
        }

    }
}
const game = new Game();
game.start();


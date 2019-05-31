let tetris = document.createElement('div');
tetris.classList.add('tetris');


for (let i = 0; i < 180; i++) {
    let excel = document.createElement('div');
    excel.classList.add('excel');
    tetris.appendChild(excel);    
}

let main = document.getElementsByClassName('main')[0];
main.appendChild(tetris);

let excel = document.getElementsByClassName('excel');
let count = 0;

for (let i = 18; i >= 1; i--) {
    for (let j = 1; j <= 10; j++) {
        excel[count].setAttribute('posX', j);
        excel[count].setAttribute('posY', i);
        count++;
    }
}

let x = 5, y = 15;

let mainArr=[[[0,1],[0,2],[0,3],[[-1,1],[0,0],[1,-1],[2,-2],],[[1,-1],[0,0],[-1,1],[-2,2],],[[-1,1],[0,0],[1,-1],[2,-2],],[[1,-1],[0,0],[-1,1],[-2,2],],],[[1,0],[0,1],[1,1],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]],],[[1,0],[0,1],[0,2],[[0,1],[-1,0],[1,0],[2,-1],],[[0,1],[-1,2],[-1,0],[-2,-1],],[[0,-2],[1,-1],[-1,-1],[-2,0]],[[0,0],[1,-1],[1,1],[2,2]],],[[1,0],[1,1],[1,2],[[0,1],[-1,0],[0,-1],[1,-2],],[[0,0],[0,0],[-1,2],[-1,2],],[[0,0],[1,1],[2,-1],[1,-2]],[[0,-1],[0,-1],[-1,0],[-1,2]],],[[1,0],[1,1],[2,1],[[1,0],[0,1],[-1,0],[-2,1],],[[-1,0],[0,-1],[1,0],[2,-1],],[[1,0],[0,1],[-1,0],[-2,1],],[[-1,0],[0,-1],[1,0],[2,-1],],],[[1,0],[-1,1],[0,1],[[0,0],[-1,1],[2,0],[1,1],],[[0,0],[1,-1],[-2,0],[-1,-1],],[[0,0],[-1,1],[2,0],[1,1],],[[0,0],[1,-1],[-2,0],[-1,-1],],],[[1,0],[2,0],[1,1],[[0,2],[-1,1],[-2,0],[0,0],],[[2,-1],[1,0],[0,1],[0,-1],],[[0,-1],[1,0],[2,1],[0,1],],[[-2,0],[-1,-1],[0,-2],[0,0],],],]

let currentFigure = 0;
let figureBody = 0;
let rotate_el = 1;
let score = 0;
let numColor = 0;
let modal = document.querySelector('.modal');
let bg_modal = document.querySelector('.bg_modal');

var colorArray = ['#FEA47F', '#25CCF7', '#EAB543', '#55E6C1', '#82589F', '#FD7272', '#182C61', '#2C3A47'];

function getCurrentCoordinates() {
    CurrentCoordinates = [
        [figureBody[0].getAttribute('posx'), figureBody[0].getAttribute('posy')],
        [figureBody[1].getAttribute('posx'), figureBody[1].getAttribute('posy')],
        [figureBody[2].getAttribute('posx'), figureBody[2].getAttribute('posy')],
        [figureBody[3].getAttribute('posx'), figureBody[3].getAttribute('posy')],
    ]

    return CurrentCoordinates;
}

function renderFigure(arr, color) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].classList.add("figure");
        arr[i].style.backgroundColor = colorArray[color];
    }
}

function clearFigure(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].classList.remove("figure");
        arr[i].style.backgroundColor = '';
    }
}

function create() {
    function getRandom(){
        return Math.round(Math.random()*(mainArr.length-1));
    }
    numColor = Math.round(Math.random()*(colorArray.length-1));
    rotate_el = 1;

    currentFigure = getRandom();

    figureBody = [
        document.querySelector(`[posx="${x}"][posy="${y}"]`),
        document.querySelector(`[posx="${x + mainArr[currentFigure][0][0]}"][posy="${y + mainArr[currentFigure][0][1]}"]`),
        document.querySelector(`[posx="${x + mainArr[currentFigure][1][0]}"][posy="${y + mainArr[currentFigure][1][1]}"]`),
        document.querySelector(`[posx="${x + mainArr[currentFigure][2][0]}"][posy="${y + mainArr[currentFigure][2][1]}"]`),
    ]

    renderFigure(figureBody, numColor);

}

function move() {
    moving = true;
    endGame = false;
    let coordinates = getCurrentCoordinates();

    for (let i = 0; i < coordinates.length; i++) {
        if (coordinates[i][1] == 1 || document.querySelector(`[posx="${coordinates[i][0]}"][posy="${coordinates[i][1] - 1}"]`).classList.contains("set")) {
            moving = false;
            break;
        }
    }

    if (moving) {
        clearFigure(figureBody);
    
        figureBody=[
            document.querySelector(`[posx="${coordinates[0][0]}"][posy="${coordinates[0][1] - 1}"]`),
            document.querySelector(`[posx="${coordinates[1][0]}"][posy="${coordinates[1][1] - 1}"]`),
            document.querySelector(`[posx="${coordinates[2][0]}"][posy="${coordinates[2][1] - 1}"]`),
            document.querySelector(`[posx="${coordinates[3][0]}"][posy="${coordinates[3][1] - 1}"]`),
        ]
    
        renderFigure(figureBody, numColor);
    } else {
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove("figure");
            figureBody[i].classList.add("set");
        }

        for (let i = 1; i < 15; i++) {
            let count = 0;
            for (let j=1; j <= 10; j++) {
                if (document.querySelector(`[posx="${j}"][posy="${i}"]`).classList.contains("set")) {
                    count++;
                    if (count == 10) {
                        score+=10;
                        document.querySelector(".count_score").textContent = score + "";
                        for (let m = 1; m < 11; m++) {
                            document.querySelector(`[posx="${m}"][posy="${i}"]`).classList.remove("set");
                            document.querySelector(`[posx="${m}"][posy="${i}"]`).style.backgroundColor = '';
                        }

                        let currentState = document.querySelectorAll(".set");
                        let newSet = [];

                        for (let l = 0; l < currentState.length; l++) {
                            setCoordinates = [currentState[l].getAttribute("posx"), currentState[l].getAttribute("posy")];

                            if (setCoordinates[1] > i) {
                                currentState[l].classList.remove("set");
                                colorCurrentSet = currentState[l].style.backgroundColor;
                                currentState[l].style.backgroundColor = '';
                                newSet.push([document.querySelector(`[posx="${setCoordinates[0]}"][posy="${setCoordinates[1] - 1}"]`), colorCurrentSet]);
                            }
                        }

                        for (let i = 0; i < newSet.length; i++) {
                            newSet[i][0].classList.add("set");
                            newSet[i][0].style.backgroundColor = newSet[i][1];
                        }
                        i--;
                    }
                }
            }
        }
        for (let i = 1; i < 11; i++) {
            if (document.querySelector(`[posx="${i}"][posy="${15}"]`).classList.contains("set")) {
                clearInterval(t);
                modal.classList.add('show');
                bg_modal.classList.add('show');
                document.querySelector(".modal .count_score").textContent = score + "";
                endGame = true;
                break;
            }
        }
        if (!endGame) {
            create();
        }
    }
}

window.addEventListener('keydown', function(event) {
    let coordinates = getCurrentCoordinates();

    function key_move(a) {

            let strafe = true;

            for (let i = 0; i < coordinates.length; i++) {
                if (Number(coordinates[i][0]) + a == 11 || Number(coordinates[i][0]) + a == 0 || document.querySelector(`[posx="${Number(coordinates[i][0])+a}"][posy="${coordinates[i][1]}"]`).classList.contains("set")) {
                    strafe = false;
                    break;
                }
            }

            if (strafe) {
                clearFigure(figureBody);
        
                figureBody=[
                    document.querySelector(`[posx="${Number(coordinates[0][0]) + a}"][posy="${coordinates[0][1]}"]`),
                    document.querySelector(`[posx="${Number(coordinates[1][0]) + a}"][posy="${coordinates[1][1]}"]`),
                    document.querySelector(`[posx="${Number(coordinates[2][0]) + a}"][posy="${coordinates[2][1]}"]`),
                    document.querySelector(`[posx="${Number(coordinates[3][0]) + a}"][posy="${coordinates[3][1]}"]`),
                ]

                renderFigure(figureBody, numColor);
            }
    }

    function rotate() {

        let rotate_move = true;

        for (let i = 0; i < coordinates.length; i++) {
            if (Number(coordinates[i][0]) + mainArr[currentFigure][rotate_el+2][i][0] > 10 || Number(coordinates[i][1]) + mainArr[currentFigure][rotate_el+2][i][1] < 0 
            || document.querySelector(`[posx="${Number(coordinates[i][0]) + mainArr[currentFigure][rotate_el+2][i][0]}"][posy="${+coordinates[i][1] + mainArr[currentFigure][rotate_el+2][i][1]}"]`).classList.contains("set")) {
                rotate_move = false;
                break;
            }
        }


        if (rotate_move) {
            clearFigure(figureBody);
    
            figureBody=[
                document.querySelector(`[posx="${Number(coordinates[0][0]) + Number(mainArr[currentFigure][rotate_el+2][0][0])}"][posy="${+coordinates[0][1] + mainArr[currentFigure][rotate_el+2][0][1]}"]`),
                document.querySelector(`[posx="${Number(coordinates[1][0]) + mainArr[currentFigure][rotate_el+2][1][0]}"][posy="${+coordinates[1][1] + mainArr[currentFigure][rotate_el+2][1][1]}"]`),
                document.querySelector(`[posx="${Number(coordinates[2][0]) + mainArr[currentFigure][rotate_el+2][2][0]}"][posy="${+coordinates[2][1] + mainArr[currentFigure][rotate_el+2][2][1]}"]`),
                document.querySelector(`[posx="${Number(coordinates[3][0]) + mainArr[currentFigure][rotate_el+2][3][0]}"][posy="${+coordinates[3][1] + mainArr[currentFigure][rotate_el+2][3][1]}"]`),
            ]

    
            renderFigure(figureBody, numColor);

            if (rotate_el < 4) {
                rotate_el++;
            } else {
                rotate_el = 1;
            }
        }

    }

    if (event.keyCode == 37) {
        key_move(-1);
    }
    if (event.keyCode == 39) {
        key_move(1);
    }
    if (event.keyCode == 40) {
        move();
    }
    if (event.keyCode == 38){
        rotate();
    }
})

create();

let t  = setInterval(move, 500);

let close_modal = document.querySelector('#modal_close');
console.log(close_modal);

close_modal.onclick = () => {
    modal.classList.remove('show');
    bg_modal.classList.remove('show');
}


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

let mainArr = [
    //палка
    [
        [0, 1],
        [0, 2],
        [0, 3]
    ],

    //квадрат
    [
        [1, 0],
        [0, 1],
        [1, 1]
    ],
    //угол (левый)
    [
        [1, 0],
        [0, 1],
        [0, 2]
    ],
    //угол (правый)
    [
        [1, 0],
        [1, 1],
        [2, 1]
    ],
    //змейка (левый)
    [
        [1, 0],
        [1, 1],
        [1, 2]
    ],
    //змейка (правый)
    [
        [1, 0],
        [-1, 1],
        [0, 1]
    ],
    //обратная Т
    [
        [1, 0],
        [2, 0],
        [1, 1]
    ],
]

let currentFigure = 0;
let figureBody = 0;

function create() {
    function getRandom(){
        return Math.round(Math.random()*(mainArr.length-1));
    }

    currentFigure = getRandom();

    figureBody = [
        document.querySelector(`[posx="${x}"][posy="${y}"]`),
        document.querySelector(`[posx="${x + mainArr[currentFigure][0][0]}"][posy="${y + mainArr[currentFigure][0][1]}"]`),
        document.querySelector(`[posx="${x + mainArr[currentFigure][1][0]}"][posy="${y + mainArr[currentFigure][1][1]}"]`),
        document.querySelector(`[posx="${x + mainArr[currentFigure][2][0]}"][posy="${y + mainArr[currentFigure][2][1]}"]`),
    ]

    for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.add("figure");
    }
}

create();

function move() {
    moving = true;
    let coordinates = [
        [figureBody[0].getAttribute('posx'), figureBody[0].getAttribute('posy')],
        [figureBody[1].getAttribute('posx'), figureBody[1].getAttribute('posy')],
        [figureBody[2].getAttribute('posx'), figureBody[2].getAttribute('posy')],
        [figureBody[3].getAttribute('posx'), figureBody[3].getAttribute('posy')],
    ]

    for (let i = 0; i < coordinates.length; i++) {
        if (coordinates[i][1] == 1 || document.querySelector(`[posx="${coordinates[i][0]}"][posy="${coordinates[i][1] - 1}"]`).classList.contains("set")) {
            moving = false;
            break;
        }
    }

    if (moving) {
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove("figure");
        }
    
        figureBody=[
            document.querySelector(`[posx="${coordinates[0][0]}"][posy="${coordinates[0][1] - 1}"]`),
            document.querySelector(`[posx="${coordinates[1][0]}"][posy="${coordinates[1][1] - 1}"]`),
            document.querySelector(`[posx="${coordinates[2][0]}"][posy="${coordinates[2][1] - 1}"]`),
            document.querySelector(`[posx="${coordinates[3][0]}"][posy="${coordinates[3][1] - 1}"]`),
        ]
    
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add("figure");
        }
    } else {
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove("figure");
            figureBody[i].classList.add("set");
        }
        create();
    }
}

window.addEventListener('keydown', function(event) {
    let coordinates  = [
        [figureBody[0].getAttribute('posx'), figureBody[0].getAttribute('posy')],
        [figureBody[1].getAttribute('posx'), figureBody[1].getAttribute('posy')],
        [figureBody[2].getAttribute('posx'), figureBody[2].getAttribute('posy')],
        [figureBody[3].getAttribute('posx'), figureBody[3].getAttribute('posy')],
    ]

    function key_move(a) {

            let strafe = true;

            for (let i = 0; i < coordinates.length; i++) {
                if (Number(coordinates[i][0]) + a == 11 || Number(coordinates[i][0]) + a == 0 || document.querySelector(`[posx="${Number(coordinates[i][0])+a}"][posy="${coordinates[i][1]}"]`).classList.contains("set")) {
                    strafe = false;
                    break;
                }
            }

            if (strafe) {
                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove("figure");
                }
        
                figureBody=[
                    document.querySelector(`[posx="${Number(coordinates[0][0]) + a}"][posy="${coordinates[0][1]}"]`),
                    document.querySelector(`[posx="${Number(coordinates[1][0]) + a}"][posy="${coordinates[1][1]}"]`),
                    document.querySelector(`[posx="${Number(coordinates[2][0]) + a}"][posy="${coordinates[2][1]}"]`),
                    document.querySelector(`[posx="${Number(coordinates[3][0]) + a}"][posy="${coordinates[3][1]}"]`),
                ]
;
                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.add("figure");
                }
            }
    }

    function rotate() {
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove("figure");
        }

        figureBody=[
            document.querySelector(`[posx="${Number(coordinates[0][0]) + a}"][posy="${coordinates[0][1]}"]`),
            document.querySelector(`[posx="${Number(coordinates[1][0]) + a}"][posy="${coordinates[1][1]}"]`),
            document.querySelector(`[posx="${Number(coordinates[2][0]) + a}"][posy="${coordinates[2][1]}"]`),
            document.querySelector(`[posx="${Number(coordinates[3][0]) + a}"][posy="${coordinates[3][1]}"]`),
        ]

        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add("figure");
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

setInterval(move, 500);


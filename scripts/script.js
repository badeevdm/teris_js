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

let x = 5, y = 9;

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
        [,1],
    ]

}



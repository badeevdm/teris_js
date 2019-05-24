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

for (let i = 18; i >= 0; i--) {
    for (let j = 1; j <= 10; j++) {
        excel[count].setAttribute('posX', j);
        excel[count].setAttribute('posY', i);
        count++;
    }
}



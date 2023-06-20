'use strict';

let wrapper = document.querySelector('.circle');

//ф. поворачивает круг на 1градус с каждой итерации
function cycleWrap(x) {
    wrapper.style.transform = `rotate(${x}deg)`;
}

let i = 0;
let cycle = setInterval(() => {
    cycleWrap(i);
    i++; //тут можно увеличить поворот за итерацию
    if (i > 360) {
        i = 0;
    }
}, 5); //чем меньше таймаут тем больше скорость вращения
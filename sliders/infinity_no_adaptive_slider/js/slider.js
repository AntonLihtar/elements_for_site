'use strict';

//получаем ширину слайдера, используем
let sliderWidth = document.querySelector('.slider-frame').offsetWidth;
console.log(sliderWidth);

/* получаем пути для изображений в массиве и удаляем изображения со страницы,
можно в index не добавлять изображения, а сразу создать здесь массив
slider с путями к им */
let slides = document.querySelectorAll('.slider-single');
if (slides.length == 0) {
    console.log(`массив slides пустой`);
}

let slider = [];
for (let i = 0; i < slides.length; i++) {
    slider[i] = slides[i].src;
    slides[i].remove();
}


let step = 0; //шаг (какую картинку показать)
let offset = 0; //смещение слайдов (для ф. addSlideRight)
let iterator; //для добавления левого слайда (для ф. addSlideLeft)


//----------добавляет слайд справа для перелистывания вперед----------
function addSlideRight(sliderName = "slider-next") {

    //создаем и добавляем изображение справа от окна слайдера
    let img = document.createElement('img');
    img.src = slider[step];
    img.classList.add(sliderName);
    img.style.left = offset * sliderWidth + 'px';
    document.querySelector('.slider-frame').appendChild(img);

    if (step + 1 == slider.length) {
        step = 0;
    }
    else {
        step++;
    }
    offset = 1; //после 1го запуска все следующие картинки смещены вправо на 300px 
}


//----------добавляет слайд слева для перелистывания назад----------
function addSlideLeft() {

    if (slides.length == 1) { //если у нас всего 1 слайд
        iterator = 0;

    } else if (slides.length == 2) { //слайдов 2
        iterator = (step == 0) ? 1 : 0;

    } else { //слайдов 3 или больше

        if (step == 2) {
            iterator = slides.length - 1;
        } else if (step == 1) {
            iterator = slides.length - 2;
        } else if (step == 0) {
            iterator = slides.length - 3;
        } else {
            iterator = step - 3;
        }
    }

    let img = document.createElement('img');
    img.src = slider[iterator];
    img.classList.add('slider-previous');
    img.style.left = -sliderWidth + 'px';
    //добавляем картинку слева от слайдера
    document.querySelector('.slider-frame').appendChild(img);
}


addSlideRight('slider-center'); //добавляем центральный слайд
addSlideRight(); //добавляем слайд справа/ следующие элементы будут с классом -next
addSlideLeft(); //добавляем слайд слева/

//-------------------------ф. для смены класса и сдвига элемента
function changeClassElementAndЫhift(classSelector, newClass, shiftLeft){
    let element = document.querySelector(classSelector);
    element.style.left = shiftLeft +'px';
    element.className = newClass;
}


//----------обработчик нажатия на кнопку Next----------
function right() {
    //отключаем обработчики, чтобы при многократном клике отрабатывала ф setTimeout 
    turnOffClick();

    document.querySelector('.slider-previous').remove();

    changeClassElementAndЫhift('.slider-center','slider-previous', -sliderWidth);

    changeClassElementAndЫhift('.slider-next','slider-center', 0);

    setTimeout(() => {
        addSlideRight(); //добавляем слайд справа через 1s
        includeClicks(); //включаем обработчики после отработки ф
    }, 1000);
}


//----------обработчик нажатия на кнопку Prev----------
function left() {
    //отключаем обработчики, чтобы при многократном клике отрабатывала ф setTimeout 
    turnOffClick();

    document.querySelector('.slider-next').remove();

    changeClassElementAndЫhift('.slider-center','slider-next', sliderWidth);

    changeClassElementAndЫhift('.slider-previous','slider-center', 0);
    
    step--;
    if (step < 0) {
        step = slides.length - 1;
    }

    setTimeout(() => {
        addSlideLeft(); //добавляем слайд слева через 1s
        includeClicks(); //включаем обработчики после отработки ф
    }, 1000);
}

let clickRight = document.querySelector('.slider__right');
clickRight.onclick = right;

let clickLeft = document.querySelector('.slider__left');
clickLeft.onclick = left;

function includeClicks() {
    clickLeft.onclick = left;
    clickRight.onclick = right;
};

function turnOffClick() {
    clickLeft.onclick = null;
    clickRight.onclick = null;
}





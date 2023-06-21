const images = document.querySelectorAll('.slider .slider-line img');
const sliderLine = document.querySelector('.slider-line');

let count = 0;
let width;

function init() {
    console.log('resize');

    //берем ширину слайдера и устанавливаем длину линии слайдов
    width = document.querySelector('.slider').offsetWidth;
    sliderLine.width = width * images.length + 'px';

    //устанавливаем ширину изображений=ширине слайда,а высоту=авто
    images.forEach(element => {
        element.style.width = width + 'px';
        element.style.height = 'auto';
    });
    //после перасчета ширины , смещаем слайды, чтобы не плыли 2слайда в окно
    rollSlider();
}

init();

//при изменении экрана срабатывает функция изменения размера изображений
window.addEventListener('resize', init);

document.querySelector('.slider__left').addEventListener('click', function () {
    count++;
    if (count >= images.length){
        count = 0;
    }
    rollSlider();
});

document.querySelector('.slider__right').addEventListener('click', function () {
    count--;
    if (count < 0) {
        count = images.length - 1;
    }
    rollSlider();
});


//ф смещения ленты слайдера от размера и счетчика
function rollSlider() {
    sliderLine.style.transform = 'translate(-' + count * width + 'px';
}

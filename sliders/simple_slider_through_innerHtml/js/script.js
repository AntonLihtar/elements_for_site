const prevBtn = document.querySelector('.slider__prev');
const nextBtn = document.querySelector('.slider__next');
const outImg = document.querySelector('.slider__img');

const art1 = '../img/1.jpg';
const art2 = '../img/2.jpg';
const art3 = '../img/3.jpg';
const art4 = '../img/2.jpg';
const art5 = '../img/3.jpg';

//создаем массив изображений
const images = [art1, art2, art3, art4, art5];


let i = 0;
//выводим 1 изображение
outImg.innerHTML = `<img src=${images[i]}>`;

//клик вправо
nextBtn.onclick = () => {
    if (i < images.length - 1) {
        i++;
    } else {
        i = 0;
    }
    outImg.innerHTML = `<img src=${images[i]}>`;
}

//клик влево
prevBtn.onclick = () => {
    if (i > 0) {
        i--;
    } else {
        i = images.length - 1;
    }
    outImg.innerHTML = `<img src=${images[i]}>`;
}